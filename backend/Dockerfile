FROM node:16

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "server.js"]  # Assurez-vous que votre fichier d'entrée est bien 'server.js'
