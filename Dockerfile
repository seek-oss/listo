FROM node:10 as builder

WORKDIR /usr/src/listo


ADD server/package.json server/yarn.lock ./server/
ADD frontend/package.json frontend/yarn.lock ./frontend/
RUN (cd frontend && yarn install) && (cd server && yarn install)
ARG REACT_APP_TRELLO_JIRA_MODE='JIRA'
ENV REACT_APP_TRELLO_JIRA_MODE=$REACT_APP_TRELLO_JIRA_MODE
ADD server server
ADD frontend frontend

RUN cd server && yarn run build ; cd ..
RUN cd frontend && REACT_APP_TRELLO_JIRA_MODE=${REACT_APP_TRELLO_JIRA_MODE} REACT_APP_API_URL=/api yarn run build ; yarn run build:schema ; cd ..

FROM node:10-slim

RUN mkdir /opt/listo
WORKDIR /opt/listo
COPY --from=builder /usr/src/listo/frontend/build frontend
COPY --from=builder /usr/src/listo/server/build/server/src server
COPY --from=builder /usr/src/listo/server/node_modules server/node_modules
COPY --from=builder /usr/src/listo/frontend/data-schema.json .
ENV SCHEMA_PATH=/opt/listo/data-schema.json
ENV FRONTEND_ASSETS_PATH=/opt/listo/frontend
CMD [ "node", "server/app.js"]