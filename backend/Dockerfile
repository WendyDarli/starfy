FROM node:24-alpine

WORKDIR /app

COPY package*.json .
RUN npm ci

RUN addgroup -g 1001 -S app && \
    adduser -S -u 1001 -G app app
RUN mkdir -p /app&& chown -R app:app /app
USER app

COPY --chown=app:app . .

EXPOSE 8000

CMD ["npm", "run", "dev"]
