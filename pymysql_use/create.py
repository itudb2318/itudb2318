import pymysql

connection = pymysql.connect(user='root', password='', host='localhost', database='banking')

placeholder = ("loan_id", "account_id", "amount", "duration", "payments", "status", "year", "month", "day", "fulldate", "location", "purpose")

values = []

for i in range (12):
    val = input(f"Enter values for {placeholder[i]} : ")
    values.append(val)
    
try:
    with connection.cursor() as cursor:
        
        sql = "INSERT INTO completedloan (loan_id, account_id, amount, duration, payments, status, year, month, day, fulldate, location, purpose) VALUES (%d, %s, %d, %d, %d, %s, %s, %d, %d, %s, %d, %s)"

        cursor.execute(sql, values)

        connection.commit()
        
        print(f"Number of rows inserted: {cursor.rowcount}")

finally:
    connection.close()

