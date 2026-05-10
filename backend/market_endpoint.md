# Marketplace API Endpoints

This document lists all endpoints created for the marketplace system.

## Authentication & User Profile
### Get Authenticated User Profile
Return connected user information along with their favorites, orders, and payments.

- **URL**: `GET /auth`
- **Auth**: `Bearer <token>`
- **Output Example**:
```json
{
    "id": "uuid",
    "email": "user@example.com",
    "username": "johndoe",
    "role": "USER",
    "favorites": [
        {
            "id": "fav-uuid",
            "product": {
                "id": "prod-uuid",
                "name": "Gaming Mouse",
                "price": 50.00,
                "images": ["/uploads/products/image1.jpg"]
            }
        }
    ],
    "orders": [
        {
            "id": "order-uuid",
            "status": "PAID",
            "totalAmount": 100.00,
            "createdAt": "2024-04-21T...",
            "items": [
                {
                    "id": "item-uuid",
                    "quantity": 2,
                    "priceAtPurchase": 50.00,
                    "product": { "name": "Gaming Mouse" }
                }
            ],
            "payment": { "id": "pay-uuid", "amount": 100.00, "status": "SUCCESS" }
        }
    ],
    "payments": [
        { "id": "pay-uuid", "amount": 100.00, "status": "SUCCESS", "createdAt": "..." }
    ]
}
```

---

## Products Catalog
### List Products
Search, filter, and sort products.
- **URL**: `GET /market/products`
- **Query Params**:
    - `search`: string (name)
    - `categoryId`: uuid
    - `minPrice`: number
    - `maxPrice`: number
    - `minRating`: block (0-5)
    - `available`: `true`/`false`
    - `sortBy`: `popularity`, `price`, `novelty`
    - `sortOrder`: `ASC`, `DESC`
- **Auth**: None
- **Output**: Array of Products.

### Get Product Details
- **URL**: `GET /market/products/:id`
- **Auth**: None

### Create Product (ADMIN)
- **URL**: `POST /market/products`
- **Auth**: `Bearer <admin_token>`
- **Body**:
```json
{
    "name": "New Product",
    "description": "Product Description",
    "price": 99.99,
    "stock": 10,
    "category": { "id": "cat-uuid" }
}
```

### Upload Product Images (ADMIN)
- **URL**: `POST /market/products/:id/upload`
- **Auth**: `Bearer <admin_token>`
- **Body**: `multipart/form-data` with field `images`.

---

## Categories
### List Categories
- **URL**: `GET /market/categories`

### Create Category (ADMIN)
- **URL**: `POST /market/categories`
- **Auth**: `Bearer <admin_token>`
- **Body**: `{ "name": "Electronics", "description": "Gagdgets" }`

---

## Favorites
### Toggle Favorite
- **URL**: `POST /market/favorites/toggle/:productId`
- **Auth**: `Bearer <token>`
- **Output**: `{ "added": true/false }`

---

## Orders & Payments
### Create Order
- **URL**: `POST /market/orders`
- **Auth**: `Bearer <token>`
- **Body**:
```json
{
    "items": [
        { "productId": "uuid", "quantity": 1 }
    ]
}
```

### Pay Order (Simple)
- **URL**: `POST /market/orders/:id/pay`
- **Auth**: `Bearer <token>`
- **Output**: Payment record details.

### My Order History
- **URL**: `GET /market/orders/me`
- **Auth**: `Bearer <token>`

### All Orders (ADMIN)
- **URL**: `GET /market/orders`
- **Auth**: `Bearer <admin_token>`
