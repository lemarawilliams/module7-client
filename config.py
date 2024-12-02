from flask_cors import CORS

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:28327677ARr$@localhost/wishlist_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
