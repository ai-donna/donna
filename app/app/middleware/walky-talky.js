import fetchy from './fetchy'
import boozer from './boozer'
import poke from './poke'

const fetchyInstance = new fetchy()
fetchyInstance.setBaseUrl('http://localhost:9000')

boozer.subscribe('search', () => {
  const question = poke.get('question')
  if (question === null) return
  fetchyInstance.post('nlp/ask', {question})
    .then(response => {
      boozer.publish('searchResult', response.result.fulfillment.speech)
    })
})

boozer.subscribe('searchText', (text) => {
  poke.set('question', text)
})

const walkyTalky = {}

export default walkyTalky
