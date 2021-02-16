import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import notFoundPage from '@/pages/NoFoundPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'productPage', component: ProductPage, path: '/product/:id' },
  { name: 'cart', component: CartPage, path: '/cart/' },
  { name: 'notFoundPage', component: notFoundPage, path: '*' },
];

export default new VueRouter({
  routes,
});
