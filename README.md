### First time running the project?
1. Will need Mongo
2. Need to make sure we create 'tasks' db in the Mongo
3. Pull down the react app
4. run yarn install to get all the libraries
5. yarn start in one cli
6. yarn nodemon server.js in another cli

In order to run the application you will need to run both `yarn start` and `yarn nodemon server.js`

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn nodemon server.js`

Runs the backend portion of the application.

You might have to tweak `server.js`, and what mongodb server it is pointing at. Currently just setting it based on the port Kitematic spins up for a docker mongodb instance


### Docker

Can run `docker-compose up` and run the 3 containers, 1 for client, 1 for server, 1 for db.

Client should be visitable at: http://172.28.1.2:3000


### What I want to do

-- Adjust all existing tests that use a context to use helper
0. (Part of #1) Circle back over to the Contexts and come up with a pattern for handling them.
1. break apart the context
2. finish up the unit test on react components
3. unit test the endpoints (server.js)
