# Build context must be the REPO ROOT (the server requires ../shared/gameRules):
#   docker build -f db/Dockerfile -t elysia-server .
FROM node:22-alpine

WORKDIR /app

COPY db/package.json db/package-lock.json ./db/
RUN cd db && npm ci --omit=dev

COPY db ./db
COPY shared ./shared

WORKDIR /app/db
ENV PORT=3001
EXPOSE 3001

CMD ["node", "server.js"]
