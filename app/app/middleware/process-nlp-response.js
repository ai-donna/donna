import _ from 'lodash'

const generateUrl = (object) => {
  return {
    type: 'text',
    text: `<a href="${object.url}" target="_blank">${object.title}</a>`,
  }
}

const resourceSearch = (response) => {
  if (_.get(response, 'searchResults.length') > 0) {
    if (response.searchResults[0].contextualData.videoUri) {
      const messages = [
        {
          type: 'text',
          text: response.result.fulfillment.speech
        },
        {
          type: 'video',
          video: {
            image: response.searchResults[0].contextualData.image,
            url: response.searchResults[0].contextualData.videoUri
          }
        }
      ]
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
