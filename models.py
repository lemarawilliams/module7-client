from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Users Table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    wishlists = db.relationship('Wishlist', backref='user', lazy=True)

# Wishlist Table
class Wishlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    is_public = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    items = db.relationship('WishlistItem', backref='wishlist', lazy=True)
    

# Wishlist Items Table
class WishlistItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    wishlist_id = db.Column(db.Integer, db.ForeignKey('wishlist.id'), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50))
    image_url = db.Column(db.String(255), default="default_image_url_here")
    link = db.Column(db.String(255))
    

# Tags Table
class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    items = db.relationship('WishlistItemTag', backref='tag', lazy=True)

# WishlistItemTag (Association Table for Many-to-Many Relationship)
class WishlistItemTag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    wishlist_item_id = db.Column(db.Integer, db.ForeignKey('wishlist_item.id'), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)

# Links Table
class Link(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    wishlist_id = db.Column(db.Integer, db.ForeignKey('wishlist.id'), nullable=False)
    shared_with = db.Column(db.String(120))  # Email address or user identifier
    is_external = db.Column(db.Boolean, default=True)  # Indicates if shared with non-users
    
