# Product API

This is the backend API for the MERN stack product management application.

## Endpoints

### GET /api/products
Retrieve all products.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "price": 99.99,
      "description": "Product description",
      "image": "image_url",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```

### POST /api/products
Create a new product.

**Request Body:**
```json
{
  "name": "Product Name",
  "price": 99.99,
  "description": "Product description",
  "image": "image_url"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "new_product_id",
    "name": "Product Name",
    "price": 99.99,
    "description": "Product description",
    "image": "image_url",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### PUT /api/products/:id
Update a product by ID.

**Request Body:** (same as POST, only include fields to update)

**Response:** (same as POST, with updated data)

### DELETE /api/products/:id
Delete a product by ID.

**Response:**
```json
{
  "success": true,
  "message": "Product deleted"
}
```

## Running the Server

1. Install dependencies: `npm install`
2. Start the server: `npm run dev`

The server runs on http://localhost:5000