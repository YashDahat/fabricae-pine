# Smoke Flow Report

Probed live at `http://smoke-d9374d71:8080` — 17 of 17 journeys working.

These are runtime journeys, not compilation. Everything below compiled cleanly.

## Working (17)

- public GET /api/v1/products — 200
- public GET /api/v1/categories — 200
- public GET /api/v1/lookbook — 200
- admin login — 200 as owner@yourbusiness.com (seeded by application.properties)
- admin GET /api/v1/admin/inquiries — 200
- unauth POST /api/v1/admin/products — 403 (rejected — good)
- unauth PUT /api/v1/admin/products/{id} — 403 (rejected — good)
- unauth DELETE /api/v1/admin/products/{id} — 403 (rejected — good)
- unauth POST /api/v1/admin/categories — 403 (rejected — good)
- unauth PUT /api/v1/admin/categories/{id} — 403 (rejected — good)
- unauth DELETE /api/v1/admin/categories/{id} — 403 (rejected — good)
- unauth GET /api/v1/admin/inquiries — 403 (rejected — good)
- unauth GET /api/v1/admin/inquiries/{id} — 403 (rejected — good)
- unauth PUT /api/v1/admin/inquiries/{id}/status — 403 (rejected — good)
- unauth POST /api/v1/admin/lookbook — 403 (rejected — good)
- unauth PUT /api/v1/admin/lookbook/{id} — 403 (rejected — good)
- unauth DELETE /api/v1/admin/lookbook/{id} — 403 (rejected — good)
