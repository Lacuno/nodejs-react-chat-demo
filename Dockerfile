FROM node:lts-alpine

ENV PATH /app/node_modules/.bin:$PATH

COPY backend-node /app/backend-node
COPY frontend-react /app/frontend-react

WORKDIR /app/frontend-react
RUN yarn install --silent
RUN yarn run build

FROM node:lts-alpine

WORKDIR /app
COPY --from=0 /app/backend-node .

CMD ["node", "index.js"]
