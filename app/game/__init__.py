from flask import Blueprint

game_blueprint = Blueprint('game', __name__, template_folder='templates')

from . import routes