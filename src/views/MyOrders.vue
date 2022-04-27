<template>
  <div class="my_orders_container">
    <myOrders></myOrders>
  </div>
</template>

<script>

import MyOrders from "@/components/MyOrders";

export default {
  name: "MyOrders",
  components: {
    myOrders: MyOrders,
  }
}
</script>

<style scoped>
.my_orders_container {
  background: #7f7fd5;
  background: linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
  position: absolute;
  min-height: 100%;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>