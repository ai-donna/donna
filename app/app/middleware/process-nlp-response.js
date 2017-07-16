import _ from 'lodash'

export const processNlpResponse = (response) => {
  if (_.get(response, 'searchResults.length') > 0) {
    return `${response.result.fulfillment.speech}
      ${_.join(_.map(response.searchResults, 'title'), ', ')}`
  } else {
    return 'Nothing has been found'
  }
}
