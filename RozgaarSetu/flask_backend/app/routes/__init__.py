from .jobs import jobs_blueprint
from .users import users_blueprint

def register_routes(app):
    app.register_blueprint(jobs_blueprint, url_prefix='/api')
    app.register_blueprint(users_blueprint, url_prefix='/api')
