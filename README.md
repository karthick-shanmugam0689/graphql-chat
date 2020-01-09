# graphqlchat
A simple chat app with react js, prisma and apollo-graphql

Here we try to build a simple chat app with Prisma serving as Server layer with typesafe database access and React with Apollo Graphql Client serving as Frontend layer

## graphql-chat-be

graphql-chat-be has Prisma installed where we use the cabaility of Prisma Server and Database (MongoDB) setup through Docker.
We use Prisma here to establish a typesafe database access and also to create tables in a relational fashion. That's it. Our job is simple. Use prisma and sit back and relax. Our server is now setup with Graphql support. 

Follow the below steps to setup a server via Prisma

1. Run the following command to install prisma and it's dependancies
```npm install -g prisma```

2. Install docker

3. To start prisma and connected database, run the following command
```docker-compose up -d```

4. To configure your prisma API, run the following command
```prisma init --endpoint http://localhost:4466```

5. Now deploy the prisma API, run the following command
```prisma init --endpoint http://localhost:4466```

Now you can view the data stored in database through http://localhost:4466/_admin
You can also view how your graphql queries work through graphql client exposed in http://localhost:4466

Now your prisma server is ready to be connected via a client

## graphql-chat-fe

graphql-chat-fe is a simple React app created through Create-React-App typescript version with support from Apollo-Graphql client for connecting to the graphql APIs exposed by Prisma from graphql-chat-be. We also use styled components to style our react components in a very simple way. We also subscribe to graphql subscriptions exposed by Prisma via Websocket

Follow the below steps to install the dependancies and start the webpack server to see the chat-app running

1. Run the following command to install the dependancies
```npm install```

2. Run the following command to start the webpack server to see the chat-app running
```npm run start```

That's it. Your frontend is now able to consume the graphql apis exposed by Prisma and also able to subscribe for real time updates happening in the database




