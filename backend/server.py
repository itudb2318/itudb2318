from flask import Flask, jsonify, request
from flask_cors import CORS  # Cross-Origin Resource Sharing
import mysql.connector
from delete import delete_item
from update import update_data
from create import insert_data

app = Flask(__name__)
CORS(app)    

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '1234',
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

@app.route('/delete/<string:table_name>/<item_id>', methods=['DELETE'])
def delete(table_name, item_id):
    msg = delete_item(table_name, item_id, db_config)
    return msg

@app.route('/update/<string:table_name>/<item_id>', methods=['PUT'])
def update(table_name, item_id):
    data = request.get_json()
    msg = update_data(table_name, item_id, data, db_config)
    return msg
    
@app.route('/insert/<string:table_name>', methods=['POST'])
def insert(table_name):
    data = request.get_json()
    msg = insert_data(table_name, data, db_config)
    return msg


def get_data_from_table(table_name):
    #connecting to MySQL database
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(buffered=True)

    #querying table
    query = f"SELECT * FROM {table_name}"
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
    


if __name__ == '__main__':
    app.run(debug=True)
