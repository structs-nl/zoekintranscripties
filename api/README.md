# API

The api is used to communicate with elasticsearch and transform all data into the desirable format. On this server, data is only retrieved from elasticsearch. For writing data to elastic, have a look at the `/ingest` server. All endpoints are publicly available. However the Elastic server should not be exposed publicly and be ex

Express is used as the node server and defined in `/api/src/app.ts`. The popular npm package [https://tsoa-community.github.io/docs/](TSOA) is used to define routes and controllers. It automatically generates the OpenAPI documentation as a result. The generated files are located in the folder `./api/routes`.

Each group of endpoints has its own 'module'. Each module consists of at least a controller, service layer and a model. The controller is build with TSOA, handles requests and only invokes the service layer. The service layer of each module takes care of handling elasticsearch requests. The model is used to define the TypeScript models and is also used by TSOA to automatically generate examples of the response in the Swagger UI.

A guide for having a performant express server, the [https://expressjs.com/en/advanced/best-practice-performance.html](performance best practices) are taken into account. Google CDN takes care of caching, however only works for get requests. This is an area that could be improved upon.

# How to run in a production environment

- Requires node 14.16
- Run `npm install` to install all dependencies
- Run `npm run build` to build the production files
- Run `npm run start` to run the production server

# Environment

By default, the app runs on port 8080 and it needs a link to an elastic server. This can be configured with environment variables. See a list of all environment variables in the file: `.env.sample`

# FAQ

## How do I modify or add to the swagger.json config?

You can add configuration in the `/api/tsoa.json` file.
