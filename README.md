![Logo](logo.png)


Use questionnaires and checklists to make it easy to do the right thing, regarding the software you build.

Want to see Listo in action? Checkout the demo here: [https://listo-demo.herokuapp.com/](https://listo-demo.herokuapp.com/)!

## About

Checklists are at the heart of Listo, empowering engineering teams to perform a web-based self-assessment, which results in a Trello board containing the essential security, reliability and architecture requirements from our RFCs, tailored to a project's objectives. 

A more detailed blog post can be found [on SEEK's Tech Blog](https://medium.com/seek-blog/listo-failing-safely-with-checklists-and-rfc-s-d14b6fa34b2f).

## Getting Listo Running Locally

The quickest way to get Listo running locally is to launch it via Docker Compose.

1. Install Docker and Docker Compose (Mac users can install both [here](https://docs.docker.com/docker-for-mac/install/)).
2. Create an [env.sh](examples/TEMPLATE_env.sh) file in the root directory:

  ```bash
  # Get your API Key here -> https://trello.com/app-key/
  export TRELLO_API_KEY=e94947...00a92

  # Click on the "Generate a Token" link here -> https://trello.com/app-key/.
  export TRELLO_TOKEN=fda876d8af87d6fa876adfa....8516dcf715
  ```

3. Start the Listo service (server and UI) and local DynamoDB database:

  ```bash
  $ make serve
  ```
4. [OPTIONAL] Once you have Listo running locally you can now customise the checklists and questions for your own requirements [here](data/).


## Setting up Listo for Development

If you want to modify or debug Listo's code, it's often easier without using Docker or Docker Compose. 

### Requirements

Listo requires [Yarn](https://yarnpkg.com/) and [Docker](https://www.docker.com/) (only for the local Dynamo db).

> Note you will still need to have the `env.sh` configured as per [Getting Listo Running Locally](#getting-listo-running-locally).

### Server
In the `server` directory:

1. Start the DynamoDB local Docker instance:

  ```bash
  $ make start_db
  ```

2. Start the server by running:

  ```bash
  $ make serve
  ```

> See the [Makefile](./server/Makefile) for more options.

### UI

In the `frontend` directory:

1. Run the following to launch the UI:

```bash
$ make serve
```

> See the [Makefile](./frontend/Makefile) for more options.

2. The browser should auto open, if not you can navigate to:

  [http://localhost:3000/](http://localhost:3000/)


## Deploying Listo into Production

Deploying Listo for production use requires an AWS account with access to a DynamoDB Table. However, we plan to support other DB's in the future to remove the AWS requirement.

We have a separate build repo internally that picks up this repo and deploys Listo internally with a separate set of custom questions and checklists. We add authentication (using an internal service) and use AWS Secret's Manager for storing credentials). An example of our build process can be found [here](examples/deploy).

## References

+ Sample questions and checklists can be found in the [data directory](data/).
+ Listo was influenced by [goSDL](https://github.com/slackhq/goSDL).
+ 

## License

MIT.
