import psycopg2
import json

conn = psycopg2.connect(
    host="localhost",
    database="mk",
    user="postgres",
    password="1234",
    port="5432"
)

cur = conn.cursor()

query = "SELECT * FROM signature_cocktails;"

cur.execute(query)

result = []
rows = cur.fetchall()
for row in rows:
    row_dict = {
        "id": row[0],
        "name": row[1],
        "description": row[2],
        "price": "{:.2f}".format(float(row[3]))
        }
    result.append(row_dict)
        
        
json_result = json.dumps(result,indent=4)
print(json_result)

    
cur.close()
conn.close()