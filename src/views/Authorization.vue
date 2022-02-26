<template>
  <div class="auth-container" id="auth-container">
    <authorization></authorization>
  </div>
</template>

<script>
import Authorization from "@/components/Authorization.vue";
export default {
  name: "Authorization",
  components: {
    authorization: Authorization,
  },
  data() {
    return {
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.auth-container {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}
</style>