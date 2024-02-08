from flask import Flask, render_template, send_file, request, redirect, url_for, jsonify
from io import BytesIO
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="static", template_folder="templates")

# Configure the database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost/mk'
db = SQLAlchemy(app)

# Define the data models
class Customer(db.Model):
    __tablename__ = 'customers'
    customer_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    email = db.Column(db.String(255))
    phone_number = db.Column(db.String(20))
    
    def __repr__(self):
        return '<Customer %r>' % self.name

class Hotpot(db.Model):
    __tablename__ = 'hot_pot'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    price = db.Column(db.Numeric(precision=10, scale=2))
    image_id = db.Column(db.LargeBinary)

class Noodle(db.Model):
    __tablename__ = 'noodles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    price = db.Column(db.Numeric(precision=10, scale=2))
    image_id = db.Column(db.LargeBinary)

# Define the Rice model
class Rice(db.Model):
    __tablename__ = 'rice'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    price = db.Column(db.Numeric(precision=10, scale=2))
    image_id = db.Column(db.LargeBinary)
    
class Dessert(db.Model):
    __tablename__ = 'dessert'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    price = db.Column(db.Numeric(precision=10, scale=2))
    image_id = db.Column(db.LargeBinary)
    
class Cocktail(db.Model):
    __tablename__ = 'signature_cocktails'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    price = db.Column(db.Numeric(precision = 10, scale = 2))
    image_id = db.Column(db.LargeBinary)
    
class Sake(db.Model):
    __tablename__ = 'sake'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    price = db.Column(db.Numeric(precision = 10, scale = 2))
    image_id = db.Column(db.LargeBinary)


class Non_alcohol(db.Model):
    __tablename__ = 'non_alcohol'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Numeric(precision = 10, scale = 2))
    image_id = db.Column(db.LargeBinary)
    


# Route to get noodle image
@app.route('/get_hotpot_image/<int:item_id>')
def get_hotpot_image(item_id):
    hotpot_items = Hotpot.query.get_or_404(item_id)
    return send_file(BytesIO(hotpot_items.image_id), mimetype = 'image/jpeg')

@app.route('/get_noodle_image/<int:item_id>')
def get_noodle_image(item_id):
    noodle_item = Noodle.query.get_or_404(item_id)
    return send_file(BytesIO(noodle_item.image_id), mimetype='image/jpeg')

# Route to get rice image
@app.route('/get_rice_image/<int:item_id>')
def get_rice_image(item_id):
    rice_item = Rice.query.get_or_404(item_id)
    return send_file(BytesIO(rice_item.image_id), mimetype='image/jpeg')

@app.route('/get_dessert_image/<int:item_id>')
def get_dessert_image(item_id):
    dessert_item = Dessert.query.get_or_404(item_id)
    return send_file(BytesIO(dessert_item.image_id), mimetype = 'image/jpeg')

# Route to display food items
@app.route('/food')
def food():
    hotpot_items = Hotpot.query.all()
    noodle_items = Noodle.query.all()
    rice_items = Rice.query.all()
    dessert_items = Dessert.query.all()
    return render_template('food.html', 
                           hotpot_items=hotpot_items,
                           rice_items=rice_items, 
                           noodle_items=noodle_items,
                           dessert_items=dessert_items)

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/get_cocktail_image/<int:item_id>')
def get_cocktail_image(item_id):
    cocktail_items = Cocktail.query.get_or_404(item_id)
    return send_file(BytesIO(cocktail_items.image_id), mimetype = 'image/jpeg')

@app.route('/get_sakey_image/<int:item_id>')
def get_sake_image(item_id):
    sake_items = Sake.query.get_or_404(item_id)
    return send_file(BytesIO(sake_items.image_id), mimetype='image/jpeg')

@app.route('/get_non_alcohol_image/<int:item_id>')
def get_non_alcohol_image(item_id):
    non_alcohol_items = Non_alcohol.query.get_or_404(item_id)
    return send_file(BytesIO(non_alcohol_items.image_id), mimetype = 'image/jpeg')

@app.route('/drinks')
def drinks():
    cocktail_items = Cocktail.query.all()
    sake_items = Sake.query.all()
    non_alcohol_items = Non_alcohol.query.all()
    return render_template('drinks.html',
                           cocktail_items=cocktail_items,
                           sake_items=sake_items,
                           non_alcohol_items=non_alcohol_items)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/order')
def order():
    rice_items = Rice.query.all()
    return render_template('order.html',
                           rice_items=rice_items)

@app.route('/reserve')
def reserve():
    return render_template('reserve.html')

@app.route('/reserve_post', methods=['POST'])
def reserve_post():
    # Get form data from the request
    name = request.form.get('name')
    phone = request.form.get('phone_number')  # Corrected attribute name
    email = request.form.get('email')

    print(f"Received form data: Name: {name}, Phone: {phone}, Email: {email}")

    # Insert form data into the 'customers' table
    customer = Customer(name=name, phone_number=phone, email=email)  # Corrected attribute name
    db.session.add(customer)
    db.session.commit()

    print("Customer inserted successfully!")

    # Optionally, you can return a response to the user indicating success
    return redirect(url_for('reserve'))


@app.route('/reserve_success')
def reserve_success():
    return render_template('reserve_success.html')

 
if __name__ == '__main__':
    app.run(debug=True)