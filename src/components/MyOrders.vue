<template>
  <div class="my_orders">
    <div class="orders" v-for="order of orders" :key="order">
      <orderInfo
        :id="order.ID"
        :address="order.ShippingAddress"
        :phone="order.ClientPhone"
        :products="order.OrderedProducts"
        :total="order.TotalPrice"
        :createdAt="order.CreatedAt"
      ></orderInfo>
    </div>
  </div>
</template>

<script>
import OrderInfo from "@/components/OrderInfo";

export default {
  name: "MyOrders",
  components: {
    orderInfo: OrderInfo,
  },
  data() {
    return {
      orders: []
    }
  },
  created() {
    fetch(`http://localhost:8080/orders/byUser/${(this.$store.state.profile.profile.ID)}`).then((res) => {
      if (res.ok) {
        return res.json()
      }
    }).then((orders) => {
      console.log(orders)
      this.orders = orders
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.my_orders {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
}

</style>