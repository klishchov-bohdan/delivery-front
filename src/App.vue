<template>
  <div id="app">
    <div v-if="$route.path !== '/authorization'" id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>
      <router-link v-if="isAuthorized" to="/my_orders">My Orders</router-link>
      <router-link to="/order">Order</router-link>
      <router-link v-if="!isAuthorized" to="/authorization">Authorization</router-link>
      <a v-else @click="logout">Logout</a>
      <router-link to="/basket"><img src="./assets/basket.png" alt="basket_img" style="" width="50px"></router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
 export default {
   data() {
     return {
       isAuthorized: false,
       profile: {},
     }
   },
   methods: {
     logout() {
       let tokens = JSON.parse(localStorage.getItem("tokens"))
       if (tokens) {
         fetch("http://localhost:8080/logout", {
           method: "POST",
           headers: {
             Authorization: 'Bearer ' + tokens["access_token"]
           }
         }).then(res => {
           if (res.ok) {
             this.isAuthorized = false
             this.profile = {}
             localStorage.removeItem("tokens")
           }
         }).catch(error => {
           console.log(error)
         })
       }
     }
   },
   created() {
     this.$store.commit("suppliers/setSuppliers")
     this.$store.dispatch('suppliers/fetchSuppliers')
     this.$store.commit("profile/setProfile")
     this.$store.dispatch('profile/fetchProfile')
     let tokens = JSON.parse(localStorage.getItem("tokens"))
     if (tokens) {
       fetch("http://localhost:8080/profile", {
         method: "GET",
         headers: {
           Authorization: 'Bearer ' + tokens["access_token"]
         }
       }).then(res => {
         if (res.ok) {
           this.isAuthorized = true
           return res.json()
         }
       }).then(user => {
         this.profile = user
       }).catch(error => {
         console.log(error)
       })
     }
   }
 }
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 30px;
  height: max-content;
  background-color: white;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#nav a {
  text-decoration: none;
  font-size: 18pt;
}

#nav a:hover {
  cursor: pointer;
}

#nav a:hover {
  color: #42b983;
}

</style>
