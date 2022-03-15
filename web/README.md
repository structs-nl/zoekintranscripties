# Web

# Intro

This folder contains the frontend code of the project. It only communicates with our api with the exceptions of the IIF images that are addressed directly.

The [https://angular.io/guide/styleguide](angular style guide) was used as a guide in development. Most guidelines are transformed into linting rules that are checked when a developer commits changes.

Due to the size and scope of the project we have chosen to put all components and services into a single module. Also we have enabled serverside rendering which means that all frontend code is also transformed into html on the server. These operations are performed by an express server that is defined in `./server.ts`. It is important to realise while developing that all browser specific code will not be able to run on the server and therefore should be avoided or shimmed.

Components that located in the `/src/components` folder are mostly generic components that could be reused in several locations. However, some components rely on the client to communicate directly with the api server.

All communication with our api happens through the TranscriptionService that is located in the `/src/services` folder.

The `/src/views` folder contains the templates/logic for each route. The styling is scoped to each component, with the exception of some global classes that are located in the `./src/style.css`. All styling is in plain CSS, however there is a `custom-theme.scss` file for custom styling of some Material components that are used.

# Installation

Be aware that this is a monorepo and all applications can be run in conjunction from the root directory by running `npm i && npm run start`

- Requires node 14.16
- Run `npm install` to install all dependencies

# Development

- Run `npm run start:dev` to start a devserver without server-side rendering
- Run `npm run start:dev:ssr` to start a devserver with server-side rendering (slightly slower)

# How to run in a production environment

- Run `npm run build` to build the production files
- Run `npm run start` to run the production server

# Environment

By default, the app runs on port 4000. This can be configured with environment variables. See a list of all environment variables in the file: `.env.sample`

See also the environment file of angular: `./src/environments`. These files can be used to specify for example the api url.

# FAQ

## Why does the SSR server not run?

When running the SSR server is might give errors like: `ReferenceError: document is not defined`. There have been occasions where this was caused by importing stuff from openseadragon. Make sure to not import anything (even types) from Openseadragon on the server, or the running the ssr server will fail.

## How does this application handle state?

It mostly uses local component state. For both the inventory and scan page information about the inventory is shared. For this shared state we used [https://datorama.github.io/akita/](Akita state management). The implementation can be found in `/web/src/app/state`.
