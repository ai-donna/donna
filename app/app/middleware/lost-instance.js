import rooter from './lost'
import shove from './poke'

const routes = {
  'popup': 'donna-route-popup',
  'newtab': 'donna-route-newtab',
  'not-found': 'donna-route-not-found'
}
const routerInstance = rooter(routes, (done, parameters) => {
  return false
  console.log('window', window);
  // if (needsToLogin === false || window.location.hash.indexOf("log-in") >= 0) {
  //   return false
  // } else {
  //   return 'log-in'
  // }
})

export default routerInstance
