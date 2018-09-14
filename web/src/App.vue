<template>
  <div id="mcmod" class="mint-height-10">
    <!--<div style="position: fixed;width: 100px;z-index: 9999;background: #000;top: 0;">-->
      <!--<router-link to="/class" @click.native="clickLink">A</router-link>-->
      <!--<router-link to="/D" @click.native="clickLink">D</router-link>-->
    <!--</div>-->
    <keep-alive>
      <transition :name="$store.state.states">
        <router-view/>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    clickLink () {
      this.$store.commit('setTransition', 'turn-on')
    }
  },
  mounted () {
    var _this = this
    window.addEventListener(
      'popstate',
      function (e) {
        _this.$store.commit('setTransition', 'turn-off')
      },
      false
    )
  }
}
</script>

<style>
  .btn {
    width: 50%;
  }
  .turn-on-enter {
    transform: translate3d(100%, 0, 0);
  }
  .turn-on-leave-to {
    /* transform: translate3d(-20%, 0, 0); */
  }
  .turn-on-enter-active,
  .turn-on-leave-active {
    transition: transform 0.4s ease;
  }
  .turn-off-enter {
    /* transform: translate3d(-20%, 0, 0); */
  }
  .turn-off-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .turn-off-enter-active,
  .turn-off-leave-active {
    transition: transform 0.4s ease;
  }
  .turn-off-leave-active {
    z-index: 2;
  }
</style>
