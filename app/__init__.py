from flask import Flask

def create_app():
    app = Flask(__name__)

    #Blueprints
    from app.root import root_blueprint

    app.register_blueprint(root_blueprint)

    return app