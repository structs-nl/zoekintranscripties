# INGEST

The ingest server is used as the only data entry point for the elasticsearch database. It has a single endpoint that accepts a jsonld file and then processes this file for database entry. There are 2 elasticsearch indices, one is used to store the entire jsonld foreach inventory as a whole and foreach scan. The second index is used for performing elastic queries on. This index has a much simpler schema than jsonld uses in order to increase the performance of these queries and to add features such as highlighting.

The architecture of this server is identical to the `/api` server. For more info on this, take a look at the readme of the `/api` server.

# How to run in a production environment

- Requires node 14.16
- Run `npm install` to install all dependencies
- Run `npm run build` to build the production files
- Run `npm run start` to run the production server

# Environment

By default, the app runs on port 5000 and it needs a link to an elastic server. This can be configured with environment variables. See a list of all environment variables in the file: `.env.sample`
