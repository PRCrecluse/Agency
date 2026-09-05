import { spawn } from 'node:child_process'
import { once } from 'node:events'
import net from 'node:net'
import path from 'node:path'
import process from 'node:process'
import { setTimeout as delay } from 'node:timers/promises'

const projectRoot = process.cwd()

const getAvailablePort = async () => {
  const listener = net.createServer()

  await new Promise((resolve, reject) => {
    listener.once('error', reject)
    listener.listen(0, '127.0.0.1', resolve)
  })

  const address = listener.address()
  const port = typeof address === 'object' && address ? address.port : null

  await new Promise(resolve => listener.close(resolve))

  if (!port) throw new Error('Could not allocate a local port for rendered SEO checks.')

  return port
}

const port = await getAvailablePort()
const baseUrl = `http://127.0.0.1:${port}`
const nextCli = path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next')
let serverOutput = ''

const server = spawn(process.execPath, [nextCli, 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
  cwd: projectRoot,
  env: process.env,
  stdio: ['ignore', 'pipe', 'pipe']
})

const recordOutput = chunk => {
  serverOutput = `${serverOutput}${chunk.toString()}`.slice(-8_000)
}

server.stdout.on('data', recordOutput)
server.stderr.on('data', recordOutput)
server.on('error', error => recordOutput(error.stack || error.message))

const stopServer = async () => {
  if (server.exitCode !== null || server.signalCode) return

  server.kill('SIGTERM')

  await Promise.race([once(server, 'exit'), delay(5_000)])

  if (server.exitCode === null && !server.signalCode) {
    server.kill('SIGKILL')
    await once(server, 'exit')
  }
}

const waitForServer = async () => {
  const deadline = Date.now() + 30_000

  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`Next.js server exited with code ${server.exitCode}.`)

    try {
      const response = await fetch(`${baseUrl}/sitemap.xml`, { signal: AbortSignal.timeout(1_000) })

      if (response.status === 200) return
    } catch {
      // The server is still starting.
    }

    await delay(250)
  }

  throw new Error('Timed out waiting for the local Next.js server.')
}

const runCheck = script =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(projectRoot, 'scripts', script)], {
      cwd: projectRoot,
      env: {
        ...process.env,
        SEO_CHECK_BASE_URL: baseUrl,
        SEO_CHECK_CANONICAL_URL: 'https://withmeridian.org'
      },
      stdio: 'inherit'
    })

    child.once('error', reject)
    child.once('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`${script} exited with code ${code ?? 'unknown'}.`))
    })
  })

try {
  await waitForServer()
  await runCheck('check-language-signals.mjs')
  await runCheck('check-on-page-seo.mjs')
  await runCheck('check-service-hierarchy.mjs')
  console.log('Rendered SEO checks passed against the local production server.')
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))

  if (serverOutput.trim()) {
    console.error('Next.js server output:')
    console.error(serverOutput.trim())
  }

  process.exitCode = 1
} finally {
  await stopServer()
}
