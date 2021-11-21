import { ApolloServer, PubSub } from "apollo-server";
const pubsub = new PubSub();

export const startServer = ({ typeDefs, resolvers }) => {
  const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub } });
  server.listen().then(({ url }) => console.log(`Server Started at ${url}`));
};
