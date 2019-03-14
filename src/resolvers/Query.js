function user (_, args, ctx, info) {
  return ctx.db.query.user({ where: { id: args.id }}, info)
}

module.exports = {
  user
}