const ueber = require('ueber')

// this code was inspired by
// https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/history/showHistory/typedUrls.js

const past = () => {

  return new Promise((resolve, reject) => {


    if (chrome.history === undefined) {
      console.warn('search history not available; you are using http-server probably!')
      return resolve([])
    }


    const stuff = []
    const finish = () => {
      const sortedStuff = ueber.sortByKey(stuff, 'count', true)
      return resolve(sortedStuff)
    }


    let requestsLeft = 0
    chrome.history.search({
      'text': 'twitter',
      'startTime': new Date().getTime() - (1000 * 60 * 60 * 24 * 30)
    }, historyItems => {
      for (let i = 0; i < historyItems.length; ++i) {
        chrome.history.getVisits({ url: historyItems[i].url }, visits => {
          ((url, visits) => {
            const stuffItem = stuff.find(item => item.url === url)
            if (stuffItem !== undefined) {
              stuffItem.count += visits.length
            } else {
              stuff.push({
                url,
                count: visits.length
              })
            }
            requestsLeft = requestsLeft - 1
            if (requestsLeft === 0) {
              return finish()
            }
          })(historyItems[i].url, visits)
        })
        requestsLeft = requestsLeft + 1
      }
      if (requestsLeft === 0) {
        return finish()
      }
    })


  })

}

export default past
