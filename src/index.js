const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    user(parent, args, context, info) {
      return prisma.user({ id: args.id })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: `${__dirname}/schema.graphql`,
  resolvers
})

server.start().then(() => console.log('Server running on http://localhost:4000...'))