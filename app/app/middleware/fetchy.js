class fetchy {

  constructor() {
    if (window.fetch === undefined) {
      throw new Error('your shit browser does not support fetch yet; go away')
    }
    if (window.btoa === undefined) {
      throw new Error('your shit browser does not support btoa yet; go away')
    }
    this.baseUrl = ''
    this.basicAuth = null
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl
  }

  setBasicAuth(username, password) {
    this.basicAuth = {
      username,
      password
    }
  }

  get(route) {
    return new Promise((resolve, reject) => {
      const o = {
        method: 'GET',
      }
      if (this.basicAuth !== null) {
        o.headers = {
          'Authorization': 'Basic ' + window.btoa(`${this.basicAuth.username}:${this.basicAuth.password}`)
        }
      }
      window.fetch(`${this.baseUrl}/${route}`, o)
        .then(  
          function (response) {  
            if (response.status !== 200) {  
              return reject(`looks like there was a problem; status code: ${response.status}`)  
            } else {
              response.json().then(resolve)
            }
          }  
        )
        .catch(reject)
    })
  }

}

export default fetchy
