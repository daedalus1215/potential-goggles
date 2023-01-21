FROM node

LABEL maintainer="ladams1776@yahoo.com"


EXPOSE 3001
RUN apt-get update
# RUN apt-get install --no-install-recommends --no-install-suggests -y npm
WORKDIR /app
COPY . .
RUN npm install

ENV DEBIAN_FRONTEND teletype
CMD ["npm", "run-script", "server"]
