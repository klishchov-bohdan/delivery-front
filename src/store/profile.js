const state = {
    url: 'http://localhost:8080/profile',
    profile: {},
    error: {},
    isLoaded: false,
}

const mutations = {
    setProfile(state, profile) {
        state.profile = profile
    },
    setError(state, error) {
        state.error = error
    },
    setIsLoaded(state, isLoaded) {
        state.isLoaded = isLoaded
    },
}

const actions = {
    fetchProfile(context) {
        let tokens = JSON.parse(localStorage.getItem("tokens"))
        if (tokens) {
            fetch("http://localhost:8080/profile", {
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + tokens["access_token"]
                }
            }).then(res => {
                if (res.ok) {
                    return res.json()
                }
            }).then(user => {
                context.commit('setProfile', user)
            }).catch(err => {
                context.commit('setError', err.toString())
            }).finally(() => {
                context.commit('setIsLoaded', true)
            })
        }
    }
}

const getters = {
    getSupplierURL: (state) => {
        return state.url
    },
    getProfile: (state) => {
        return state.profile
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