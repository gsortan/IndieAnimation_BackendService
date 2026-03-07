# Indie Animation Hub — Backend

Backend API for **Indie Animation Hub**, a platform for discovering independent animated series and shorts.

The backend provides endpoints for retrieving animation data, filtering animations, and supporting search functionality used by the frontend application.

---

## Features

### Animation API
Endpoints to retrieve:

- Animation catalogue
- Individual animation details
- Ratings and rating counts

### Advanced Filtering
Supports filtering animations by:

- Tags
- Rating range
- Episode count
- Release year
- Creator name
- Synopsis text search

### Pagination
Efficient pagination for large animation datasets.

---

## Tech Stack

- Node.js
- Express
- PostgreSQL
- TypeScript
- REST API architecture

---

## Installation

```
Clone the repository: git clone https://github.com/gsortan/IndieAnimation_BackendService.git
Install dependencies: npm install
Create a .env file in the root directory and add the following variables:
DATABASE_URL = <database URL here>
Run the development server: npm run dev
```
