<template>
  <div class="supplier_list">
    <h4>Suppliers</h4>
    <ul>
      <li v-for="supplier of $store.state.suppliers.suppliers" :key="supplier">
        <label :id="supplier.id + 'lbl'" :for="supplier.id" class="text">
          {{ supplier['name'] }}
          <p>{{ supplier['working_time']['open_in'].slice(11, 16) + '-' + supplier['working_time']['close_in'].slice(11, 16) }}</p>
        </label>
        <input type="checkbox" :id="supplier.id" :name="supplier.id" @change="checked(supplier.id)">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SupplierList",
  methods: {
    checked(supplier_id) {
      let labelEl =  document.getElementById(supplier_id + 'lbl')
      let inputEl = document.getElementById(supplier_id)
      if(inputEl.checked) {
        labelEl.style.background = "#12ec85"
        this.$store.commit("suppliers/pushProductsBySupplierId", supplier_id)
      } else {
        labelEl.style.background = "white"
        this.$store.commit("suppliers/deleteProductsBySupplierId", supplier_id)
      }
    }
  },
  mounted() {

  },
}
</script>

<style scoped>
.supplier_list {
  width: 100%;
  height: max-content;
  position: relative;
  background: white;
}

.supplier_list ul li:hover {
  z-index: 1;
  border-right: 5px solid black;
}

.supplier_list ul {
  list-style: none;
}

.supplier_list ul li {
  font-size: 20pt;
  margin-top: 15px;
}

.supplier_list ul label {
  transition: all .2s ease-in-out;
  display: block;
  width: 100%;
  cursor: pointer;
  height: 50px;
}

.supplier_list ul label p {
  font-size: 10pt;
}

.supplier_list ul input {
  display: none;
}

.supplier_list h4 {
  font-size: 18pt;
}

</style>