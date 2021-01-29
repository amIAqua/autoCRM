import { toJS, observable, action, makeObservable } from 'mobx'
import Fuse from 'fuse.js'
import { pricelistService } from '../store/services/PricelistService'
import { tableItemListType } from '../store/types/pricesService.types'

class FuseSearch {
  _searchQuery: string = ''
  searchResults: tableItemListType = null

  constructor() {
    makeObservable(this, {
      _searchQuery: observable,
      searchResults: observable,
      setSearchQuery: action,
      setSearchResults: action,
      fuseInitialization: action,
      searchToggler: action,
    })
  }

  // getters
  get searchQueryGetter() {
    return this._searchQuery
  }

  setSearchQuery = (query: string): void => {
    this._searchQuery = query
  }

  setSearchResults = (fuseResults: tableItemListType) => {
    this.searchResults = fuseResults
  }

  fuseInitialization = () =>
    new Fuse(toJS(pricelistService.priceslist), {
      keys: ['text'],
    })

  searchToggler = () => {
    const fuse = this.fuseInitialization()

    const fuseResults = fuse.search(this._searchQuery)

    const data = fuseResults.map((item: any, index: number) => {
      return {
        key: item!.item._id,
        order: index + 1,
        position: item!.item.text,
        price: item!.item.price,
      }
    })

    this.setSearchResults(data)
  }
}

export const fuse = new FuseSearch()
