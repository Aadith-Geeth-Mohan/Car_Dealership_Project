from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
from database import get_db
import uuid

bp = Blueprint("auth", __name__, url_prefix="/")


@bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()

        if not username or not password:
            flash("Please enter both username and password.", "danger")
            return render_template("login.html")

        db = get_db()
        with db.cursor() as cursor:
            cursor.execute(
                "SELECT user_id, username, password, fname, lname, role FROM users WHERE username = %s",
                (username,)
            )
            user = cursor.fetchone()

        if user and check_password_hash(user["password"], password):
            session["user_id"] = user["user_id"]
            session["username"] = user["username"]
            session["fname"] = user["fname"]
            session["lname"] = user["lname"]
            session["role"] = user["role"]
            flash(f"Welcome back, {user['fname']}!", "success")
            return redirect(url_for("cars.index"))
        else:
            flash("Invalid username or password.", "danger")
            return render_template("login.html")

    return render_template("login.html")


@bp.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()
        fname = request.form.get("fname", "").strip()
        lname = request.form.get("lname", "").strip()

        if not username or not password or not fname or not lname:
            flash("All fields are required.", "danger")
            return render_template("register.html")

        if len(password) < 6:
            flash("Password must be at least 6 characters.", "danger")
            return render_template("register.html")

        db = get_db()
        with db.cursor() as cursor:
            cursor.execute("SELECT user_id FROM users WHERE username = %s", (username,))
            if cursor.fetchone():
                flash("Username already exists.", "danger")
                return render_template("register.html")

            hashed_pw = generate_password_hash(password)
            cursor.execute(
                "INSERT INTO users (username, password, fname, lname, role) VALUES (%s, %s, %s, %s, 'customer')",
                (username, hashed_pw, fname, lname)
            )

        flash("Registration successful! Please log in.", "success")
        return redirect(url_for("auth.login"))

    return render_template("register.html")


@bp.route("/logout")
def logout():
    session.clear()
    flash("You have been logged out.", "info")
    return redirect(url_for("auth.login"))