<template>
 <div class="sorting">
    <supplierList></supplierList>
   <productTypes></productTypes>
 </div>
</template>

<script>
import SupplierList from "@/components/SupplierList";
import ProductTypes from "@/components/ProductTypes";
export default {
  name: "Sorting",
  components: {
    supplierList: SupplierList,
    productTypes: ProductTypes,
  },
}
</script>

<style scoped>
.sorting {
  margin-top: 20px;
  min-width: 400px;
  border: 1px solid black;
  height: max-content;
}

</style>