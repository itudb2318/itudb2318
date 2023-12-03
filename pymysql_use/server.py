from flask import Flask, jsonify
from flask_cors import CORS  # Cross-Origin Resource Sharing
import mysql.connector


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})    
    
@app.route('/api/data', methods=['GET'])
def get_data():
    # Connect to MySQL database
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='pw',
        database='banking'
    )

    cursor = connection.cursor()

    query = "SELECT * FROM completedacct"
    cursor.execute(query)

    #fetching all rows
    data = cursor.fetchall()

    #converting data to a list of dictionaries
    columns = [desc[0] for desc in cursor.description]
    result = [dict(zip(columns, row)) for row in data]

    # closing the cursor and connection
    cursor.close()
    connection.close()

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
