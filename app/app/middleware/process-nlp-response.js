import _ from 'lodash'

const generateUrl = (object) => {
  return {
    type: 'text',
    text: `<a href="${object.url}" target="_blank">${object.title}</a>`,
  }
}

const resourceSearch = (response) => {
  if (_.get(response, 'searchResults.length') > 0) {
    const videos = response.searchResults.filter(x => x.contextualData && x.contextualData.videoUri !== undefined)
    if (videos.length > 0) {
      return _.concat(
        {
          type: 'text',
          text: response.result.fulfillment.speech
        },
        videos.map(x => {
          return {
            type: 'video',
            video: {
              image: x.contextualData.image,
              url: x.contextualData.videoUri
            }
          }
        })
      )
      return messages
    }

    return _.concat({
      type: 'text',
      text: response.result.fulfillment.speech
    }, response.searchResults.map(generateUrl))
  } else {
    return ['Doesn\'t seem to exist']
  }
}

export const processNlpResponse = (response) => {
  switch (_.get(response, 'result.action')) {
    case 'resource.search':
    case 'resource.search.by.topic':
    case 'resource.only':
      return resourceSearch(response)
    default:
      return [
        {
          'type': 'text',
          'text': response.result.fulfillment.speech
        }
      ]
  }
}
