import mysql.connector
import json

def insert_data(table_name, data, db_config):
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    columns = ', '.join(data.keys())
    values = ', '.join(['%s' for _ in data.values()])

    query = f"INSERT INTO {table_name} ({columns}) VALUES ({values})"
    cursor.execute(query, tuple(data.values()))

    connection.commit()

    cursor.close()
    connection.close()
