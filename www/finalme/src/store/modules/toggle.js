const state = {
  categoryToggle: false,
  sourceToggle: false,
  userToggle: false
}
const mutations = {
  cateToggle (state, status) {
    state.categoryToggle = status
  },
  srcToggle (state, status) {
    state.sourceToggle = status
  },
  userToggle (state, status) {
    state.userToggle = status
  }
}
const actions = {

}
const getters = {
}
export default {
  state,
  mutations,
  actions,
  getters
}
