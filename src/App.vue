<template>
  <div id="app">
    <header-bar :seller="seller"></header-bar>
    <div class="container">
      <router-view>
      </router-view>
      <div class="tab">2</div>
      <div class="content">3</div>
    </div>
  </div>
</template>
<script>
  import fetch from "./api/fetch.js";
  import HeaderBar from "./components/HeaderBar";
  export default {
    data() {
      return {
        seller: {}
      };
    },
    created() {
      fetch("seller").then(res => {
        console.log(res.data);
        this.seller = JSON.parse(JSON.stringify(res.data))
      });
    },
    components: {
      HeaderBar
    }
  };
</script>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    line-height:1;
    font-weight:200;
  }
</style>
