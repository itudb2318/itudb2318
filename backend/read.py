import pymysql


conn = pymysql.connect(user='root', password='', host='localhost', database='banking')
cursor = conn.cursor()


client_ID = input("Enter Client ID to search : ")

query = "SELECT * FROM completedloan WHERE completedloan.client_ID = %s"

try:
    
    cursor.execute(query, (client_ID))
    
    results = cursor.fetchall()

    print("Resulting records for the search:")
    for row in results:
        print(row)
    
    if not results:
        print("Search Client ID not found")

except pymysql.connect.Error as err:
    print("Error:", err)

cursor.close()
conn.close()
