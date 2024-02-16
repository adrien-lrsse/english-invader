from flask import render_template, request, redirect

from . import root_blueprint

@root_blueprint.route('/')
def root():
    return "English Invader"