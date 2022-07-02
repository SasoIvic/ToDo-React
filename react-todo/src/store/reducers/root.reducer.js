const TOGGLE_VIEW = 'TOGGLE_VIEW'

const initialState = {
  viewAll: true,
}

const reducer = {
  [TOGGLE_VIEW]: state => ({ ...state, viewAll: !state.viewAll }),
}

export default (state = initialState, { type, payload }) =>
  reducer[type] ? reducer[type](state, payload) : state
