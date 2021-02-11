<template>
  <component :is="currentComponentPage" :page-params="currentPageParams"/>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NoFoundPage from '@/pages/NoFoundPage.vue';
import eventBus from '@/eventBus';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  name: 'App',
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },

  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },

  computed: {
    currentComponentPage() {
      return routes[this.currentPage] || 'NoFoundPage';
    },
  },

  components: {
    MainPage,
    ProductPage,
    NoFoundPage,
  },

  created() {
    eventBus.$on('gotoPage', (pageName, pageParams) => this.gotoPage(pageName, pageParams));
  },
};
</script>
