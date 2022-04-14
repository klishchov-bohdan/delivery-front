<template>
  <div class="basket">
    <div v-if="basketNotEmpty()" class="container">
      <div class="basket_products" v-for="product of $store.state.suppliers.basket" :key="product">
        <productRow
            :id="product.id"
            :title="product.name"
            :price="product.price"
            :image="product.image"
        ></productRow>
      </div>
      <div class="basket_ctr">
        <div class="clear_basket" @click="clearBasket">
          Clear basket
        </div>
        <div class="totalPrice">
          <h4>Total: {{ totalPrice() }}$</h4>
        </div>
        <a href="/" class="buy_all">
          Buy all
        </a>
      </div>
    </div>

    <div v-else class="empty_basket">
      <p>basket is empty</p>
    </div>
  </div>
</template>

<script>
import ProductRow from "@/components/ProductRow";

export default {
  name: "Basket",
  components: {
    productRow: ProductRow
  },
  methods: {
    totalPrice() {
      let total = 0
      for (let product of this.$store.state.suppliers.basket) {
        total += product.price
      }
      return total
    },
    clearBasket() {
      localStorage.removeItem("basket")
      this.$store.commit("suppliers/setBasket")
    },
    basketNotEmpty() {
      let basket = JSON.parse(localStorage.getItem("basket"))
      if (basket !== null && (basket.length > 0)) {
        return true
      }
      return false
    },
  },
  mounted() {
    this.$store.commit("suppliers/setBasket")
  },
}
</script>

<style scoped>
.basket {
  width: 70%;
  background-color: #42b983;
}

.basket_ctr {
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  display: flex;
}

.totalPrice h4 {
  font-size: 15pt;
}

.clear_basket {
  font-weight: bold;
  background-color: #FF416C;
  color: black;
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  border-radius: 5px;
}

.clear_basket:hover {
  cursor: pointer;
  background-color: #d5365a;
}

.buy_all {
  height: 30px;
  width: 100px;
  font-weight: bold;
  background-color: #FF416C;
  padding-top: 10px;
  text-decoration: none;
  color: black;
  border-radius: 5px;
}

.buy_all:hover {
  background-color: #cc385a;
}
</style>