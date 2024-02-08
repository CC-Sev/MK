import psycopg2 

conn = psycopg2.connect(
    host="localhost",
    database="mk",
    user="postgres",
    password="1234",
    port="5432"
)

cur = conn.cursor()

with open('/Users/rozteves/Documents/MK/static/drink_images/kubota_manju.jpg', 'rb') as f:
    pic = f.read()

cur.execute("UPDATE sake SET image_id = %s WHERE id = 13", (pic,))

#cur.execute("INSERT INTO dessert (name, description, price) VALUES ('Honey Crunch Bread Pudding', 'honey butter, furikake, vanilla ice cream', 10.00)")

#cur.execute("DELETE FROM dessert WHERE id=6")

#cur.execute("ALTER TABLE non_alcohol ADD COLUMN image_id BYTEA")

conn.commit()
cur.close()
conn.close()
