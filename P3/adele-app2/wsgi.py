# app/wsgi.py

from app import create_app

# Crée l'objet application Flask en utilisant la configuration 'dev'
application = create_app('dev')