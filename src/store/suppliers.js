const state = {
    url: 'http://localhost:8080/suppliers',
    suppliers: [],
    products: [],
    minPrice: 0,
    maxPrice: 0,
    error: '',
    isLoaded: false,
}

const mutations = {
    setSuppliers(state, suppliers) {
        state.suppliers = suppliers
    },
    setProducts(state, products) {
        state.products = products
    },
    setMinPrice(state, min) {
        state.minPrice = min
    },
    setMaxPrice(state, max) {
        state.maxPrice = max
    },
    setProductsInPriceRange(state) {
        state.products = []
        for (let supplier of state.suppliers) {
            state.products.push(...supplier['menu'])
        }
        let productsInRange = []
        for (let product of state.products) {
            if (product.price <= state.maxPrice && product.price >= state.minPrice) {
                productsInRange.push(product)
            }
        }
        state.products = productsInRange
    },
    pushProductsBySupplierId(state, supplierId) {
        let fullMenu = []
        for (let supplier of state.suppliers) {
            fullMenu.push(...supplier['menu'])
        }
        if(state.products.length === fullMenu.length) {
            state.products = []
        }
      for (let supplier of state.suppliers) {
          if (supplier.id === supplierId) {
              for (let product of supplier['menu']) {
                  if (!state.products.includes(product)) {
                      state.products.push(product)
                  }
              }
          }
      }
    },
    deleteProductsBySupplierId(state, supplierId) {
        for (let supplier of state.suppliers) {
            if (supplier.id === supplierId) {
                let menu = supplier['menu']
                state.products = state.products.filter((value) => {
                    return !menu.includes(value)
                })
                break
            }
        }
    },
    setError(state, error) {
        state.error = error
    },
    setIsLoaded(state, isLoaded) {
        state.isLoaded = isLoaded
    }
}

const actions = {
    fetchSuppliers(context) {
        fetch(context.getters.getSupplierURL).then((res) => res.json()).then((json) => {
            context.commit('setIsLoaded', false)
            let suppliers = []
            let products = []
            for (let supplier of json) {
                suppliers.push(supplier)
                for (let product of supplier["menu"]) {
                    products.push(product)
                }
            }
            let min = products[0].price
            let max = products[0].price
            for (let product of products) {
                if (product.price < min) {
                    min = product.price
                }
                if (product.price > max) {
                    max = product.price
                }
            }
            context.commit('setMinPrice', min)
            context.commit('setMaxPrice', max)
            context.commit('setSuppliers', suppliers)
            context.commit('setProducts', products)
        }).catch((err) => {
            context.commit('setError', err.toString())
        }).finally(() => {
            context.commit('setIsLoaded', true)
        })
    }
}

const getters = {
    getSupplierURL: (state) => {
        return state.url
    },
    getSuppliers: (state) => {
        return state.suppliers
    },
    getProducts: (state) => {
        return state.products
    },
    getIsLoaded: (state) => {
        return state.isLoaded
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}