const state = {
    url: 'http://localhost:8080/suppliers',
    suppliers: [],
    types: [],
    products: [],
    productDetail: null,
    basket: [],
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

    setTypes(state, types) {
        state.types = types
    },

    setProductDetail(state, productId) {
        state.productDetail = null
        for (let supplier of state.suppliers) {
            for (let product of supplier["menu"]) {
                if (productId === product.id) {
                    state.productDetail = product
                    break
                }
            }
        }
    },

    setBasket(state) {
        state.basket = []
        let basket = []
        let basketLS = JSON.parse(localStorage.getItem("basket"))
        for (let supplier of state.suppliers) {
            for (let product of supplier["menu"]) {
                for (let item of basketLS) {
                    if (item.id === product.id) {
                        basket.push({
                            item: product,
                            quantity: item.quantity
                        })
                    }
                }
            }
        }
        state.basket = basket
    },

    pushProductsByCategory(state, category) {
        let products = []
        for (let supplier of state.suppliers) {
            products.push(...supplier['menu'])
        }
        if(state.products.length === products.length) {
            state.products = []
        }
        let filtered = products.filter((value) => {
            return value.type === category
        })
        for (let product of filtered) {
            if (!state.products.includes(product)) {
                state.products.push(product)
            }
        }
    },

    deleteProductsByCategory(state, category) {
        let products = []
        for (let supplier of state.suppliers) {
            products.push(...supplier['menu'])
        }
        let filtered = products.filter((value) => {
            return value.type === category
        })
        state.products = state.products.filter((value) => {
            return !filtered.includes(value)
        })
        if (state.products.length === 0) {
            for (let supplier of state.suppliers) {
                state.products.push(...supplier['menu'])
            }
        }
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
        if (state.products.length === 0) {
            for (let supplier of state.suppliers) {
                state.products.push(...supplier['menu'])
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