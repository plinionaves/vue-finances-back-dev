const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

async function login (_, { email, password }, ctx, info) {

  const user = await ctx.db.query.user({ where: { email } })
  if (!user) {
    throw new Error('Invalid credentials!')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid credentials!')
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' })

  return {
    token,
    user
  }

}

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
  login,
  signup
}