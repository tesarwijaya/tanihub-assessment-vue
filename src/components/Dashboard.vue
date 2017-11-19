<template>
  <div>
    <v-progress-linear
      v-show="onLoad"
      height="3"
      v-bind:indeterminate="true" 
      class="main-progress"></v-progress-linear>
    <v-toolbar fixed app>
      <v-toolbar-title>Program Budidaya</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="logout()">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 md4 v-for="product in productData" :key="product.id">
          <ProductCard
            :productStatus="product.status"
            :productType="product.type"
            :productProducer="product.producer.name"
            :productLocation="product.producer.location"
            :productTitle="product.title"
            :productPic="product.picture"
            :productFundCollected="product.fund"
            :productValue="product.value"
            :productSellStart="product.sellStart"
            :productSellEnd="product.sellEnd"
            :productSellEndHuman="product.sell_end_diff_human"
          ></ProductCard>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-btn
          v-if="loadedPage !== lastPage"
          :loading="onLoad"
          flat 
          @click="loadMore()">Load more</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import ProductCard from './ProductCard'
  import { removeOauthInfo, getOauthInfo } from '../localStorage'
  import { get as getProducts } from '../request/product'

  export default {
    name: 'dashboard',
    components: { ProductCard },
    mounted () {
      this.onLoad = true
      getProducts(getOauthInfo().access_token).then(response => {
        this.loadedPage = response.data.current_page
        this.lastPage = response.data.last_page
        this.productData = response.data.data
        this.onLoad = false
      })
    },
    methods: {
      logout: function () {
        removeOauthInfo()
        this.$router.push({name: 'Hello'})
      },
      loadMore: function () {
        this.onLoad = true
        getProducts(getOauthInfo().access_token, {page: this.loadedPage + 1})
          .then(response => {
            this.onLoad = false
            this.productData = this.productData.concat(response.data.data)
            this.loadedPage = response.data.current_page
          })
          .catch(error => {
            this.onLoad = false
            console.log(error.response)
          })
      }
    },
    data () {
      return {
        msg: 'dashboard component',
        item_per_page: 3,
        onLoad: false,
        loadedPage: '',
        lastPage: '',
        productData: []
      }
    }
  }
</script>
<style scoped>
  .title-container {
    min-height: 96px;
  }
  .card-info {
    min-height: 65px;
  }
  .main-progress {
    position:fixed;
    top:0;
    z-index:3;
    margin:0;
  }
</style>
