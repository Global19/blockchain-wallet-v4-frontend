import Type from './Type'
import * as Cache from './Cache'
import * as AddressLabelMap from './AddressLabelMap'
import { assoc, compose, over, is } from 'ramda'
import { view } from 'ramda-lens'
export class Derivation extends Type {}

export const xpriv = Derivation.define('xpriv')
export const xpub = Derivation.define('xpub')
export const addressLabels = Derivation.define('address_labels')
export const cache = Derivation.define('cache')
export const type = Derivation.define('type')
export const purpose = Derivation.define('purpose')
export const selectCache = view(cache)
export const selectXpriv = view(xpriv)
export const selectXpub = view(xpub)
export const selectAddressLabels = view(addressLabels)
export const selectType = view(type)
export const selectPurpose = view(purpose)

export const createNew = ({ xpriv, xpub, address_labels, cache }) =>
  new Derivation({
    type: 'legacy',
    purpose: 44,
    xpriv,
    xpub,
    address_labels,
    cache: Cache.fromJS(cache)
  })

export const fromJS = (derivation, i) => {
  if (is(Derivation, derivation)) {
    return derivation
  } else {
    const derivationCons = derivation => {
      return compose(
        over(addressLabels, AddressLabelMap.fromJS),
        over(cache, Cache.fromJS)
      )(derivation)
    }
    return derivationCons(new Derivation(assoc('index', i, derivation)))
  }
}