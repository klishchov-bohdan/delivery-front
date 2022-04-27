<template>
  <div class="orderConfirmation">
    <orderConfirmation></orderConfirmation>
  </div>
</template>

<script>
import OrderConfirmation from "@/components/OrderConfirmation";
export default {
  name: "OrderConfirmation",
  components: {
    orderConfirmation: OrderConfirmation
  }
}
</script>

<style scoped>
.orderConfirmation {
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