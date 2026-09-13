# API Contract Report

Effective client baseURL: `(empty)`

## Mismatches (1)
- POST /api/v1/admin/media  (path exists but not for POST — method or path mismatch)

## Backend routes (29)
- DELETE /api/v1/admin/categories/*
- DELETE /api/v1/admin/lookbook/*
- DELETE /api/v1/admin/media/*
- DELETE /api/v1/admin/products/*
- GET /api/v1/admin/inquiries
- GET /api/v1/admin/inquiries/*
- GET /api/v1/admin/media
- GET /api/v1/categories
- GET /api/v1/categories/*
- GET /api/v1/gallery
- GET /api/v1/lookbook
- GET /api/v1/lookbook/*
- GET /api/v1/media/*
- GET /api/v1/products
- GET /api/v1/products/*
- POST /api/v1/admin/categories
- POST /api/v1/admin/lookbook
- POST /api/v1/admin/products
- POST /api/v1/auth/login
- POST /api/v1/auth/register
- POST /api/v1/inquiries
- POST /api/v1/payments/create-order
- POST /api/v1/payments/verify
- POST /api/v1/payments/webhook
- PUT /api/v1/admin/categories/*
- PUT /api/v1/admin/inquiries/*/status
- PUT /api/v1/admin/lookbook/*
- PUT /api/v1/admin/media/*
- PUT /api/v1/admin/products/*

## Frontend calls (28)
- POST /api/v1/payments/create-order
- POST /api/v1/payments/verify
- POST /api/v1/auth/login
- POST /api/v1/auth/register
- GET /api/v1/admin/media
- POST /api/v1/admin/media
- PUT /api/v1/admin/media/${id}
- DELETE /api/v1/admin/media/${id}
- DELETE /api/v1/admin/categories/${id}
- GET /api/v1/lookbook
- GET /api/v1/lookbook/${id}
- POST /api/v1/admin/lookbook
- PUT /api/v1/admin/lookbook/${id}
- DELETE /api/v1/admin/lookbook/${id}
- GET /api/v1/gallery
- GET /api/v1/products
- GET /api/v1/products/${id}
- GET /api/v1/categories
- GET /api/v1/categories/${id}
- POST /api/v1/admin/products
- PUT /api/v1/admin/products/${id}
- DELETE /api/v1/admin/products/${id}
- POST /api/v1/admin/categories
- PUT /api/v1/admin/categories/${id}
- POST /api/v1/inquiries
- GET /api/v1/admin/inquiries
- GET /api/v1/admin/inquiries/${id}
- PUT /api/v1/admin/inquiries/${id}/status
