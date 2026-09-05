import assert from 'node:assert/strict'
import test from 'node:test'

import { checkRateLimit, getClientRateLimitKey, resetRateLimitsForTests } from './rate-limit.ts'

test.beforeEach(() => resetRateLimitsForTests())

test('rate limits requests inside one fixed window', () => {
  const rule = { limit: 2, windowMs: 10_000 }

  assert.equal(checkRateLimit('test', 'workspace-a', rule, 1_000).allowed, true)
  assert.equal(checkRateLimit('test', 'workspace-a', rule, 2_000).allowed, true)

  const blocked = checkRateLimit('test', 'workspace-a', rule, 3_000)

  assert.equal(blocked.allowed, false)
  assert.equal(blocked.remaining, 0)
  assert.equal(blocked.retryAfterSeconds, 8)
})

test('rate limits isolate identities and reset after the window', () => {
  const rule = { limit: 1, windowMs: 1_000 }

  assert.equal(checkRateLimit('test', 'workspace-a', rule, 1_000).allowed, true)
  assert.equal(checkRateLimit('test', 'workspace-a', rule, 1_100).allowed, false)
  assert.equal(checkRateLimit('test', 'workspace-b', rule, 1_100).allowed, true)
  assert.equal(checkRateLimit('test', 'workspace-a', rule, 2_000).allowed, true)
})

test('client addresses are normalized into non-reversible keys', () => {
  const first = getClientRateLimitKey(new Headers({ 'x-forwarded-for': '203.0.113.10, 10.0.0.1' }))
  const second = getClientRateLimitKey(new Headers({ 'x-forwarded-for': '203.0.113.10' }))

  assert.equal(first, second)
  assert.notEqual(first, '203.0.113.10')
})
