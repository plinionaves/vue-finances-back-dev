const env = process.env
const isProduction = env.NODE_ENV === 'production'
const endpoint = `${env.PRISMA_ENDPOINT}/${env.PRISMA_SERVICE}/${env.PRISMA_STAGE}`
const url = env.CLIENT_URL || ['localhost:8000', '127.0.0.1:8000'].join('|')
const protocols = isProduction ? 'wss|https' : 'ws|http'
const origin = new RegExp(`(${protocols}):\/\/${url}(.+)?`)
const secret = env.PRISMA_MANAGEMENT_API_SECRET
const playground = isProduction ? false : '/'

module.exports = {
  endpoint,
  env,
  isProduction,
  origin,
  playground,
  secret
}