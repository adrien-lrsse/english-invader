from flask import render_template, request, redirect

from . import game_blueprint

@game_blueprint.route('/game')
def game():
    return render_template("game.html")