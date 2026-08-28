# Meridian X post monitor

The monitor is available at `/twitter-monitor`. It tracks one X post at a time across a user-selected start and end time, persists each observation, and renders its impressions, engagements, and link-click curve.

## Persistence modes

- `DATABASE_URL` present: uses PlanetScale through `@planetscale/database`. The `twitter_monitor_state` table is created on first access and writes are protected by a transaction.
- `DATABASE_URL` absent: uses the local `.data/twitter-monitor.json` fallback with atomic file replacement. This is intended for local development, not serverless production.

Never commit the production connection string. Add it to `.env.local` for local testing and to the Vercel project environment for production.

## Continuous collection

`vercel.json` calls `/api/cron/twitter-monitor` every 15 minutes. Set `CRON_SECRET` in Vercel; Vercel sends it as a bearer token to scheduled functions. While the tool is open, the browser also checks every 30 seconds whether the current post is due for collection.

The included collector generates realistic demo measurements so the interface works immediately. A real analytics pipeline can write data through:

```http
POST /api/twitter-monitor
Content-Type: application/json
X-Monitor-Secret: <TWITTER_MONITOR_INGEST_SECRET>

{
  "action": "ingest",
  "point": {
    "campaignId": "cmp_example",
    "timestamp": "2026-08-28T08:00:00.000Z",
    "impressions": 4200,
    "engagements": 231,
    "linkClicks": 104,
    "conversions": 9,
    "spend": 82.40
  }
}
```

For paid X Ads data, a server-side adapter should use X Ads API OAuth credentials and map its analytics response into the ingestion shape above. Website conversions should normally come from the site's analytics or first-party event stream keyed by UTM campaign.
