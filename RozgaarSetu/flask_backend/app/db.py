import pymysql
from .config import db_config

def get_connection():
    return pymysql.connect(
        cursorclass=pymysql.cursors.DictCursor,
        **db_config
    )

def init_db(app):
    pass  # Placeholder for DB setup if needed
