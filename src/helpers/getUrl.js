export default async function () {
  return process.env.SERVER_URL || 'http://localhost:8080'
}
