import mysql.connector
import json

def insert_data(table_name, data, db_config):
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    columns = ', '.join(data.keys())
    values = ', '.join(['%s' for _ in data.values()])

    query = f"INSERT INTO {table_name} ({columns}) VALUES ({values})"
    
    try:
        cursor.execute(query, tuple(data.values()))
    except Exception as e:
        msg = str(e)
        return msg

    connection.commit()

    cursor.close()
    connection.close()
    
    return "Data inserted successfully" 
