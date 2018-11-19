<template>
  <div id="app">
    <header-bar :seller="seller"></header-bar>
    <nav-bar></nav-bar>
    <router-view>
    </router-view>
  </div>
</template>
<script>
  import fetch from "./api/fetch.js";
  import HeaderBar from "./components/HeaderBar";
    import NavBar from "./components/NavBar";
  export default {
    data() {
      return {
        seller: {}
      };
    },
    created() {
      fetch("seller").then(res => {
        this.seller = JSON.parse(JSON.stringify(res.data))
      });
    },
    components: {
      HeaderBar,
      NavBar
    }
  };
</script>

<style lang="scss">
  #app {
  	font-family: "Avenir", Helvetica, Arial, sans-serif;
  	-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
  	color: #2c3e50;
  	line-height: 1;
  	font-weight: 400;
    position: relative;
    flex-direction: column;
    height:100%;
  }
</style>
