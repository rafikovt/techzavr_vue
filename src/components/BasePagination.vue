<template>
    <ul class="catalog__pagination pagination">
            <li class="pagination__item" v-show="page !== 1">
                <a href="#" class="pagination__link pagination__link--arrow"
                  @click.prevent="paginate(page - 1)"
                  aria-label="Предыдущая страница"
                >
                <svg width="8" height="14" fill="currentColor">
                  <use xlink:href="#icon-arrow-left"></use>
                </svg>
              </a>
            </li>
            <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
              <a href="#" class="pagination__link"
                :class="{'pagination__link--current': pageNumber === page}"
                @click.prevent="paginate(pageNumber)"
              >
                {{pageNumber}}
              </a>
            </li>
            <li class="pagination__item" v-show="page !== pages">
              <a href="#" class="pagination__link pagination__link--arrow"
                aria-label="Следующая страница"
                @click.prevent="paginate(page + 1)"
              >
                <svg width="8" height="14" fill="currentColor">
                  <use xlink:href="#icon-arrow-right"></use>
                </svg>
              </a>
            </li>
          </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },

  props: {
    page: Number,
    count: Number,
    perPage: Number,
  },

  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },

  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
  },
};
</script>
