<template>
  <v-card>
    <v-card-media :src="productPic" height="200px">
    </v-card-media>
    <v-progress-linear :value="productProgress" height="10" color="info" style="margin-top:-10px"></v-progress-linear>
    <v-card-text>
      <v-layout>
        <v-flex xs6 class="capitalize"><span class="caption">{{productType}}</span></v-flex>
        <v-flex xs6 class="hide-overflow-text"><span class="caption">{{productProducer}}</span></v-flex>
      </v-layout>
      <div class="title-container">
        <h3 class="headline mb-0 capitalize">{{productTitle}}</h3>
      </div>
      <div class="caption" style="margin-top:10px"><v-icon style="font-size:12px;">location_on</v-icon> {{productLocation}}</div>
    </v-card-text>
    <v-card-text>
      <v-layout class="card-info" v-if="productStatus === 'open'">
        <v-flex xs3>
          <div class="caption">terdanai</div>
          <div class="body-2">{{productProgress + '%'}}</div>
        </v-flex>
        <v-flex xs5>
          <div class="caption">terkumpul</div>
          <div class="body-2">Rp. {{formattedFund}}</div>
          <div class="caption">dari Rp. {{formattedValue}}</div>
        </v-flex>
        <v-flex xs4>
          <div class="caption">tersisa</div>
          <div class="body-2">{{productSellEndHuman}}</div>
        </v-flex>
      </v-layout>
      <v-layout class="card-info" v-else-if="productStatus === 'funded'">
        <v-flex xs6>
          <div class="caption">terkumpul</div>
          <div class="body-2">Rp. {{formattedValue}}</div>
        </v-flex>
        <v-flex xs6>
          <div class="caption">status</div>
          <div class="body-2">Terdanai Sepenuhnya</div>
        </v-flex>
      </v-layout>
      <v-layout class="card-info" v-else-if="productStatus === 'close'">
        <v-flex xs6>
          <div class="caption">dana dibutuhkan</div>
          <div class="body-2">Rp. {{formattedValue}}</div>
        </v-flex>
        <v-flex xs6>
          <div class="caption">dibuka</div>
          <div class="body-2">{{readableSellDate}}</div>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>  
</template>
<script>
  import numeral from 'numeral'
  import moment from 'moment'

  export default {
    name: 'ProductCard',
    computed: {
      formattedFund: function () {
        return numeral(this.productFundCollected).format('0,0')
      },
      formattedValue: function () {
        return numeral(this.productValue).format('0,0')
      },
      productProgress: function () {
        let value = parseFloat(this.productFundCollected) / parseFloat(this.productValue) * 100
        return numeral(value).format('0.00')
      },
      readableSellDate: function () {
        moment.locale('id')
        let date = moment(this.productSellStart)
        return date.format('D MMMM YYYY')
      }
    },
    props: {
      productStatus: String,
      productType: String,
      productPic: String,
      productProducer: String,
      productLocation: String,
      productTitle: String,
      productFundCollected: Number,
      productValue: Number,
      productSellStart: String,
      productSellEnd: String,
      productSellEndHuman: String
    },
    data () {
      return {
        msg: 'Product Card'
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
  .capitalize {
    text-transform: capitalize;    
  }
  .hide-overflow-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;    
  }
</style>

