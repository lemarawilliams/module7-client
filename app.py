from flask import Flask, jsonify, request
from models import db, User, Wishlist, WishlistItem
from config import Config
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])

# Routes
@app.route("/")
def index():
    return jsonify({"message": "Welcome to the Wishlist App!"})

# User Registration (Sign-Up)
@app.route("/api/users", methods=["POST"])
def create_user():
    data = request.json
    if not data.get("username") or not data.get("email") or not data.get("password"):
        return jsonify({"message": "All fields are required."}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "Email already exists."}), 400

    new_user = User(
        username=data["username"],
        email=data["email"],
        password_hash=generate_password_hash(data["password"], method='pbkdf2:sha256', salt_length=16)  # Hash password
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": f"User {new_user.username} created successfully!"}), 201

# User Authentication (Sign-In)
@app.route("/api/signin", methods=["POST"])
def sign_in():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid email or password."}), 401

    return jsonify({"message": "Sign-in successful!", "user_id": user.id}), 200

@app.route("/api/wishlists", methods=["POST"])
def create_wishlist():
    data = request.json
    user = User.query.get(data["user_id"])
    if not user:
        return jsonify({"error": "User not found"}), 404

    new_wishlist = Wishlist(
        name=data["name"],
        is_public=data.get("is_public", False),
        user_id=user.id,
    )
    db.session.add(new_wishlist)
    db.session.commit()
    return jsonify({"message": f"Wishlist '{new_wishlist.name}' created successfully!"}), 201

@app.route("/api/users/<int:user_id>/wishboards", methods=["GET"])
def get_user_wishboards(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    wishboards = Wishlist.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            "id": wishlist.id,
            "name": wishlist.name,
            "is_public": wishlist.is_public
        } for wishlist in wishboards
    ]), 200

@app.route("/api/wishlists/<int:wishlist_id>/items", methods=["POST"])
def add_wishlist_item(wishlist_id):
    data = request.json
    wishlist = Wishlist.query.get(wishlist_id)
    if not wishlist:
        return jsonify({"error": "Wishlist not found"}), 404

    new_item = WishlistItem(
        wishlist_id=wishlist_id,
        name=data["name"],
        description=data.get("description", ""),
        category=data.get("category", ""),
        image_url=data.get("image_url", "default_image_url_here"),
        link=data.get("link", ""),
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify({"message": f"Item '{new_item.name}' added to wishlist '{wishlist.name}'!"}), 201

@app.route("/wishlists/<int:wishlist_id>/items", methods=["GET"])
def get_wishlist_items(wishlist_id):
    wishlist = Wishlist.query.get(wishlist_id)
    if not wishlist:
        return jsonify({"error": "Wishlist not found"}), 404

    items = WishlistItem.query.filter_by(wishlist_id=wishlist_id).all()
    return jsonify([
        {
            "id": item.id,
            "name": item.name,
            "description": item.description,
            "category": item.category,
            "image_url": item.image_url,
            "link": item.link,
        } for item in items
    ]), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Initialize the database tables
    app.run(debug=True)
