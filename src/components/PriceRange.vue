<template>
  <div class="price_range">
    <h4>Price range</h4>
    <div class="price_container">
      <div class="field">
        <input type="number" id="input-min" :value="$store.state.suppliers.minPrice" @change="changeMin">
      </div>
      <div class="separator">-</div>
      <div class="field">
        <input type="number" id="input-max" :value="$store.state.suppliers.maxPrice" @change="changeMax">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PriceRange",
  methods: {
    changeMin() {
      let min = document.getElementById("input-min").value
      this.$store.commit('suppliers/setMinPrice', min)
      this.$store.commit('suppliers/setProductsInPriceRange')
    },
    changeMax() {
      let max = document.getElementById("input-max").value
      this.$store.commit('suppliers/setMaxPrice', max)
      this.$store.commit('suppliers/setProductsInPriceRange')
    },
  }
}
</script>

<style scoped>
.price_range {
  background-color: white;
}

.price_range h4 {
  font-size: 18pt;
}

.price_container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.price_container input {
  border-radius: 5px;
  padding: 5px;
  font-size: 16pt;
  width: 80px;
}

.separator {
  font-size: 23pt;
  padding: 0 30px;

}

</style>