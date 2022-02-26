<template>
 <div class="sorting">
    <supplierList></supplierList>
    <priceRange></priceRange>
 </div>
</template>

<script>
import SupplierList from "@/components/SupplierList";
import PriceRange from "@/components/PriceRange";
export default {
  name: "Sorting",
  components: {
    supplierList: SupplierList,
    priceRange: PriceRange,
  },
}
</script>

<style scoped>
.sorting {
  min-width: 400px;
  background-color: #7f7fd5;
  height: max-content;
}

</style>