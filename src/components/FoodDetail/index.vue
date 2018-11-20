<template>
  <div class="good" v-show="showDetail">
    a
  </div>
</template>
<script>
export default {
  props:{
    food:{
      type:Object,
    }
  }
}
</script>

<style lang="scss" scoped>
.food{
  position:fixed;
  left:0;
  top:0;
  bottom:48px;
  z-index:99;
  width:100%;
  background: #fff;
}
</style>
