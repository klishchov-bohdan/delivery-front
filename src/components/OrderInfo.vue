<template>
  <div class="order_info">
    <h4>Order ID: {{ id }}</h4>
    <div class="created_at">
      Created At: {{ createdAt }}
    </div>
    <h4>Phone number: {{ phone }}</h4>
    <div class="detail">
      <div class="ordered_products">
        <h3 v-for="product of products" :key="product">
          {{ product.Product.Name }} - ${{ product.Product.Price }} (x{{ product.ProductQuantity }})
        </h3>
        <h2>Total price: ${{ total }}</h2>
      </div>
      <div class="separator">
      </div>
      <div class="address">
        <h3>Delivery address</h3>
        <h4>Country: {{ address.Country }}</h4>
        <h4>State: {{ address.State }}</h4>
        <h4>City: {{ address.City }}</h4>
        <h4>ZIPCode: {{ address.ZIPCode }}</h4>
        <h4>Street: {{ address.Street }}</h4>
        <h4>County: {{ address.County }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderInfo",
  props: {
    id: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.order_info {
  background-color: #FF416C;
  padding: 20px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
}

.separator {
  width: 20px;
}

.address {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border: 1px solid black;
  width: 250px;
  background-color: #f85578;
  overflow: auto;
}

.address h4 {
  padding: 0 20px;
}

.address h3 {
  width: 100%;
}

.ordered_products {
  border: 1px solid black;
  width: 250px;
  background-color: #f85578;
  overflow: auto;
}

.detail {
  margin-top: 20px;
  display: flex;
}

</style>