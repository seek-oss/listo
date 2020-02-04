FROM node:10 as builder


WORKDIR /usr/src/listo
ADD server/package.json server/package.json
ADD frontend/package.json frontend/package.json
ADD yarn.lock package.json ./
RUN yarn install

ADD server server
ADD frontend frontend

RUN cd server && yarn run build ; cd ..
RUN cd frontend && REACT_APP_API_URL=/api yarn run build ; cd ..

WORKDIR /usr/src/listo/server/build/server/src
ENV SCHEMA_PATH=/usr/src/listo/frontend/data-schema.json
ENV FRONTEND_ASSETS_PATH=/usr/src/listo/frontend/build
CMD [ "node", "app.js"]
