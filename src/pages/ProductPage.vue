/* eslint-disable indent */
<template>
    <main v-if="this.productLoading">Загрузка товара...</main>
    <main v-else-if="this.productLoadingFailed">Произошла ошибка при загрузке</main>
    <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{category.title}}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{product.title}}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image" :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{product.id}}</span>
        <h2 class="item__title">
         {{product.title}}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addtoCart">
            <b class="item__price">
              {{product.price | formatNumber}} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <ColorList :colors="product.colors"/>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click.prevent="productAmount > 0 ? productAmount-- : 0">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="productAmount">

                <button type="button" aria-label="Добавить один товар" @click.prevent="productAmount++">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
              <div v-show="productAdded">Продукт добавлен в корзину</div>
              <div v-show="productAddSending">Добавляем продукт в корзину...</div>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
          Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки,
          сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+,
          объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на смартфоне.
          При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения сторонних
          разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников. Эта
          информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
           Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм.
           что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к пользователю
            стороне расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а также полученная со
            смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д.
            (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает,
            что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import formatNumber from '@/utils/formatNumber';
import ColorList from '@/components/ColorList.vue';
import axios from 'axios';
import { mapActions } from 'vuex';
import { API_BASE_URL } from '../config';

export default {
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,

      productAdded: false,
      productAddSending: false,
    };
  },
  components: { ColorList },

  // watch: {
  //   '$route.params.id': function () {
  //     if (!this.product) {
  //       this.$router.replace({ name: 'notFoundPage' });
  //     }
  //   },
  // },

  computed: {
    product() {
      return this.productData
        ? Object.assign(this.productData, { image: this.productData.image.file.url })
        : {};
    },
    category() {
      return this.productData.category.id;
    },
  },

  filters: {
    formatNumber,
  },

  methods: {
    ...mapActions(['addProductToCart']),

    addtoCart() {
      this.productAdded = false;
      this.productAddSending = true;

      this.addProductToCart({ productId: this.productData.id, amount: this.productAmount })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },

    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios
        .get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => {
          this.productData = response.data;
        })
        .catch(() => {
          this.productLoadingFailed = true;
        })
        .then(() => {
          this.productLoading = false;
        });
    },
  },

  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
