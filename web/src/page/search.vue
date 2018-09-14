<template>
  <div>
    <mc-content>
      <mc-head slot="head" :isData="{back: false}"></mc-head>
      <div slot="cont">
        <mt-field v-model="searchvalue" @keyup.enter.native="onsearch" placeholder="输入搜索内容"></mt-field>
        <router-link tag="div" :to="'class?url=' + i.path.substring(1, i.path.length)" v-for="(i, index) in searchArr.search" :key="index" class="search-card">
          <div><b>{{i.name}}</b></div>
          <div>{{i.describe}}</div>
        </router-link>
      </div>
    </mc-content>
  </div>
</template>

<script>
import Qs from 'qs'

export default {
  data () {
    return {
      searchvalue: '',
      searchArr: []
    }
  },
  methods: {
    onsearch () {
      var that = this
      that.$http({
        method: 'post',
        url: that.$api.www + 'search',
        data: Qs.stringify({
          val: that.searchvalue
        })
      }).then(function (res) {
        that.searchArr = res.data
      })
    }
  }
}
</script>

<style scoped>
  .search-card {
    text-align: left;
    padding: 10px;
    background: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,.1);
    margin: 0 0 10px 0;
  }
</style>
