# Only used for Docker-based deployment.
# Not required for local development (use npm start in backend folder).

FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]

