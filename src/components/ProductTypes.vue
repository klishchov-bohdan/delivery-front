<template>
  <div class="types">
    <h4>Select product type</h4>
    <ul>
      <li v-for="type of $store.state.suppliers.types" :key="type">
        <label :id="type + 'lbl'" :for="type" class="text">
          {{ type }}
        </label>
        <input type="checkbox" :id="type" :name="type" @change="checked(type)">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProductTypes",

  methods: {
    checked(type) {
      let labelEl =  document.getElementById(type + 'lbl')
      let inputEl = document.getElementById(type)
      if(inputEl.checked) {
        labelEl.style.background = "#12ec85"
        this.$store.commit("suppliers/pushProductsByCategory", type)
      } else {
        labelEl.style.background = "white"
        this.$store.commit("suppliers/deleteProductsByCategory", type)
      }
    }
  },

  mounted() {
    let types = []
    while(!this.$store.state.suppliers.isLoaded) {
      continue
    }
    for (let product of this.$store.state.suppliers.products) {
      if (!types.includes(product.type)) {
        types.push(product.type)
      }
    }
    this.$store.commit("suppliers/setTypes", types)
  }
}
</script>

<style scoped>
.types {
  margin-top: 40px;
  width: 100%;
  height: max-content;
  position: relative;
  background: white;
}

.types ul li:hover {
  z-index: 1;
  border-right: 5px solid black;
}

.types ul {
  list-style: none;
}

.types ul li {
  font-size: 20pt;
  margin-top: 15px;
}

.types ul label {
  transition: all .2s ease-in-out;
  display: block;
  width: 100%;
  cursor: pointer;
  height: 50px;
}

.types ul input {
  display: none;
}

.types h4 {
  font-size: 18pt;
}
</style>