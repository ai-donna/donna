import _ from 'lodash'

const generateUrl = (object) => {
  return `<a href="${object.url}">${object.title}</a>`
}

const resourceSearch = (response) => {
  if (_.get(response, 'searchResults.length') > 0) {
    return _.concat(response.result.fulfillment.speech, _.map(response.searchResults, generateUrl))
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
      return [response.result.fulfillment.speech]
  }
}
