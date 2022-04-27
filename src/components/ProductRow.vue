<template>
  <div class="product_row">
    <img class="product_image" :src="image" alt="product_image">
    <h4 class="product_title">
      {{ title }}
    </h4>
    <div class="product_quantity">
      <div class="less" @click="productDec">
        <h4>-</h4>
      </div>
      <h4>{{ quantity }}</h4>
      <div class="more" @click="productInc">
        <h4>+</h4>
      </div>
    </div>
    <h4 class="product_price">
      ${{ price * quantity}}
    </h4>
    <img src="../assets/cancel.png" alt="remove" class="remove" @click="removeFromBasket">
  </div>
</template>

<script>
export default {
  name: "ProductRow",
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    }
  },
  methods: {
    removeFromBasket() {
      let basket = JSON.parse(localStorage.getItem("basket"))
      let filteredBasket = basket.filter(function(value){
        return value !== this.id
      });
      localStorage.setItem("basket", JSON.stringify(filteredBasket))
      this.$store.commit("suppliers/setBasket")
    },
    productInc() {
      let basket = JSON.parse(localStorage.getItem("basket"))
      for (let product of basket) {
        if (product.id === this.id) {
          product.quantity++
        }
      }
      localStorage.setItem("basket", JSON.stringify(basket))
      this.$store.commit("suppliers/setBasket")
    },
    productDec() {
      let basket = JSON.parse(localStorage.getItem("basket"))
      for (let product of basket) {
        if (product.id === this.id) {
          if (product.quantity > 1) {
            product.quantity--
          }
        }
      }
      localStorage.setItem("basket", JSON.stringify(basket))
      this.$store.commit("suppliers/setBasket")
    },
  },
}
</script>

<style scoped>
.product_row {
  display: flex;
  height: 50px;
  border: 2px solid black;
  margin-top: 10px;
  justify-content: space-between;
  align-items: center;
}

.product_quantity {
  display: flex;
  justify-content: space-between;
  min-width: 100px;
}

.more {
  background-color: #42b983;
}

.less {
  background-color: #FF416C;
}

.more:hover {
  background-color: #328d68;
  cursor: pointer;
}

.less:hover {
  background-color: #ad2844;
  cursor: pointer;
}

.more, .less {
  width: 27px;
  height: 27px;
  border-radius: 15px;
}

.product_row h4 {
  font-size: 16pt;
}

.product_row .product_image {
  flex-shrink: 0;
  object-fit: cover;
  height: 100%;
  width: 80px;
}

.remove {
  height: 50%;
  margin-right: 10px;
  border-radius: 5px;
  padding: 5px;
}
.remove:hover {
  background-color: #FF416C;
  cursor: pointer;
}
</style>