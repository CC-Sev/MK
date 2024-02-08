import psycopg2 

conn = psycopg2.connect(
    host="localhost",
    database="mk",
    user="postgres",
    password="1234",
    port="5432"
)

cur = conn.cursor()

cur.execute("CREATE TABLE reservations (reservation_id SERIAL PRIMARY KEY, customer_id INT REFERENCES customers(customer_id), reservation_datetime TIMESTAMP, num_guests INT)")

cur.close()
conn.commit()
conn.close()