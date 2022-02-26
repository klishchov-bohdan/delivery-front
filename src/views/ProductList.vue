<template>
  <div class="container">
    <sorting></sorting>
    <productList></productList>
  </div>
</template>

<script>
import Sorting from "@/components/Sorting";
import ProductList from "@/components/ProductList";

export default {
  name: "ProductList",
  components: {
    sorting: Sorting,
    productList: ProductList,
  },
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");
.container {
  font-family: "Quicksand", sans-serif;
  background: #7f7fd5;
  background: linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
  display: flex;
  justify-content: space-around;
}

@media only screen and (max-width: 1215px) {
  .container {
    flex-wrap: wrap;
  }
}

</style>