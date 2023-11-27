from flask import current_app, render_template
from my_db import Database

def home_page():
    return render_template("home.html")


def loans_page():
    db = current_app.db  #config["db"]
    loans = db.get_loans()
    print(loans)
    return render_template("loans.html", loans=sorted(loans))
