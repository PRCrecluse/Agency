# Booking attribution

All links from the Meridian website to Cal.com use the shared `BookingLink` component. It creates the DataFast goal
`booking_cta_click` and attaches these non-identifying properties:

- `source_page`
- `page_type`
- `service_type`
- `cta_location`
- `language`

The link also forwards `ref`, `source`, `via`, and standard `utm_*` acquisition parameters. Those parameters are kept
in session storage so the original campaign survives internal navigation before a visitor opens Cal.com. Existing
campaign values always take precedence over Meridian's fallback values.

## DataFast setup

The website queues early DataFast events before loading the main analytics script. No dashboard-side goal setup is
required for the first `booking_cta_click`; DataFast creates a goal when it receives the event.

The Campaigns report is populated only after a visitor lands on Meridian through a tagged URL, for example:

```text
https://withmeridian.org/?utm_source=newsletter&utm_medium=email&utm_campaign=september_update
https://withmeridian.org/?ref=linkedin
```

Campaigns are not created retroactively from historical untagged visits.

## Cal.com setup

Cal.com captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content` automatically. To expose the
five richer context fields in each booking record, add an optional hidden Short Text booking question for each field.
Its identifier must exactly match the field name listed above. Apply the questions to every Meridian event type used by
the site.

Do not add DataFast cross-domain visitor parameters to Cal.com. Cross-domain tracking requires the same DataFast script
on both domains, which is not available on the hosted Cal.com domain.

## Verification

1. Open a Meridian page with a test campaign such as `?utm_source=qa&utm_medium=test&utm_campaign=booking_chain`.
2. Navigate to another page, click a booking CTA, and verify that the new Cal.com URL retains those three parameters.
3. Confirm the URL also includes `source_page`, `page_type`, `service_type`, `cta_location`, and `language`.
4. In DataFast, confirm a `booking_cta_click` goal appears with the five custom properties.
5. Complete a test booking and confirm Cal.com stores the standard UTM values and the five hidden-question values.

Successful, cancelled, and rescheduled bookings remain a separate lifecycle layer to add later through a Cal.com
webhook or a first-party success redirect.
