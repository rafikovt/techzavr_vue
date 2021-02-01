<template>
    <li class="catalog__item">
              <a class="catalog__pic" href="#">
                <img :src="product.image" :alt="product.title">
              </a>

              <h3 class="catalog__title">
                <a href="#">
                  {{product.title}}
                </a>
              </h3>

              <span class="catalog__price">
                {{product.price}} ₽
              </span>
              <ColorList
                :colors="product.colors"
                :colorId="id"
              />
            </li>
</template>

<script>
import ColorList from './ColorList.vue';

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

  components: {
    ColorList,
  },
};
</script>
