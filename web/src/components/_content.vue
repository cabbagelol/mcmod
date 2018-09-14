<template>
  <div id="mc-content">
    <slot name="head">

    </slot>
    <div class="mc-content-soll">
      <slot name="cont" >
        qwq??
      </slot>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  #mc-content {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    top: 0;
    display: inline-flex;
    background: #f2f2f2;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  #mc-content .mc-content-soll {
    width: 100%;
    flex: 1;
    overflow: auto;
    position: relative;
  }

  #mc-content .mc-content-soll > *  {
    position: absolute;
    overflow: auto;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
</style>
