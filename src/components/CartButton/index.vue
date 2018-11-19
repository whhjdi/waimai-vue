<template>
  <div class="cart-button">
    <div class="cart-minus" v-show="food.count" @click="minusCount">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-remove_circle_outlin"></use>
      </svg>
    </div>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add" @click="addCount">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-add_circle"></use>
      </svg>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props:{
    food:{
      type:Object
    }
  },
  methods:{
    addCount(){
      if (!this.food.count) {
          Vue.set(this.food, "count", 1)
        } else {
          this.food.count++;
          
        }
      console.log(this.food.count);
    },
    minusCount(){
      this.food.count--;    
    }
  },
  }
</script>

<style lang="scss" scoped>
  .cart-button {
  	font-size: 0;
  	.cart-minus {
  		display: inline-block;
  		padding: 6px;
  		font-size: 24px;
  		line-height: 24px;
  	}
  	.cart-count {
  		display: inline-block;
  		vertical-align: top;
  		font-size: 12px;
  		line-height: 24px;
  		padding-top: 6px;
  		color: rgb(147, 153, 159);
  	}
  	.cart-add {
  		display: inline-block;
  		padding: 6px;
  		font-size: 24px;
  		line-height: 24px;
  	}
  }
</style>
