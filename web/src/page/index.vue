<template>
  <div class="index mint-height-10">
    <keep-alive>
      <component :is="selected" class="mint-height-10"></component>
    </keep-alive>
    <mt-tabbar v-model="selected" class="index-tabbar">
      <mt-tab-item id="indexData" class="ripple">
        <img slot="icon" src="../public/img/ViewGallery.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="search" class="ripple">
        <img slot="icon" src="../public/img/search.png">
        搜索
      </mt-tab-item>
      <mt-tab-item id="my" class="ripple">
        <img slot="icon" src="../public/img/account.png">
        关于
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import indexData from './indexdata'
import search from './search'
import my from './my'

import { Navbar, Tabbar, TabItem } from 'mint-ui'

Vue.component(Tabbar.name, Tabbar)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)

export default {
  data () {
    return {
      selected: 'indexData'
    }
  },
  components: {
    indexData,
    search,
    my
  },
  methods: {
    setNav (name_) {
      var that = this
      that.selected = name_
    },
    openLink () {
      this.$parent.clickLink()
    }
  }
}
</script>

<style scoped>
  .index-tabbar {
    overflow: hidden;
    position: fixed;
    z-index: 102;
    bottom: 0;
    left: 0;
    font-size: 1rem;
  }

  .index-tabbar > * {
    overflow: hidden;
  }
</style>
