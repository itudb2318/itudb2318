def delete_item(table_name, item_id):
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
        
    query = f"DELETE FROM {table_name} where {table_id} = {id};"