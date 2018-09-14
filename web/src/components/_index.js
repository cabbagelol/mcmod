import mcContent from './_content.vue'
import mchead from './_head.vue'

export default {
  install (Vue, options) {
    Vue.component('mc-content', mcContent)
    Vue.component('mc-head', mchead)
  }
}
