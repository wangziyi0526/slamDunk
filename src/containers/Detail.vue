<template>
  <div class="datail">
    <m-header :title="data.bookName"></m-header>
    <div v-if="data.sliderLists">
      <slider :data="data.sliderLists"></slider>
    </div>
    <button @click="goBack()">返回</button>
  </div>
</template>

<script type="text/ecmascript-6">

import MHeader from "components/MHeader";
import Slider from "components/Slider"; 
import { getOneBook } from "api"
export default {
  data() {
    return {
      id: null,
      data: {}
    };
  },
  created () {
  },
  mounted () {
    this.id = this.$route.query.id
    console.log(this.id)
    this.getDetails()    
  },
  methods: {
    goBack () {
    this.$destroy()
      this.$router.go(-1)
    },
    getDetails () {
      getOneBook(this.id).then(res => {
        this.data = res.data
      })
    }
  },

  components: {
    MHeader,
    Slider
  }
};
</script>

<style scoped>
</style>
