[Marthas-Good-Eats-README.md](https://github.com/user-attachments/files/32393839/Marthas-Good-Eats-README.md)

# Martha's Good Eats

A full-stack restaurant menu management application built with Node.js, Express, EJS, and PostgreSQL.

The project demonstrates a server-rendered web application with a PostgreSQL data access layer, menu management pages, and REST-style CRUD endpoints.

## Features

- Display menu items stored in PostgreSQL
- Add, edit, and delete menu items
- Delete confirmation view
- JSON menu API
- Create, update, partially update, and delete API operations
- Environment-based database configuration

## Technologies

- Node.js
- Express
- EJS
- PostgreSQL
- JavaScript
- HTML / CSS
- method-override
- dotenv
- Git & GitHub

## Project Structure

```text
routes/
  menu.js             Menu pages and API routes

services/
  db.js               PostgreSQL connection pool
  menu.dal.js         Menu data access layer

views/
  landing.ejs
  menu.ejs
  add_menu_item.ejs
  edit-menu-item.ejs
  delete-menu-item.ejs

public/                Static assets
index.js               Express application entry point
```

## Data Layer

The application uses a dedicated data access layer for PostgreSQL operations. Menu items are stored in a `menu_items` table and accessed with parameterized SQL queries.

The data layer supports retrieving all menu items, retrieving an item by ID, creating an item, updating an item, and deleting an item.

Each menu item contains a name, description, and price.

## API Routes

```text
GET     /menu/api/menu
POST    /menu/api/menu
PUT     /menu/api/menu/:id
PATCH   /menu/api/menu/:id
DELETE  /menu/api/menu/:id
```

## Local Setup

```bash
git clone https://github.com/RobV34/QAP3_FSDB.git
cd QAP3_FSDB
npm install
```

Create a PostgreSQL database with a `menu_items` table containing:

```text
id
name
description
price
```

Configure the database connection using environment variables:

```text
DB_USER=
DB_HOST=
DB_NAME=
DB_PASS=
DB_PORT=
```

Start the application:

```bash
node index.js
```

The server runs on port `3000` by default unless a different `PORT` environment variable is provided.

## What This Project Demonstrates

Martha's Good Eats demonstrates full-stack CRUD development with Express routing, EJS server-side rendering, PostgreSQL persistence, a separate data access layer, parameterized SQL queries, HTML form workflows, and REST-style API endpoints.

---

**Rob Vatcher**  
Software Development — Keyin College
