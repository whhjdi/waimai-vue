<template>
  <div class="tab border-bottom">
    <router-link to="/goods" class="tab-item">
      商品
    </router-link>
    <router-link to="/ratings" class="tab-item">
      评价
    </router-link>
    <router-link to="/seller" class="tab-item">
      商家
    </router-link>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
  .tab {
  	display: flex;
  	width: 100%;
  	height: 40px;
  	line-height: 40px;
  	background: #fff;
  	.tab-item {
  		text-align: center;
  		flex: 1;
  		color: rgb(77, 85, 93);
  		&.router-link-active {
  			color: rgb(240, 20, 20);
  		}
  	}
  }
</style>
