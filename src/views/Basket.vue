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