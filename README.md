# Express Products API

A simple Express.js server-side application for managing products.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd express-js-server-side-framework-Getrude25
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file if needed (see `.env.example` if provided).

### Running the Server

Start the server with:

```sh
node server.js
```

The server will run on `http://localhost:3000` by default.

---

## API Documentation

### Base URL

```
http://localhost:3000
```

### Endpoints

#### 1. Get All Products

- **URL:** `/products`
- **Method:** `GET`
- **Description:** Retrieve a list of all products.

**Example Request:**
```sh
curl http://localhost:3000/products
```

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "Product A",
    "price": 100
  },
  {
    "id": 2,
    "name": "Product B",
    "price": 200
  }
]
```

---

#### 2. Get Product by ID

- **URL:** `/products/:id`
- **Method:** `GET`
- **Description:** Retrieve a single product by its ID.

**Example Request:**
```sh
curl http://localhost:3000/products/1
```

**Example Response:**
```json
{
  "id": 1,
  "name": "Product A",
  "price": 100
}
```

---

#### 3. Create a New Product

- **URL:** `/products`
- **Method:** `POST`
- **Description:** Add a new product.
- **Request Body:**
  ```json
  {
    "name": "Product C",
    "price": 300
  }
  ```

**Example Request:**
```sh
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Product C","price":300}'
```

**Example Response:**
```json
{
  "id": 3,
  "name": "Product C",
  "price": 300
}
```

---

#### 4. Update a Product

- **URL:** `/products/:id`
- **Method:** `PUT`
- **Description:** Update an existing product.
- **Request Body:**
  ```json
  {
    "name": "Updated Product",
    "price": 400
  }
  ```

**Example Request:**
```sh
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Product","price":400}'
```

**Example Response:**
```json
{
  "id": 1,
  "name": "Updated Product",
  "price": 400
}
```

---

#### 5. Delete a Product

- **URL:** `/products/:id`
- **Method:** `DELETE`
- **Description:** Delete a product by its ID.

**Example Request:**
```sh
curl -X DELETE http://localhost:3000/products/1
```

**Example Response:**
```json
{
  "message": "Product deleted successfully"
}
```

---

## Error Handling

All errors are returned in the following format:

```json
{
  "error": "Error message here"
}
```

---

## License

This project is licensed under the MIT License.