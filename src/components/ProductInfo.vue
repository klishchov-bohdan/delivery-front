<template>
<div class="productInfo">
  <div class="ctrl_btns">
    <img
        v-if="isNotExistsInBasket()"
        src="../assets/basket.png" alt="add_to_basket_btn" @click="addToBasket">
    <img v-else class="added_pin" src="../assets/added.png" alt="added_img">
    <img src="../assets/cancel.png" alt="cancel_btn" @click="$store.state.suppliers.productDetail = null">
  </div>
  <div class="info">
    <div class="product_img">
      <img :src="image" alt="product_image">
    </div>
    <div class="description">
      <h4 class="details_name"><span class="field_tag">Name: </span>{{ name }}</h4>
      <p class="details_id"><span class="field_tag">ID: </span>{{ id }}</p>
      <p class="details_desc"><span class="field_tag">Description: </span>{{ description }}</p>
      <p class="details_price"><span class="field_tag">Price: </span>{{ price }}$</p>
      <p class="details_weight"><span class="field_tag">Weight: </span>{{ weight }} g</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ProductInfo",
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  methods: {
    isNotExistsInBasket() {
      let basket = JSON.parse(localStorage.getItem('basket'))
      return !(basket !== null && basket.includes(this.id));
    },
    addToBasket() {
      let basketBtn = document.getElementById(this.id + 'basket')
      let addedImg = document.getElementById(this.id + 'added')
      let basketFromLS = localStorage.getItem('basket')
      if (basketFromLS !== null) {
        let basket = JSON.parse(basketFromLS)
        basket.push(this.id)
        localStorage.setItem('basket', JSON.stringify(basket))
        basketBtn.style.display = "none"
        addedImg.style.display = "block"
      } else {
        let basket = []
        basket.push(this.id)
        console.log(basket)
        localStorage.setItem('basket', JSON.stringify(basket))
        basketBtn.style.display = "none"
        addedImg.style.display = "block"
      }
    },
  },
}
</script>

<style scoped>
.productInfo {

}

.ctrl_btns img {
  margin-right: 10px;
  padding: 5px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
}

.ctrl_btns .added_pin:hover {
  background: none;
  cursor: default;
}

.ctrl_btns img:hover {
  background-color: #FF416C;
  cursor: pointer;
}

.productInfo .ctrl_btns {
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  height: 50px;
}

.productInfo .info {
  display: flex;
}

.info .product_img {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: max-content;
  height: max-content;
}

.product_img img {
  flex-shrink: 0;
  object-fit: cover;
  min-height: 100%;
  min-width: 100%;
  height: 300px;
  width: 400px;
}

@media only screen and (max-width: 800px) {
  .info .product_img {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 50%;
  }

  .product_img img {
    height: 200px;
  }

  .productInfo .info {
    display: flex;
    flex-direction: column;
  }
}

.details_name {
  font-size: 18pt;
  margin-top: 10px;
  margin-bottom: 30px;
}

.details_price {
  font-size: 16pt;
}

.details_desc {
  font-size: 14pt;
}

.details_weight {
  font-size: 14pt;
}
.details_weight,
.details_price,
.details_desc,
.details_id {
  margin-bottom: 10px;
}

.field_tag {
  align-self: flex-start;
  margin-right: 3px;
  padding: .25em .75em;
  border-radius: 1em;
  font-size: 10pt;
  background: linear-gradient(to bottom, #FF416C, hotpink);
  color: #fafafa;
}

.description {
  width: 100%;
}

</style>