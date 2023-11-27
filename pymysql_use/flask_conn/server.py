from flask import Flask
import settings
import views
from my_db import Database
from completedloan import completedloan

'''
def create_app():
    app = Flask(__name__)
    app.config.from_object("settings")

    app.add_url_rule("/", view_func=views.home_page)
    app.add_url_rule("/loans", view_func=views.loans_page)

    db = Database()
    db.add_loan(completedloan("L5657", account_id="A00002", 
                              amount=4500, duration=12, payments=3483, status="B", year=2019, month=7, day=27, date="2019-07-27", fulldate="2019-07-27", location=1, purpose="car"))
    db.add_loan(completedloan("L5658", account_id="A00001", 
                              amount=5900, duration=12, payments=1283, status="B", year=2020, month=7, day=23, date="2020-07-23", fulldate="2020-07-23", location=12, purpose="car"))
    app.config["db"] = db

    return app
'''
def create_app():
    app = Flask(__name__)
    app.config.from_object("settings")

    db = Database()
    db.add_loan(completedloan("L5657", account_id="A00002", 
                              amount=4500, duration=12, payments=3483, status="B", year=2019, month=7, day=27, date="2019-07-27", fulldate="2019-07-27", location=1, purpose="car"))
    db.add_loan(completedloan("L5658", account_id="A00001", 
                              amount=5900, duration=12, payments=1283, status="B", year=2020, month=7, day=23, date="2020-07-23", fulldate="2020-07-23", location=12, purpose="car"))
    
    app.db = db  # Attach the 'db' attribute directly to the app
    
    app.add_url_rule("/", view_func=views.home_page)
    app.add_url_rule("/loans", view_func=views.loans_page)

    return app


if __name__ == "__main__":
    app = create_app()
    port = app.config.get("PORT", 5000)
    app.run(host="0.0.0.0", port=port, debug=True)
