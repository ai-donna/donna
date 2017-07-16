import _ from 'lodash'

const resourceSearch = (response) => {
  if (_.get(response, 'searchResults.length') > 0) {
    return [response.result.fulfillment.speech,
      _.join(_.map(response.searchResults, 'title'), ', ')]
  } else {
    return ['Doesn\'t seem to exist']
  }
}

export const processNlpResponse = (response) => {
  switch (_.get(response, 'result.action')) {
    case 'resource.search':
      return resourceSearch(response)
    default:
      return [response.result.fulfillment.speech]
  }
}
