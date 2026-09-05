# Meridian X post monitor

The monitor is available at `/twitter-monitor`. It tracks one X post at a time across a user-selected start and end time, persists each observation, and renders its impressions, engagements, and link-click curve.

## Mandatory access form

The campaign workspace and its API are locked until the visitor submits all four fields:

- Company name
- Company website
- Role
- Report email

With `NOTION_API_TOKEN` configured, every submission creates a child page below `NOTION_LEADS_PAGE_ID`. The Notion integration must have **Insert content** access to that page. When Notion is not configured and `DATABASE_URL` is available, submissions are stored in the `twitter_monitor_leads` table instead. Each submission also creates a random workspace ID inside a signed, HTTP-only cookie that is valid for 30 days. `TWITTER_MONITOR_ACCESS_SECRET` is required in production.

During local development only, if neither Notion nor a database is configured, submissions use `.data/twitter-monitor-leads.json`. Production fails closed when the signing secret or persistent lead storage is not configured, so the monitor cannot unlock without recording the lead.

## Persistence modes

- `DATABASE_URL` present: uses PlanetScale through `@planetscale/database`. Each workspace is stored in its own `twitter_monitor_state` row and writes are protected by a transaction.
- `DATABASE_URL` absent: uses an isolated `.data/twitter-monitor-workspace-<id>.json` file per workspace with atomic file replacement. This is intended for local development only; production fails closed without `DATABASE_URL`.

The former `primary` database row and `.data/twitter-monitor.json` file are left untouched for rollback or manual migration, but are no longer exposed to visitors. Legacy signed cookies receive a stable isolated workspace instead of access to the shared state.

Never commit the production connection string. Add it to `.env.local` for local testing and to the Vercel project environment for production.

## Continuous Twitter API45 collection

Subscribe to [Twitter API45 on RapidAPI](https://rapidapi.com/alexanderxbx/api/twitter-api45) and set `RAPIDAPI_KEY`. Monitoring windows are limited to 30 days. The monitor calls `GET /tweet.php?id=<post-id>` immediately after saving, then at the configured 15, 30, or 60 minute cadence. A Vercel cron calls `/api/cron/twitter-monitor` every 15 minutes, iterates all active workspaces, and is protected by `CRON_SECRET`. The open dashboard also checks whether a collection is due every 30 seconds.

Twitter API45 returns public post metrics such as views, likes, reposts, replies, quotes, and bookmarks. Engagements are the returned engagement total when available, otherwise the sum of those real public interactions. Metrics that the provider does not return, commonly URL link clicks, remain unavailable rather than being stored as zero.

## Email reports

The current workspace's campaign report can be sent to the captured email or another recipient from the **Current post** card. Delivery uses Cloudflare Email Sending's REST API from the Vercel route.

Access submissions, manual collection, monitor changes, ingestion, and report delivery have server-side fixed-window rate limits. These limits provide basic abuse protection per running application instance; use an external distributed rate-limit store if the deployment later spans many concurrent regions or instances.

Configure:

```dotenv
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_API_TOKEN=...
CLOUDFLARE_EMAIL_FROM=reports@your-verified-domain.com
CLOUDFLARE_EMAIL_FROM_NAME=Meridian
CLOUDFLARE_EMAIL_REPLY_TO=hello@your-verified-domain.com
```

The sender domain must be onboarded for Cloudflare Email Sending and the API token must have email-sending permission. The report includes the campaign window, totals, engagement rate, latest observations, and a link back to the live curve.

## Real metric ingestion

The monitor never generates demo measurements. It starts empty and only renders metric points supplied by a real analytics pipeline through:

```http
POST /api/twitter-monitor
Content-Type: application/json
X-Monitor-Secret: <TWITTER_MONITOR_INGEST_SECRET>

{
  "action": "ingest",
  "workspaceId": "62a997d6-7f5c-4cc1-a8b9-0de4212e87c5",
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
