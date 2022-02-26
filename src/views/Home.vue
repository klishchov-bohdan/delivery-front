<template>
  <div class="home">
    <product></product>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from "@/components/ProductCard";

export default {
  name: "Home",
  components: {
    product: Product,
  },
};
</script>
