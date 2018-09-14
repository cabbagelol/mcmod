<template>
    <div>
      <mc-content>
        <mc-head slot="head" :isData="{back: false}"></mc-head>
        <div slot="cont">
          <div class="my-content">
            <div class="my-content-version">
              Mcmod App [1.0]
              <span>非官方应用</span>
            </div>
          </div>
          <mt-cell title="作者博客" is-link @click.native="openUrl('https://cabbagelol.net', '_system')"></mt-cell>
          <mt-cell title="应用反馈" is-link @click.native="openUrl('https://bbs.mcmod.cn/forum.php?mod=viewthread&tid=1448&fromuid=4801\n', '_system')"></mt-cell>
        </div>
      </mc-content>
    </div>
</template>

<script>
import Vue from 'vue'
import { Cell } from 'mint-ui'
Vue.component(Cell.name, Cell)

export default {
  methods: {
    openUrl (url_, type_) {
      // eslint-disable-next-line no-undef
      cordova.InAppBrowser.open(url_, type_, 'location=yes')
    }
  }
}
</script>

<style scoped>
  .my-content {
    padding: 50px;
  }

  .my-content-version {
    margin: 0 auto;
    text-align: center;
    color: #d2d2d2;
  }

  .my-content-version > span {
    background-color: #d2d2d2;
    color: #fff;
    padding: 2px 5px;
    border-radius: .3rem;
    display: block;
    width: 70px;
    text-align: center;
    margin: 3px auto;
    font-size: .7rem;
  }
</style>
