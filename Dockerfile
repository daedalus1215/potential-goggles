
# for mac OS
FROM node 
# FROM node AS builder # for windows and macSO


# kink: Need to resolve: debconf: delaying package configuration, since apt-utils is not installed
# kink: Need to resolve: package.json error

LABEL maintainer="ladams1776@yahoo.com"

# comment when windows or linux
EXPOSE 3001 

RUN apt-get update
RUN apt-get install --no-install-recommends --no-install-suggests -y yarn
WORKDIR /app
COPY . .
RUN yarn install

# if operating system is not macOS uncomment belo
# FROM node 
# EXPOSE 3000
# WORKDIR /app
# COPY --from=builder /app .
ENV DEBIAN_FRONTEND teletype
CMD ["yarn", "run", "start"] 
