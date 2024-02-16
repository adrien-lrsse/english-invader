from flask import Blueprint

root_blueprint = Blueprint('root', __name__, template_folder='templates')

from . import routes