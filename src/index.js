const { GraphQLServer } = require('graphql-yoga')
const Binding = require('prisma-binding')
const { prisma } = require('./generated/prisma-client')

const binding = new Binding.Prisma({
  typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
  endpoint: process.env.PRISMA_ENDPOINT
})

const resolvers = {
  Query: {
    user(parent, args, context, info) {
      /*return prisma.user({ id: args.id })
        .then(user => {
          console.log('User: ', user)
          return user
        })*/
      return binding.query.user({ where: { id: args.id }}, info)
        .then(user => {
          console.log('User: ', user)
          return user
        })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: `${__dirname}/schema.graphql`,
  resolvers
})

server.start().then(() => console.log('Server running on http://localhost:4000...'))