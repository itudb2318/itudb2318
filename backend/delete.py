import json
import mysql.connector

def delete_item(table_name, item_id, db_config):
    if table_name == 'completedacct':
        table_id = 'account_id'
    elif table_name == 'completedcard':
        table_id = 'card_id'
    elif table_name == 'completedclient':
        table_id = 'client_id'
    elif table_name == 'completeddisposition':
        table_id = 'disp_id'
    elif table_name == 'completeddistrict':
        table_id = 'district_id'
    elif table_name == 'completedloan':
        table_id = 'loan_id'
    elif table_name == 'completedtrans':
        table_id = 'trans_id'
    elif table_name == 'crm_events':
        table_id = 'id'
        
    # Use a placeholder (%s) to avoid SQL injection
    query = f"DELETE FROM {table_name} WHERE {table_id} = %s"
    
    # Tuple with the item_id as its only element
    values = (item_id,)

    # Connect to the database and execute the query
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()
    try:
        cursor.execute(query, values)
    except Exception as e:
        print(e)
    
    # Commit the changes and close the cursor and connection
    connection.commit()
    cursor.close()
    connection.close()

    return "Data deleted successfully"