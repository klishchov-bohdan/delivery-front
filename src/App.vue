<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/authorization">Authorization</router-link> |
      <router-link to="/products">Products</router-link> |
      <router-link to="/basket">Basket</router-link> |
    </div>
    <router-view />
  </div>
</template>

<script>
 export default {
   mounted() {
     this.$store.commit("suppliers/setSuppliers")
     this.$store.dispatch('suppliers/fetchSuppliers')
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
  background-color: #f6f5f7;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: white;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
