import https from 'https'

export async function fetchRequest<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (resp) => {
        let data = ''

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk
        })

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          try {
            const result = JSON.parse(data)
            resolve(result)
          } catch (e: unknown) {
            reject(e)
          }
        })
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}
