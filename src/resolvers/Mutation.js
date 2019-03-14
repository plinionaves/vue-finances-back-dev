const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

async function signup (_, args, ctx, info) {

  const password = await bcrypt.hash(args.password, 10)
  const user = await ctx.db.mutation.createUser({ data: { ...args, password } })

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' })

  return {
    token,
    user
  }

}

module.exports = {
  signup
}