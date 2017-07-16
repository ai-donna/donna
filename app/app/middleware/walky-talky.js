import fetchy from './fetchy'
import _ from 'lodash'
import boozer from './boozer'
import poke from './poke'
import { processNlpResponse } from './process-nlp-response'

const fetchyInstance = new fetchy()
fetchyInstance.setBaseUrl('http://localhost:9000')

boozer.subscribe('search', () => {
  const question = poke.get('question')
  if (question === null) return
  // ...
  fetchyInstance.post('nlp/ask', {question})
    .then(response => {
      boozer.publish('searchResult', processNlpResponse(response))
    })
})

boozer.subscribe('searchText', (text) => {
  poke.set('question', text)
})

const walkyTalky = {}

export default walkyTalky
