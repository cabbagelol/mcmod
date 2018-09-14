<template>
  <header>
    <div class="header">
      <div class="header-btns">
        <div @click="onheaderBack" v-if="isData.back" style="line-height: 1.2">
          <img src="../public/img/back.png" class="header-btns-back"/>返回
        </div>
      </div>
      <div class="header-title">
        <img src="../public/img/logo.png">
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    isData: {
      back: false
    }
  },
  methods: {
    onheaderBack () {
      this.$store.commit('setTransition', 'turn-off')
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>
  header {
    position: relative;
    color: #fff;
    padding: 25px 0 0 0;
    background-color: #3d454c !important;
    font-size: 20px;
    height: 40px;
    width: 100%;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
    z-index: 100;
  }

  header .header {
    position: relative;
  }

  header .header-btns {
    position: absolute;
    height: 100%;
    width: auto;
    top: 0;
    left: 0;
    display: inline-flex;
  }

  header .header-btns > div {
    font-size: 1rem;
    padding: 0 10px;
    display: inline-flex;
    align-self: center;
    justify-items: center;
  }

  header .header-title {
    width: 100%;
    display: inline-flex;
    justify-items: center;
    align-items: center;
    height: 100%;
  }

  .header-btns-back {
    width: 20px;
    height: 20px;
  }

  header img {
    margin: 0 auto;
    width: 80px;
  }

</style>
