from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bankdata.db'
db = SQLAlchemy(app)
# account_id,district_id,frequency,parseddate,year,month,day
class CompletedAcct(db.Model):
    __tablename__ = 'completedacct'
    account_id = db.Column(db.String(30), primary_key=True)
    district_id = db.Column(db.Integer)
    frequency = db.Column(db.String(30))
    parseddate = db.Column(db.Datetime, nullable=False)
    year = db.Column(db.String(30), nullable=False)
    month = db.Column(db.Integer, nullable=False)
    day = db.Column(db.Integer, nullable=False)

# card_id,disp_id,type,year,month,day,fulldate
class CompletedCard(db.Model):
    __tablename__ = 'completedcard'
    card_id = db.Column(db.String(30), primary_key=True)
    disp_id = db.Column(db.String(30))
    type = db.Column(db.String(30))
    year = db.Columnn(db.String(30))
    month = db.Column(db.Integer)
    day = db.Column(db.Integer)
    fulldate = db.Column(db.Datetime)
    
    
@app.route('/api/get_completedacct')
def get_compacct():
    try:
        data = CompletedAcct.query.all()
        data_list = [{'account_id': item.account_id, 'district_id': item.district_id, 
                      'frequency': item.frequency, 'parseddate': item.parseddate, 'year':item.year,
                      'month': item.month, 'day': item.day}
                     for item in data]
        return jsonify({"success": True, "data": data_list})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

@app.route('/api/get_completedcard')
def get_compcard():
    try:
        data = CompletedCard.query.all()
        data_list = [{'card_id': item.card_id, 'disp_id': item.disp_id, 
                      'type': item.type, 'year': item.year, 'month':item.month,
                      'day': item.day, 'fulldate': item.fulldate}
                     for item in data]
        return jsonify({"success": True, "data": data_list})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)