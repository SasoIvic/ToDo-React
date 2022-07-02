import { createSelector } from 'reselect'

export const rootSelector = createSelector(
  state => state.root.viewAll,
  viewAll => ({ viewAll }),
)
