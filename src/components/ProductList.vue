<template>
  <div class="product_list">
    <productCard v-for="product of $store.state.suppliers.products" :key="product"
        :id="product.id"
        :name="product.name"
        :image="product.image"
        :description="product.description"
        :type="product.type"
        :price="product.price"
        :weight="product.weight"
    ></productCard>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard";

export default {
  name: "ProductList",
  components: {
    productCard: ProductCard
  },
  data() {
    return {

    }
  },
  mounted() {
    this.$store.commit("suppliers/setSuppliers")
    this.$store.dispatch('suppliers/fetchSuppliers')
  }
}
</script>

<style scoped>
  .product_list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    width: 1300px;
    justify-content: space-around;
  }
</style>