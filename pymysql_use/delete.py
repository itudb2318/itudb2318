import pymysql


conn = pymysql.connect(user='root', password='', host='localhost', database='banking')

status = input("Enter status to DELETE : ")
print("The entered status is:", status)

try:
    with conn.cursor() as cursor:
        
        sql = "DELETE FROM completedloan WHERE status = {status}"

        cursor.execute(sql)
        
        conn.commit()
        
        print(f"Number of rows deleted: {cursor.rowcount}")  

finally:
    
    conn.close()

