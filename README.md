# 📦 Inventory Management

A full-stack product inventory system using **Angular** and **.NET 8 Web API**. Supports user authentication, product CRUD operations, and dashboard analytics.

---

## 🚀 Features

* 🔐 User registration with hashed passwords
* 🔐 User login with secure session management
* 📦 Product CRUD (Add, List, Filter, Sort, Paginate)
* 📊 Dashboard with:
  * Product count by Brand & Type (Pie Charts)
  * Top 10 most expensive products
* 🧠 Angular routing with side nav based on login state

---

## 📦 Tech Stack

| Layer    | Tech Stack                         |
| -------- | ---------------------------------- |
| Frontend | Angular 16, HTML, SCSS, TypeScript |
| Backend  | ASP.NET 8 Web API, C#              |
| Database | SQL Server, EF Core ORM       |
| Charts   | Chart.js or ngx-charts             |

---

## 🛠️ Getting Started

### 🔧 Prerequisites

* Node.js & npm
* Angular CLI
* .NET 8 SDK
* SQL Server 2019

### 📂 Project Structure

```
InventoryManagemen/
├── API/                 # .NET 8 Web API backend
│   └── Controllers/     # Auth & Product APIs
├── AngularApp/          # Angular frontend
│   └── src/app/         # Components, services, guards
```

---

## ⚙️ Installation

### 1️⃣ API Setup

```bash
cd API
# Update appsettings.json with your SQL connection string
# Run migrations
add-migration initial
update-database
# Seed data
Run SqlDataCodeScript.sql manually
# Start API
dotnet run
```

### 2️⃣ Angular Setup

```bash
cd AngularApp
npm install
ng serve
```

App URL: [http://localhost:4200](http://localhost:4200)

---

## 🧪 Functionality Checklist 

* [x] Login page with email/password & nav control
* [x] Register with hashed password
* [x] Add product with validation & file upload
* [x] Product Listing (Table, Sort, Filter, Pagination)
* [x] Dashboard (Pie Charts & Top 10 expensive items)
* [x] Side nav visibility based on login/logout

---

## 🗂️ API Endpoints

| Endpoint             | Method | Description           |
| -------------------- | ------ | --------------------- |
| `/api/auth/login`    | POST   | User login            |
| `/api/auth/register` | POST   | New user registration |
| `/api/products`      | GET    | List products         |
| `/api/products`      | POST   | Add product           |
| `/api/brands`        | GET    | List brands           |
| `/api/productTypes`  | GET    | List product types    |

---

## 📄 License

MIT License – for educational use.

---
