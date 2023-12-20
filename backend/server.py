from flask import Flask, jsonify
from flask_cors import CORS  # Cross-Origin Resource Sharing
import mysql.connector


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})    

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '05542575141',
    'database': 'banking'
}


@app.route('/api/data/get_completedacct', methods=['GET'])
def get_completedacct():
    return get_data_from_table('completedacct')    

@app.route('/api/data/get_completedcard', methods=['GET'])
def get_completedcard():
    return get_data_from_table('completedcard')

@app.route('/api/data/get_completedclient', methods=['GET'])
def get_completedclient():
    return get_data_from_table('completedclient')

@app.route('/api/data/get_completeddisposition', methods=['GET'])
def get_completeddisposition():
    return get_data_from_table('completeddisposition')

@app.route('/api/data/get_completeddistrict', methods=['GET'])
def get_completeddistrict():
    return get_data_from_table('completeddistrict')

@app.route('/api/data/get_completedloan', methods=['GET'])
def get_completedloan2():
    return get_data_from_table('completedloan')

@app.route('/api/data/get_completedtrans', methods=['GET'])
def get_completedtrans():
    return get_data_from_table('completedtrans')

@app.route('/api/data/get_crm_events', methods=['GET'])
def get_crm_events():
    return get_data_from_table('crm_events')


def get_data_from_table(table_name):
    #connecting to MySQL database
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(buffered=True)

    #querying table
    query = f"SELECT * FROM {table_name} LIMIT 3000"
    cursor.execute(query)

    #fetching all rows
    data = cursor.fetchall()

    #converting data to a list of dictionaries
    columns = [desc[0] for desc in cursor.description]
    result = [dict(zip(columns, row)) for row in data]

    #closing the cursor and connection
    cursor.close()
    connection.close()

    return jsonify(result)
    

@app.route('/api/data', methods=['GET'])
def get_data():
    # Connect to MySQL database
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='pw',
        database='banking'
    )


if __name__ == '__main__':
    app.run(debug=True)
