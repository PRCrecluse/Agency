import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'

const testDirectory = await mkdtemp(path.join(os.tmpdir(), 'meridian-twitter-monitor-'))
const legacyFile = path.join(testDirectory, 'twitter-monitor.json')
const legacyContents = JSON.stringify({ preserved: true })

await writeFile(legacyFile, legacyContents, 'utf8')
process.env.TWITTER_MONITOR_DATA_DIR = testDirectory
delete process.env.DATABASE_URL

const { collectAllCampaignMetrics, configureTwitterMonitor, getMonitorSnapshot, ingestMetricPoint, toggleCampaign } =
  await import('./store.ts')

test.after(async () => {
  await rm(testDirectory, { recursive: true, force: true })
})

test('monitor state is isolated by workspace and legacy storage is preserved', async () => {
  const workspaceA = 'workspace_test_alpha'
  const workspaceB = 'workspace_test_bravo'
  const start = new Date(Date.now() - 60_000).toISOString()
  const end = new Date(Date.now() + 60 * 60 * 1000).toISOString()

  const snapshotA = await configureTwitterMonitor(workspaceA, {
    url: 'https://x.com/alpha/status/1000000000000000001',
    monitorStartAt: start,
    monitorEndAt: end,
    cadenceMinutes: 15
  })

  const snapshotB = await configureTwitterMonitor(workspaceB, {
    url: 'https://x.com/bravo/status/1000000000000000002',
    monitorStartAt: start,
    monitorEndAt: end,
    cadenceMinutes: 15
  })

  assert.equal(snapshotA.campaigns[0]?.handle, '@alpha')
  assert.equal(snapshotB.campaigns[0]?.handle, '@bravo')

  await ingestMetricPoint(workspaceA, {
    campaignId: snapshotA.campaigns[0].id,
    impressions: 100,
    engagements: 10,
    linkClicks: 3,
    conversions: 0
  })

  const isolatedA = await getMonitorSnapshot(workspaceA)
  const isolatedB = await getMonitorSnapshot(workspaceB)

  assert.equal(isolatedA.points.length, 1)
  assert.equal(isolatedA.points[0]?.impressions, 100)
  assert.equal(isolatedB.points.length, 0)

  await toggleCampaign(workspaceA, snapshotA.campaigns[0].id)
  await toggleCampaign(workspaceB, snapshotB.campaigns[0].id)

  const collection = await collectAllCampaignMetrics()

  assert.equal(collection.workspaces, 2)
  assert.equal(collection.collected, 0)
  assert.deepEqual(collection.errors, [])
  assert.equal(await readFile(legacyFile, 'utf8'), legacyContents)
})

test('unsupported collection frequencies are rejected', async () => {
  await assert.rejects(
    configureTwitterMonitor('workspace_test_cadence', {
      url: 'https://x.com/cadence/status/1000000000000000003',
      monitorStartAt: new Date(Date.now() - 60_000).toISOString(),
      monitorEndAt: new Date(Date.now() + 60_000).toISOString(),
      cadenceMinutes: 5
    }),
    /supported collection frequency/
  )
})

test('monitoring windows longer than 30 days are rejected', async () => {
  await assert.rejects(
    configureTwitterMonitor('workspace_test_window', {
      url: 'https://x.com/window/status/1000000000000000004',
      monitorStartAt: new Date().toISOString(),
      monitorEndAt: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString(),
      cadenceMinutes: 15
    }),
    /cannot exceed 30 days/
  )
})
