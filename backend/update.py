import json
import mysql.connector

def update_data(table_name, item_id, data, db_config):
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()
    if table_name == 'completedacct':
        set_clause = ', '.join([f"{key}=%s" for key in data.keys()])
        query = f"UPDATE {table_name} SET {set_clause} WHERE account_id=%s"

        update_values = tuple(str(data[key]) if key == 'account_id' else data[key] for key in data.keys())
    elif table_name == 'completeddistrict':
        set_clause = ', '.join([f"{key}=%s" for key in data.keys()])
        query = f"UPDATE {table_name} SET {set_clause} WHERE district_id=%s"

        # Explicitly cast the district_id to a string
        update_values = tuple(str(data[key]) if key == 'district_id' else data[key] for key in data.keys())
    elif table_name == 'completedtrans':
        set_clause = ', '.join([f"{key}=%s" for key in data.keys()])
        query = f"UPDATE {table_name} SET {set_clause} WHERE trans_id=%s"

        update_values = tuple(str(data[key]) if key == 'trans_id' else data[key] for key in data.keys())
    elif table_name == 'completedloan':
        set_clause = ', '.join([f"{key}=%s" for key in data.keys()])
        query = f"UPDATE {table_name} SET {set_clause} WHERE loan_id=%s"

        update_values = tuple(str(data[key]) if key == 'loan_id' else data[key] for key in data.keys())
    elif table_name == 'completedclient':
        set_clause = ', '.join([f"{key}=%s" for key in data.keys()])
        query = f"UPDATE {table_name} SET {set_clause} WHERE client_id=%s"

        update_values = tuple(str(data[key]) if key == 'client_id' else data[key] for key in data.keys())
    elif table_name == 'completeddisposition':
        set_clause = ', '.join([f"{key}=%s" for key in data.keys()])
        query = f"UPDATE {table_name} SET {set_clause} WHERE disp_id=%s"

        update_values = tuple(str(data[key]) if key == 'disp_id' else data[key] for key in data.keys())
    elif table_name == 'completedcard':
        set_clause = ', '.join([f"{key}=%s" for key in data.keys()])
        query = f"UPDATE {table_name} SET {set_clause} WHERE card_id=%s"

        
        update_values = tuple(str(data[key]) if key == 'card_id' else data[key] for key in data.keys())
    elif table_name == 'crm_events':
        set_clause = ', '.join([f"{key}=%s" for key in data.keys()])
        query = f"UPDATE {table_name} SET {set_clause} WHERE id=%s"

    
        update_values = tuple(str(data[key]) if key == 'id' else data[key] for key in data.keys())
    
    try:
        cursor.execute(query, update_values + (str(item_id),))
    except Exception as e:
        print(e)

    connection.commit()
    
    cursor.close()
    connection.close()
    
    return "Data updated successfully" 
