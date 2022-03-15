# Transcripties Zoeken & Tonen

## Installation dev environment

Required nodejs 14 and docker on your machine

- Run Elastic in Docker: `docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.10.0`
- Configure elastic indices: `bash data/elastic/mapping.sh`
- Run `npm install` to install all dependencies.
- Run `npm start` to start the project

- The web app runs on http://localhost:4200
- The api runs on http://localhost:8080
- The ingest runs on http://localhost:5000

## Installation production environment

- Look at the README.MD of each subfolder (/api, /ingest and /web)
- You can run npm command from the root folder using the --prefix flag. For example run `npm run build --prefix api` to build the api files.
- The `/data` folder is for development/testing purposes only

## VSCode Plugins

- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
