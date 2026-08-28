import type { TrafficPoint, TwitterCampaign, TwitterMonitorSnapshot } from '@/lib/twitter-monitor/types'

const formatNumber = (value: number) => new Intl.NumberFormat('en-US').format(Math.round(value))
const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(
    new Date(value)
  )

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, character => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }

    return entities[character]
  })

function campaignPoints(snapshot: TwitterMonitorSnapshot, campaign: TwitterCampaign) {
  const start = new Date(campaign.monitorStartAt).getTime()
  const end = new Date(campaign.monitorEndAt).getTime()

  return snapshot.points
    .filter(point => point.campaignId === campaign.id)
    .filter(point => {
      const timestamp = new Date(point.timestamp).getTime()

      return timestamp >= start && timestamp <= end
    })
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
}

function sum(points: TrafficPoint[], key: 'impressions' | 'engagements' | 'linkClicks') {
  return points.reduce((total, point) => total + point[key], 0)
}

export async function sendTwitterMonitorReport(recipient: string, snapshot: TwitterMonitorSnapshot) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const apiToken = process.env.CLOUDFLARE_API_TOKEN
  const fromAddress = process.env.CLOUDFLARE_EMAIL_FROM

  if (!accountId || !apiToken || !fromAddress) {
    throw new Error('Email delivery is not configured')
  }

  const campaign = snapshot.campaigns[0]

  if (!campaign) throw new Error('Configure an X post before sending a report')

  const points = campaignPoints(snapshot, campaign)
  const impressions = sum(points, 'impressions')
  const engagements = sum(points, 'engagements')
  const linkClicks = sum(points, 'linkClicks')
  const engagementRate = impressions ? (engagements / impressions) * 100 : 0
  const appUrl = `${(process.env.NEXT_PUBLIC_APP_URL ?? 'https://withmeridian.org').replace(/\/$/, '')}/twitter-monitor`
  const recentRows = points
    .slice(-8)
    .reverse()
    .map(
      point => `
        <tr>
          <td style="padding:10px 12px;border-top:1px solid #e4e4e7;color:#71717a">${escapeHtml(formatDate(point.timestamp))}</td>
          <td style="padding:10px 12px;border-top:1px solid #e4e4e7;text-align:right">${formatNumber(point.impressions)}</td>
          <td style="padding:10px 12px;border-top:1px solid #e4e4e7;text-align:right">${formatNumber(point.engagements)}</td>
          <td style="padding:10px 12px;border-top:1px solid #e4e4e7;text-align:right">${formatNumber(point.linkClicks)}</td>
        </tr>`
    )
    .join('')
  const emptyRow = `
    <tr><td colspan="4" style="padding:18px 12px;border-top:1px solid #e4e4e7;color:#71717a;text-align:center">No observations have been received in this window yet.</td></tr>`
  const subject = `X post monitoring report — ${campaign.handle}`
  const html = `<!doctype html>
<html><body style="margin:0;background:#f4f4f5;font-family:Arial,sans-serif;color:#18181b">
  <div style="max-width:680px;margin:0 auto;padding:32px 16px">
    <div style="background:#18181b;color:#fff;border-radius:14px 14px 0 0;padding:24px 28px">
      <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#d4d4d8">Meridian · X Monitor</div>
      <h1 style="font-size:24px;line-height:1.3;margin:10px 0 0">Single-post monitoring report</h1>
    </div>
    <div style="background:#fff;border:1px solid #e4e4e7;border-top:0;padding:28px">
      <p style="margin:0 0 8px;font-weight:600">${escapeHtml(campaign.handle)}</p>
      <p style="margin:0 0 22px;color:#71717a;font-size:13px;word-break:break-all">${escapeHtml(campaign.url)}</p>
      <div style="font-size:13px;color:#71717a;margin-bottom:22px">${escapeHtml(formatDate(campaign.monitorStartAt))} → ${escapeHtml(formatDate(campaign.monitorEndAt))}</div>
      <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:8px"><tr>
        <td style="background:#fafafa;border:1px solid #e4e4e7;border-radius:10px;padding:16px"><div style="font-size:12px;color:#71717a">Impressions</div><div style="font-size:24px;font-weight:700;margin-top:7px">${formatNumber(impressions)}</div></td>
        <td style="background:#fafafa;border:1px solid #e4e4e7;border-radius:10px;padding:16px"><div style="font-size:12px;color:#71717a">Engagements</div><div style="font-size:24px;font-weight:700;margin-top:7px">${formatNumber(engagements)}</div></td>
        <td style="background:#fafafa;border:1px solid #e4e4e7;border-radius:10px;padding:16px"><div style="font-size:12px;color:#71717a">Link clicks</div><div style="font-size:24px;font-weight:700;margin-top:7px">${formatNumber(linkClicks)}</div></td>
      </tr></table>
      <p style="font-size:13px;color:#71717a;margin:14px 8px 24px">Engagement rate: ${engagementRate.toFixed(2)}% · ${points.length} observation${points.length === 1 ? '' : 's'}</p>
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr><th style="padding:10px 12px;text-align:left;background:#fafafa">Latest observations (UTC)</th><th style="padding:10px 12px;text-align:right;background:#fafafa">Views</th><th style="padding:10px 12px;text-align:right;background:#fafafa">Eng.</th><th style="padding:10px 12px;text-align:right;background:#fafafa">Clicks</th></tr></thead>
        <tbody>${recentRows || emptyRow}</tbody>
      </table>
      <p style="margin:26px 0 0"><a href="${escapeHtml(appUrl)}" style="display:inline-block;background:#18181b;color:#fff;text-decoration:none;border-radius:8px;padding:12px 18px;font-size:14px;font-weight:600">Open live traffic curve</a></p>
    </div>
  </div>
</body></html>`
  const text = `${subject}

Post: ${campaign.url}
Window (UTC): ${formatDate(campaign.monitorStartAt)} → ${formatDate(campaign.monitorEndAt)}

Impressions: ${formatNumber(impressions)}
Engagements: ${formatNumber(engagements)}
Link clicks: ${formatNumber(linkClicks)}
Engagement rate: ${engagementRate.toFixed(2)}%
Observations: ${points.length}

Open the live curve: ${appUrl}`
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/email/sending/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: recipient,
      from: process.env.CLOUDFLARE_EMAIL_FROM_NAME
        ? { address: fromAddress, name: process.env.CLOUDFLARE_EMAIL_FROM_NAME }
        : fromAddress,
      ...(process.env.CLOUDFLARE_EMAIL_REPLY_TO ? { reply_to: process.env.CLOUDFLARE_EMAIL_REPLY_TO } : {}),
      subject,
      html,
      text
    }),
    cache: 'no-store'
  })
  const result = (await response.json().catch(() => null)) as
    | { success?: boolean; errors?: Array<{ message?: string }>; result?: { delivered?: string[]; queued?: string[] } }
    | null

  if (!response.ok || !result?.success) {
    const detail = result?.errors?.[0]?.message

    throw new Error(detail ? `Email delivery failed: ${detail}` : 'Email delivery failed')
  }

  return {
    delivered: result.result?.delivered?.includes(recipient) ?? false,
    queued: result.result?.queued?.includes(recipient) ?? false
  }
}
