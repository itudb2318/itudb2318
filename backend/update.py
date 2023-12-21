import json
import mysql.connector

def update_data(table_name, item_id, data, db_config):
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    set_clause = ', '.join([f"{key}=%s" for key in data.keys()])
    query = f"UPDATE {table_name} SET {set_clause} WHERE district_id=%s"

    cursor.execute(query, tuple(data.values()) + (item_id,))

    connection.commit()
    
    cursor.close()
    connection.close()
