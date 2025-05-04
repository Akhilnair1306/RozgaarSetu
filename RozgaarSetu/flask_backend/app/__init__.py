from flask import Flask
from flask_cors import CORS
from .db import init_db
from .routes import register_routes

def create_app():
    app = Flask(__name__)
    init_db(app)

    # Correct CORS setup
    CORS(app,
         resources={r"/api/*": {"origins": "http://localhost:5173"}},
         supports_credentials=True)
    # CORS(app, resources={r"/api/*": {"origins": "*"}})  # Not for production!


    register_routes(app)
    return app
