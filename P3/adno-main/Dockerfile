# Étape 1 : build
FROM node:22 AS build

WORKDIR /app

# Installer outils pour dépendances natives
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copier package.json / yarn.lock
COPY package*.json ./
COPY yarn.lock ./

# Installer dépendances avec Yarn
RUN yarn install --frozen-lockfile

# Copier le code source
COPY . .

# Build full (le dossier créé sera 'adno-full')
RUN yarn build-full && ls -la adno-full


# Étape 2 : nginx
FROM nginx:stable-alpine

# Copier le build
COPY --from=build /app/adno-full /usr/share/nginx/html

# Configuration nginx SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
