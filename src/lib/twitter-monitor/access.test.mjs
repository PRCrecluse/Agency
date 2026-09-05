import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import test from 'node:test'

import { createAccessToken, verifyAccessToken } from './access.ts'

const secret = 'test-only-access-secret-that-is-longer-than-32-characters'

process.env.TWITTER_MONITOR_ACCESS_SECRET = secret

const lead = {
  companyName: 'Meridian Test',
  website: 'https://example.com/',
  role: 'Growth lead',
  email: 'owner@example.com'
}

test('access tokens preserve the assigned workspace', () => {
  const workspaceId = '62a997d6-7f5c-4cc1-a8b9-0de4212e87c5'
  const session = verifyAccessToken(createAccessToken(lead, workspaceId))

  assert.equal(session?.workspaceId, workspaceId)
  assert.equal(session?.email, lead.email)
})

test('tampered access tokens are rejected', () => {
  const token = createAccessToken(lead, '62a997d6-7f5c-4cc1-a8b9-0de4212e87c5')
  const tampered = `${token.slice(0, -1)}${token.endsWith('a') ? 'b' : 'a'}`

  assert.equal(verifyAccessToken(tampered), null)
})

test('legacy tokens receive a stable isolated workspace', () => {
  const payload = Buffer.from(
    JSON.stringify({
      companyName: lead.companyName,
      email: lead.email,
      expiresAt: Math.floor(Date.now() / 1000) + 3600
    }),
    'utf8'
  ).toString('base64url')

  const signature = createHmac('sha256', secret).update(payload).digest('base64url')
  const token = `${payload}.${signature}`
  const first = verifyAccessToken(token)
  const second = verifyAccessToken(token)

  assert.match(first?.workspaceId ?? '', /^legacy_[a-f0-9]{24}$/)
  assert.equal(first?.workspaceId, second?.workspaceId)
})

test('reserved workspace identifiers cannot be signed', () => {
  assert.throws(() => createAccessToken(lead, 'primary'), /Invalid Twitter monitor workspace/)
})
