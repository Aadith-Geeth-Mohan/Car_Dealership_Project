# Smart Car Dealership — Inventory & Sales Management

A MySQL-based database project with a Flask web interface for managing a car dealership. Built as part of the DBMS (21CSC205P) coursework at SRM Institute of Science and Technology.

---

## What This Does

- **Inventory Management** — Browse, search, and filter 200+ cars with specs, pricing, and availability
- **User Accounts** — Separate admin and customer roles with login authentication
- **Purchase Flow** — Customers initiate purchases → Admin verifies → Sale is finalized
- **Wishlist & Test Drives** — Customers can save cars and book test drive slots
- **Audit Trail** — All admin actions are logged with timestamps

---

## Tech Stack

- **Database** — MySQL 8.0
- **Backend** — Flask 3.0, PyMySQL
- **Frontend** — HTML5, Bootstrap 5, Vanilla JS
- **Auth** — Werkzeug password hashing, Flask sessions

---

## Project Structure

```
Project/
├── app.py              # Flask app entry point
├── config.py           # Database credentials and app settings
├── database.py        # MySQL connection helper
├── decorators.py      # @login_required and @admin_required
├── requirements.txt   # Python dependencies
├── routes/
│   ├── auth.py        # Login, register, logout
│   ├── cars.py        # Inventory browsing and search
│   ├── customer.py    # Wishlist, test drives, purchases
│   └── admin.py       # Verification, car management, logs
├── static/
│   ├── css/style.css  # Custom styles
│   └── js/main.js     # Frontend interactivity
└── templates/
    ├── base.html
    ├── login.html
    ├── register.html
    ├── index.html
    ├── car_detail.html
    ├── dashboard.html
    └── admin.html
```

---

## Getting Started

### 1. Prerequisites

- Python 3.10 or later
- MySQL 8.0 (running locally)
- Database `car_dealership_real` already created and populated

### 2. Install Dependencies

```bash
cd Project
pip install -r requirements.txt
```

### 3. Update Credentials

If your MySQL credentials differ from the defaults, edit `config.py`:

```python
DB_HOST = "localhost"
DB_PORT = 3306
DB_USER = "root"
DB_PASSWORD = "your_password"
DB_NAME = "car_dealership_real"
```

### 4. Run the App

```bash
python app.py
```

Open your browser and go to: **http://localhost:5000**

---

## Default Login Credentials

| Role     | Username       | Password      |
|----------|---------------|---------------|
| Admin    | Aadith_admin  | adminPass123  |
| Customer | rahul_customer| custPass789   |
| Customer | priya_v       | priyaPass321  |

---

## Known Quirks

- Car images are not included — the app falls back to a placeholder icon
- The `maintenance_records` table tracks service history but does not automatically change a car's `status` to Maintenance
- `sold` cars remain in the inventory listing but show as Sold and cannot be re-purchased

---

## Database Views

Three views are included in the schema:

| View | Purpose |
|------|---------|
| `sales_dashboard` | Profit analysis — sale price vs cost price |
| `customer_activity` | Per-customer transaction and wishlist counts |
| `maintenance_status` | Cars currently under service |

---

## Authors

- Aadith Geeth Mohan — RA2411026010393
- Ujjwal Pratap Singh — RA2411026010379

Under the guidance of **Dr. Sakthitharan**, Department of Computer Science Engineering, SRMIST.
