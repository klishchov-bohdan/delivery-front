<template>
  <div class="container">
    <div class="wrapper">
      <sorting></sorting>
      <productList></productList>
    </div>
    <div v-if="$store.state.suppliers.productDetail !== null" class="info">
      <div class="product_detail">
        <productInfo
            :id="$store.state.suppliers.productDetail.id"
            :description="$store.state.suppliers.productDetail.description"
            :image="$store.state.suppliers.productDetail.image"
            :name="$store.state.suppliers.productDetail.name"
            :price="$store.state.suppliers.productDetail.price"
            :type="$store.state.suppliers.productDetail.type"
            :weight="$store.state.suppliers.productDetail.weight"
        ></productInfo>
      </div>
    </div>
  </div>
</template>

<script>
import Sorting from "@/components/Sorting";
import ProductList from "@/components/ProductList";
import ProductInfo from "@/components/ProductInfo";

export default {
  name: "ProductList",
  components: {
    sorting: Sorting,
    productList: ProductList,
    productInfo: ProductInfo,
  },
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");
.container {
  font-family: "Quicksand", sans-serif;
  display: flex;
  justify-content: center;
}

.container .info {
  position: absolute;
  display: flex;
  justify-content: center;
  top: 20%;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.info .product_detail {
  border-radius: 5px;
  border: solid 2px black;
  width: 60%;
  height: max-content;
  background-color: #eeeeee;
  position: fixed;
  z-index: 3;
}

@media only screen and (max-width: 1000px) {
  .info .product_detail {
    width: 80%;
  }
}

.wrapper {
  position: absolute;
  width: 90%;
  min-height: 100%;
  display: flex;
  justify-content: space-around;
}

@media only screen and (max-width: 1215px) {
  .wrapper {
    flex-wrap: wrap;
  }
}

</style>