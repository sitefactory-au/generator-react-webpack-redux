import { NAME } from './constants';
import { createSelector } from 'reselect';
import _flowRight from 'lodash/flowRight';

/**** EXAMPLES
const shopItemsSelector = state => state.shop.items
const taxPercentSelector = state => state.shop.taxPercent

const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
)

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
)
*****/
// Get the state for the module
const root = state => state[NAME];

export const name = _flowRight(state => state.name, root);