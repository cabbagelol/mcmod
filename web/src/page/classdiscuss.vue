<template>
  <div class="mint-template" >
    <mc-content>
      <div slot="head" style="width: 100%">
        <mc-head :isData="{back: true}"></mc-head>
      </div>
      <div slot="cont">
        <div class="classdiscuss-img">
          <img v-lazy="$route.query.b_u || discussArr.mod_imgurl" style="transform: scale(1.4);width: 100%">
          <div class="classdiscuss-head-cont">
            <div class="classdiscuss-head-contTit">{{discussArr.mod_name}}</div>
            <div></div>
          </div>
        </div>
        <div class="classdiscuss-card classdiscuss-data classdiscuss-card-f">
          <div>
            <div class="classdiscuss-data-tit">{{discussArr.mod_toal.general}}</div>
            <div>总游览</div>
          </div>
          <div>
            <div class="classdiscuss-data-tit">{{discussArr.mod_toal.filling_rate}}</div>
            <div>填充率</div>
          </div>
          <div>
            <div class="classdiscuss-data-tit">{{discussArr.mod_toal.score}}</div>
            <div>{{discussArr.mod_toal.score_cont}}</div>
          </div>
          <div>
            <div class="classdiscuss-data-tit">
              {{discussArr.mod_toal.push}}
            </div>
            <div @click="setClassPush(discussArr.mod_id)">推荐</div>
          </div>
        </div>
        <div class="classdiscuss-head classdiscuss-card">
          <h3>
            <b>MOD信息</b>
          </h3>
          <div v-for="(i, index) in discussArr.mdd" :key="index" v-html="i" v-if="i.indexOf('模组')"></div>
        </div>
        <div class="classdiscuss-card classdiscuss-card-modintroduce">
          <h3>
            <b>MOD介绍</b>
          </h3>
          <div v-html="discussArr.mod_introduce"></div>
        </div>
        <div class="classdiscuss-card">
          <h3>
            <b>MOD讨论</b>
          </h3>
          <div v-for="(ci,cindex) in discussArr.mod_discuss" :key="cindex" v-if="discussArr.mod_discuss.length > 0" class="classdiscuss-card-bbs">
            <a target="_new" :href="ci.url">{{ci.title}}</a>
          </div>
          <div v-if="discussArr.mod_discuss.length <= 0">
            没有帖子
          </div>
        </div>
      </div>
    </mc-content>
  </div>
</template>

<script>
import Vue from 'vue'
import { Lazyload } from 'mint-ui'

Vue.use(Lazyload)

export default {
  data () {
    return {
      discussArr: {
        mod_discuss: []
      }
    }
  },
  created () {
    var that = this
    that.$http({
      method: 'get',
      url: that.$api.www + 'index/class?url=' + that.$route.query.url
    }).then(function (res) {
      that.discussArr = res.data
    })
  },
  methods: {
    setClassPush (id_) {
      var that = this
      that.$http({
        url: that.$api.www + 'index/class_push',
        data: {
          c: id_
        }
      }).then(function () {

      })
    }
  }
}
</script>

<style scoped>
  .classdiscuss-head {
    display: inline-table;
  }

  .classdiscuss-head > div {
    padding: 5px 0;
    width: 50%;
    float: left;
    text-align: left;
  }

  .classdiscuss-head > *:last-child {
    width: 100% !important;
  }

  .classdiscuss-card-f {
    margin: 0 !important;
  }

  .classdiscuss-data {
    display: inline-flex;
    width: 100%;
  }

  .classdiscuss-data > div {
    text-align: center;
    width: 100%;
  }

  .classdiscuss-data > div:last-child {
    border-right: 1px solid #fff !important;
  }

  .classdiscuss-data > div {
    border-right: 1px solid #f2f2f2;
  }

  .classdiscuss-data > div > div {
    color: #888;
    font-size: 12px;
  }

  .classdiscuss-data-tit {
    font-size: 1rem !important;
    color: #000 !important;
  }

  .classdiscuss-card {
    text-align: left;
    width: calc(100% - 20px);
    margin: 10px 0 0 0 ;
    padding: 10px;
    background: #fff;
    box-shadow: 0 2px rgba(0,0,0, .1);
  }

  .classdiscuss-card-bbs {
    background: #f2f2f2;
    border-radius: .3rem;
    padding: 5px 10px;
  }

  .classdiscuss-img {
    height: 190px;
    position: relative;
    overflow: hidden;
  }

  .classdiscuss img {
    display: inline-flex;
    justify-items: center;
    align-items: center;
  }

  .classdiscuss-head-cont {
    position: absolute;
    color: #fff;
    text-shadow: 0 1px 1px #000;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.5)); /* 标准的语法 */
  }

  .classdiscuss-head-contTit {
    font-weight: bold;
    font-size: 1.2rem;
  }
</style>
