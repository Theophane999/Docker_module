# Dockerfile

# Étape 1: Utiliser une image Python officielle
FROM python:3.10-slim

# Étape 2: Installer les dépendances système nécessaires pour la compilation
RUN apt-get update && apt-get install -y \
    gcc \
    pkg-config \
    libpq-dev \
    libffi-dev \
    python3-dev \
    musl-dev \
    # Nettoyage
    && rm -rf /var/lib/apt/lists/*

# Étape 3: Définir le répertoire de travail dans le conteneur
WORKDIR /app

# NOUVELLE LIGNE CRITIQUE : Créer le répertoire 'db' pour SQLite.
RUN mkdir -p db

# Étape 4: Copier le fichier requirements.txt et installer les dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --upgrade setuptools pyparsing --no-cache-dir

# Étape 5: Copier le reste du code dans le répertoire /app
COPY . /app/

# Étape 6: Ajouter le répertoire racine au PYTHONPATH
ENV PYTHONPATH=/app:$PYTHONPATH

# Étape 7: Exposer le port de l'application Flask
EXPOSE 5000

# Étape 8: Commande de démarrage pour Gunicorn (Mode DEBUG conservé)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--worker-class", "gevent", "--log-level", "debug", "wsgi:application"]