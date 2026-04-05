# 💰 Finance Management Backend API

This project is a backend system developed to manage financial records with role-based access control. It provides a set of REST APIs to handle transactions, generate summaries, and derive useful insights from financial data.

---

## 🚀 Features

* Role-Based Access Control (Admin, Analyst, Viewer)
* CRUD operations for financial records
* Pagination, filtering, and sorting support
* Summary APIs (income, expense, balance, trends)
* Insights API using basic statistical calculations
* Input validation and structured error handling
* Soft delete and permanent delete functionality

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## 📁 Project Structure

```text id="p9sjqy"
zorvyn/
├── server.js
├── package.json
├── package-lock.json
├── src/
│   ├── app.js
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── validators/
│   ├── config/
```

---

## ⚙️ Setup Instructions

1. Clone the repository

```bash id="cb6oie"
git clone <https://github.com/AkshayJha1/zorvyn.git>
cd zorvyn
```

2. Install dependencies

```bash id="kn3f4q"
npm install
```

3. Create a `.env` file in the root directory

```env id="oymx5r"
PORT=5000
MONGO_URI = 
```

4. Start the server

```bash id="e6sdks"
node server.js
```

---

## 📌 API Endpoints

### 👤 Users

* **POST /api/users** → Create a new user
* **GET /api/users** → Get all user (support category and type filteration)
* **PATCH /api/users/:id/role** → Update user role (Admin only)
* **PATCH /api/users/:id/status** → Update user status (Admin only)

---

### 💸 Records

* **POST /api/records** → Create record (Admin only)
* **GET /api/records** → Get records (supports pagination, filtering, and sorting)
* **PATCH /api/records/:id** → Update record
* **DELETE /api/records/:id** → Soft delete record
* **DELETE /api/records/:id/permanent** → Permanent delete

---

### 📊 Summary APIs

* **GET /api/summary/income** → Total income
* **GET /api/summary/expense** → Total expense
* **GET /api/summary/balance** → Net balance
* **GET /api/summary/category** → Category-wise totals
* **GET /api/summary/recent** → Recent transactions
* **GET /api/summary/trends** → Monthly trends

---

### 📈 Insights API

* **GET /api/insights**

Provides:

* Average income and expense
* Standard deviation of expenses
* Expense-to-income ratio
* Top spending category
* Total number of transactions

---

## 🔐 Role-Based Access

* **Admin**

  * Create, update, and delete records
  * Manage user roles

* **Analyst**

  * View records
  * Access summary and insights

* **Viewer**

  * Read-only access to records

---

## 🧪 Testing

All APIs have been tested using Postman to ensure:

* Proper role-based access control
* Correct responses
* Error handling for invalid inputs

---

## 📌 Important Notes

* Record creation is restricted to Admin as per assignment requirements.
* Summary APIs operate on overall system data.
* Insights API uses basic statistical methods to provide meaningful analysis.

---

## 🚀 Future Improvements

* Add JWT-based authentication
* Deploy backend on cloud platforms
* Add unit and integration testing
* Enhance API documentation with Swagger
* Introduce advanced data analysis features such as trends prediction and improved statistical insights for better financial understanding

---

## 💡 About This Project

This project was built to demonstrate practical backend development skills including API design, modular architecture, role-based access control, and data analysis using aggregation and basic statistics.
