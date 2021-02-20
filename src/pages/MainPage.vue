<template>
     <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>
    <div class="content__catalog">
      <ProductFilter
      :price-from.sync="filterPriceFrom"
      :price-to.sync="filterPriceTo"
      :category-id.sync="filterCategoryId"
      :color-id.sync="filterColorId"
      />
      <section class="catalog">
          <ProductList :products="products"/>
          <BasePagination
          v-model="page"
          :count="countProducts"
          :per-page="productsPerPage"
          />
      </section>
    </div>
  </main>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productsPerPage: 3,
      productsData: null,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      filteredProducts = this.filterPriceFrom
        ? filteredProducts.filter((product) => product.price > this.filterPriceFrom)
        : filteredProducts;
      filteredProducts = this.filterPriceTo
        ? filteredProducts.filter((product) => product.price < this.filterPriceTo)
        : filteredProducts;
      filteredProducts = this.filterCategoryId
        ? filteredProducts.filter((product) => product.categoryId === this.filterCategoryId)
        : filteredProducts;
      filteredProducts = this.filterColorId
        ? filteredProducts.filter((product) => product.colors.some((color) => color.id === this.filterColorId))
        : filteredProducts;

      return filteredProducts;
    },
    products() {
      // const offset = (this.page - 1) * this.productsPerPage;
      // return this.filteredProducts.slice(offset, offset + this.productsPerPage);
      return this.productsData
        ? this.productsData.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },

  methods: {
    loadProducts() {
      axios.get('https://vue-study.skillbox.cc/api/products')
        .then((response) => {
          this.productsData = response.data.items;
        });
    },
  },

  created() {
    this.loadProducts();
  },
};
</script>
