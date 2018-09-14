<template>
  <div>
    <mc-content>
      <mc-head slot="head" :isData="{back: false}"></mc-head>
      <div slot="cont">
        <keep-alive>
          <mt-navbar v-model="selected" class="index-nav">
            <mt-tab-item :id="index" v-for="(i, index) in indexNavArr" :key="index" @click.native="onnav(index)" class="fade_in ripple">{{i.name}}</mt-tab-item>
          </mt-navbar>
        </keep-alive>

        <div class="index-search" @click="openSearch('search')">
          <input type="text" :placeholder="'搜索: ' + indexArr.ooops" disabled="true"/>
        </div>

        <mt-tab-container v-model="selected" v-if="index_selected">
          <mt-tab-container-item :id="index" v-for="(i, index) in indexNavArr" :key="index" class="fade_in">
            <div class="index-content">
              <div v-for="(ri, rindex) in indexArr.main[i.system_name]" :key="rindex" v-if="indexArr.main" @click="openClassDiscuss(ri.path, ri.imgurl)">
                <div class="img">
                  <img :src="ri.imgurl" onerror="this.src='https://www.mcmod.cn/pages/class/images/none.jpg'" class="fade_in">
                </div>
                <div class="index-content-text">
                  {{ri.name || ri.name.title}}
                </div>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
        <div
          style="display: inline-table;"
          class="index-content"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="5">
            <div v-for="(iadd, iaddindex) in list" :key="iaddindex" @click="openClassDiscuss(iadd.path, iadd.backurl)">
              <div class="img">
                <img :src="iadd.backurl" onerror="this.src='https://www.mcmod.cn/pages/class/images/none.jpg'" class="fade_in">
              </div>
              <div class="index-content-text">
                {{iadd.name}}
              </div>
            </div>
        </div>
        <div class="index-fooer">
          <div class="index-fooer-load">
            <mt-spinner :type="3" v-if="isload"></mt-spinner>
          </div>
          <div class="index-fooer-noarr" v-if="pageArrnone">
            没有数据啦
          </div>
          <img src="../public/img/tanshou-mcnian.png"/>
        </div>
      </div>
    </mc-content>
  </div>
</template>

<script>
import Vue from 'vue'
import Qs from 'qs'
import {Field, InfiniteScroll} from 'mint-ui'

Vue.component(Field.name, Field)
Vue.use(InfiniteScroll)

export default {
  data () {
    return {
      list: [],
      page: 1,
      pageArrnone: false,
      category: '',
      searchvalue: '',
      selected: 0,
      isload: false,
      index_selected: true,
      indexNavArr: [],
      indexArr: {
        ooops: '',
        main: []
      }
    }
  },
  created () {
    var that = this
    that.$mint.Indicator.open()

    // ===========
    // 获取首页数据
    // ===========
    that.$http({
      method: 'get',
      url: that.$api.www + 'index'
    }).then(function (res) {
      that.$mint.Indicator.close()
      that.indexArr = res.data

      // ===========
      // 获取首页菜单
      // ===========
      that.$http({
        method: 'get',
        url: that.$api.www + 'index/nav'
      }).then(function (res) {
        that.indexNavArr = res.data
      })
    })
  },
  methods: {
    openSearch (name_) {
      var that = this
      that.$parent.setNav(name_)
    },
    onnav (index_) {
      var that = this
      that.pageArrnone = false
      that.list = []
      that.page = 0

      that.index_selected = !that.indexNavArr[index_].ststem_category

      if (that.indexNavArr[index_].system_initial) {
        that.page = 1
        that.category = that.indexNavArr[index_].ststem_category
        that.getLoadindexData({
          page: that.page,
          category: that.category
        }, function (data_) {
          if (data_.length > 0) {
            that.page = (that.page + 1)
          } else {
            that.pageArrnone = true
          }
        })
      }
    },
    getLoadindexData (data_, callback) {
      var that = this
      that.isload = true
      that.$http({
        method: 'post',
        url: that.$api.www + 'index/classappend',
        data: Qs.stringify(data_)
      }).then(function (res) {
        for (var i of res.data.data) {
          that.list.push(i)
        }
        that.isload = false
        callback(res.data.data)
      })
    },
    loadMore () {
      var that = this
      if (that.pageArrnone) {
        return false
      }
      that.getLoadindexData({
        page: that.page,
        category: that.category
      }, function (data_) {
        if (data_.length > 0) {
          that.page = (that.page + 1)
        } else {
          that.pageArrnone = true
        }
      })
    },
    openClassDiscuss (url_, backurl_) {
      var that = this
      that.$parent.openLink()
      that.$router.push({
        name: 'class',
        query: {
          url: url_,
          b_u: backurl_
        }
      })
    }
  }
}
</script>

<style scoped>
  .index-nav {
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
  }

  .index-nav > * {
    position: relative;
    margin: 0 10px;
    padding: 0 5px 10px 5px !important;
    white-space: pre;
  }

  .index-nav > *.is-selected {
    border-bottom: 3px solid #3d454c !important;
    color: #3d454c !important;
    margin-bottom: 0px !important;
  }

  .index-content {
    margin:10px;
  }

  .index-content > div:nth-child(2n) {
    margin: 0 0 10px 10px;
  }

  .index-content > div {
    box-shadow: 0 2px 5px rgba(0,0,0,.1);
    border-radius: .3rem;
    margin: 0 0 10px 0;
    position: relative;
    overflow: hidden;
    width: calc(50% - 5px);
    float: left;
  }

  .index-content > div .img {
    overflow: hidden;
    width: 100%;
    height: 80px;
    display: inline-flex;
    justify-items: center;
    align-content: center;
  }

  .index-content > div .img img {
    transform: scale(1);
    width: 100%;
  }

  .index-content .index-content-text {
    height: 40px;
    background: #fff;
    overflow: hidden;
    margin: -5px 0 0 0;
    padding: 10px;
    text-align: left;
  }

  .index-search {
    padding: 10px 0;
  }
  .index-search input[disabled] {
    background-color: #fff !important;
  }
  .index-search input {
    box-shadow: 0 2px 5px rgba(0,0,0,.1);
    width: calc(100% - 40px);
    margin: 0 10px;
    padding: 10px;
    border-radius: .3rem;
    color: #000;
    border: 0;
  }

  .index-fooer {
    text-align: center;
    margin: 0 0 40px 0;
  }

  .index-fooer-noarr {
    margin: 0 0 10px 0;
    font-size: 1rem;
    text-align: center;
  }

  .index-fooer-load {
    text-align: center;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 0 50px 0;
  }

</style>
