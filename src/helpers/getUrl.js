export default async function () {
  const serverUrl = process.env.SERVER_URL || 'http://localhost:8080'
  return {
    props: {
      serverUrl
    }
  }
}
