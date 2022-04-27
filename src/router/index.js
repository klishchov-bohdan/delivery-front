import Vue from "vue";
import VueRouter from "vue-router";
import Authorization from "@/views/Authorization";
import ProductList from "@/views/ProductList";
import Basket from "@/views/Basket";
import OrderConfirmation from "@/views/OrderConfirmation";
import MyOrders from "@/views/MyOrders";
import Home from "@/views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/authorization",
    name: "Authorization",
    component: Authorization
  },
  {
    path: "/products",
    name: "Products",
    component: ProductList
  },
  {
    path: "/basket",
    name: "Basket",
    component: Basket
  },
  {
    path: "/order",
    name: "OrderConfirmation",
    component: OrderConfirmation
  },
  {
    path: "/my_orders",
    name: "MyOrders",
    component: MyOrders
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
