import pymysql


conn = pymysql.connect(user='root', password='', host='localhost', database='banking')

amount = input("Enter amount to UPDATE : ")

try:
    with conn.cursor() as cursor:
        
        sql = "UPDATE completedloan SET amount = {amount} WHERE amount < 7000"
        
        cursor.execute(sql)

        conn.commit()

        print(f"Number of rows updated: {cursor.rowcount}.")

finally:
    conn.close()

