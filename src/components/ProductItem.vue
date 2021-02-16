<style>
  .color-list label {
    --border-color: #666;
  }
</style>

<template>
    <li class="catalog__item">
              <router-link class="catalog__pic" :to="{name: 'productPage', params: {id: product.id}}">
                <img :src="product.image" :alt="product.title">
              </router-link>

              <h3 class="catalog__title">
                <a href="#">
                  {{product.title}}
                </a>
              </h3>

              <span class="catalog__price">
                {{product.price | formatNumber}} ₽
              </span>
              <ColorList
                :colors="product.colors"
                :colorId="id"
                class="color-list"
              />
            </li>
</template>

<script>
import formatNumber from '@/utils/formatNumber';
import ColorList from './ColorList.vue';
import gotoPage from '../utils/gotoPage';

export default {
  data() {
    return {
      color: '#73B6EA',
      id: 1,
    };
  },

  props: {
    product: Object,
  },

  filters: {
    formatNumber,
  },

  components: {
    ColorList,
  },

  methods: {
    gotoPage,
  },
};
</script>
