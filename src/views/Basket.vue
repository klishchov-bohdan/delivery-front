<template>
  <div class="basket_container">
    <basket></basket>
  </div>
</template>

<script>
import Basket from "@/components/Basket";
export default {
  name: "Basket",
  components: {
    basket: Basket,
  }
}
</script>

<style scoped>
.basket_container {
  display: flex;
  justify-content: center;
}
</style>