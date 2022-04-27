<template>
  <div class="product_card">
    <div class="product_price">
      <h3>${{ price }}</h3>
    </div>
    <span class="tag tag-blue">{{ type }}</span>
    <img :src="image" alt="product_image" class="product_image" width="300px">
    <div class="details">
      <div class="description" @click="setDetail">
        <h4 class="details_name"><span class="field_tag">Name: </span>{{ name }}</h4>
        <p class="details_desc"><span class="field_tag">Description: </span>{{ description }}</p>
        <p class="details_price"><span class="field_tag">Price: </span>{{ price }}$</p>
        <p class="details_weight"><span class="field_tag">Weight: </span>{{ weight }} g</p>
      </div>
      <img src="../assets/basket.png" alt="basket_image" class="basket_image" :id="id + 'basket'" @click="addToBasket">
      <img src="../assets/added.png" alt="added_to_basket_image" class="added_image" :id="id + 'added'">
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
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
    addToBasket() {
      let basketBtn = document.getElementById(this.id + 'basket')
      let addedImg = document.getElementById(this.id + 'added')
      let basketFromLS = localStorage.getItem('basket')
      if (basketFromLS !== null) {
        let basket = JSON.parse(basketFromLS)
        basket.push({
          id: this.id,
          quantity: 1
        })
        localStorage.setItem('basket', JSON.stringify(basket))
        basketBtn.style.display = "none"
        addedImg.style.display = "block"
      } else {
        let basket = []
        basket.push({
          id: this.id,
          quantity: 1
        })
        localStorage.setItem('basket', JSON.stringify(basket))
        basketBtn.style.display = "none"
        addedImg.style.display = "block"
      }
    },
    setDetail() {
      this.$store.commit("suppliers/setProductDetail", this.id)
    }
  },
  mounted() {
    let basket = JSON.parse(localStorage.getItem('basket'))
    let addedImg = document.getElementById(this.id + 'added')
    let basketBtn = document.getElementById(this.id + 'basket')
    for (let item of basket) {
      if (item.id === this.id) {
        basketBtn.remove()
        addedImg.style.display = "block"
      }
    }
  }
}
</script>

<style scoped>
.product_card {
  border: 1px solid black;
  border-radius: 13px;
  flex-basis: 340px;
  height: 300px;
  overflow: hidden;
  margin: 22px 0;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  box-shadow: 8px 8px 10px gray;
  background: #f6f5f7;
  transition: all .2s ease-in-out;
}

.product_card:hover {
  cursor: pointer;
}

.details {
  display: flex;
  position: absolute;
  width: 90%;
  height: 95%;
  color: black;
  font-weight: bold;
  opacity: 0;
  margin: auto;
  text-align: left;
}

.product_card:hover .details {
  opacity: 1;
}

.product_card:hover {
  transform: scale(1.2);
  z-index: 1;
}

.product_card:hover .product_image {
  opacity: 0.3;
}

.product_card:hover .product_price,
.product_card:hover .tag
{
  opacity: 0;
}

.details .basket_image {
  z-index: 3;
  border-radius: 20px;
  padding: 10px;
  max-width: 70px;
  max-height: 70px;
  position: absolute;
  bottom: 5px;
  right: 0;
  transition: all .2s ease-in-out;
}

.details .added_image {
  border-radius: 20px;
  padding: 10px;
  max-width: 70px;
  max-height: 70px;
  position: absolute;
  bottom: 5px;
  right: 0;
  transition: all .2s ease-in-out;
  display: none
}

.details .basket_image:hover {
  background: #FF416C;
  cursor: pointer;
  transform: scale(1.1);
}

.product_card .product_image {
  flex-shrink: 0;
  object-fit: cover;
  min-width: 100%;
  min-height: 100%
}

.product_price h3 {
  margin: 7px;
}

.product_price {
  top: 16px;
  left: 16px;
  position: absolute;
  background: red;
  border-radius: 50%;
}

.details_name {
  font-size: 15pt;
  margin-bottom: 30px;
}

.details_price {
  font-size: 17pt;
}

.details_desc {
  font-size: 12pt;
}

.details_weight {
  font-size: 14pt;
}
.details_weight,
.details_price,
.details_desc {
  margin-bottom: 10px;
}

.tag {
  top: 16px;
  right: 16px;
  align-self: flex-start;
  position: absolute;
  padding: .25em .75em;
  border-radius: 1em;
  font-size: 14pt;
  background: #56CCF2;
  background: linear-gradient(to bottom, #2F80ED, #56CCF2);
  color: #fafafa;
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

</style>