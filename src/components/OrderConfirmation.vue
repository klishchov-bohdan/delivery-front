<template>
  <div v-if="basketNotEmpty()" class="order_confirmation">
    <div class="ordered_products">
      <h3 v-for="product of $store.state.suppliers.basket" :key="product">
        {{ product.item.name }} - ${{ product.item.price }} (x{{ product.quantity }})
      </h3>
      <h2>total: ${{ totalPrice() }}</h2>
    </div>
    <div class="shipping_address">
      <input type="street"
             class="form-control"
             id="inputStreet"
             placeholder="Street" required>

      <input type="city"
             class="form-control"
             id="inputCity"
             placeholder="City" required>

      <input type="state"
             class="form-control"
             id="inputState"
             placeholder="State" required>

      <input type="zip"
             class="form-control"
             id="inputZip"
             placeholder="Zip" required>

      <input type="county"
             class="form-control"
             id="inputCounty"
             placeholder="County" required>

      <input type="country"
             class="form-control"
             id="inputCountry"
             placeholder="Country" required>
      <input type="phone"
             class="form-control"
             id="inputPhone"
             placeholder="Phone number" required>
      <div class="button" @click="confirmOrder">Confirm</div>
    </div>
  </div>
  <div v-else class="empty_basket">
    <h3>basket is empty</h3>
  </div>
</template>

<script>

export default {
  name: "OrderConfirmation",
  methods: {
    basketNotEmpty() {
      let basket = JSON.parse(localStorage.getItem("basket"))
      if (basket !== null && (basket.length > 0)) {
        return true
      }
      return false
    },
    totalPrice() {
      let total = 0
      for (let product of this.$store.state.suppliers.basket) {
        total += product.item.price * product.quantity
      }
      return total
    },
    confirmOrder() {
      let inputPhone = document.getElementById('inputPhone').value;
      let phoneRegex = /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im
      if (!phoneRegex.test(inputPhone)) {
        alert(`
              Phone number should be looks like:
              (123) 456-7890,
              (123)456-7890,
              123-456-7890,
              123.456.7890,
              1234567890,
              +31636363634 or
              075-63546725`)
        return;
      }
      let products = []
      for (let product of this.$store.state.suppliers.basket) {
        products.push({
          productID: product.item.id,
          productQuantity: product.quantity,
          totalPrice: product.item.price * product.quantity,
        })
      }
      let inputStreet = document.getElementById("inputStreet").value
      let inputCity = document.getElementById("inputCity").value
      let inputState = document.getElementById("inputState").value
      let inputZip = document.getElementById("inputZip").value
      if  (!(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(inputZip))) {
        alert("invalid zip code")
        return;
      }
      let inputCounty = document.getElementById("inputCounty").value
      let inputCountry = document.getElementById("inputCountry").value
      let address = {
        city: inputCity,
        country: inputCountry,
        county: inputCounty,
        state: inputState,
        street: inputStreet,
        zipcode: inputZip,
      }
      let userId = ""
      if (this.$store.state.profile.profile === null || this.$store.state.profile.profile === undefined) {
        userId = "00000000-0000-0000-0000-000000000000"
      } else {
        userId = this.$store.state.profile.profile.ID
      }

      let order = {
        clientPhone: inputPhone,
        products: products,
        shippingAddress: address,
        totalPrice: this.totalPrice(),
        userID: userId
      }

      fetch("http://localhost:8080/orders", {
        method: "POST",
        body: JSON.stringify(order)
      }).then(res => {
        if (res.ok) {
          alert("Success")
          window.location.replace("http://localhost:8081/order")
          return
        }
        alert("Fail")
      }).catch((error) => {
        console.log(error)
      });
    },
  },
  mounted() {
    this.$store.commit("suppliers/setBasket")
  },
}
</script>

<style scoped>
.order_confirmation {
  background-color: #f6f5f7;
  max-width: 600px;
  display: flex;
  padding: 30px;
  border: 1px solid black;
}

.ordered_products {
  padding: 30px;
  min-width: max-content;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h2 {
  margin-top: 15px;
}

input {
  height: 20px;
  margin: 10px;
}

.button {
  background-color: #42b983;
  margin: 15px;
  padding: 15px;
  cursor: pointer;
}

.button:hover {
  background-color: #32986b;
}

</style>