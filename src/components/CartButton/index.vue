<template>
  <div class="cart-button">
    <transition name="slide">
      <div class="cart-minus" v-show="food.count" @click="minusCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-remove_circle_outlin"></use>
        </svg>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add" @click="addCount($event)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-add_circle"></use>
      </svg>
    </div>
  </div>
</template>
<script>
  import Vue from "vue";
  export default {
  	props: {
  		food: {
  			type: Object
  		}
  	},
  	methods: {
  		addCount(e) {
  			if (!this.food.count) {
  				Vue.set(this.food, "count", 1);
  			} else {
  				this.food.count += 1;
  			}
  			this.$emit("add",e.target);
  		},
  		minusCount() {
  			if (this.food.count > 0) {
  				this.food.count -= 1;
  			} else {
  				this.food.count = 0;
  			}
  		}
  	}
  };
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
  /* .slide-enter-active,
        .slide-leave-active {
        	transition: all .5s linear;
        }
        .slide-enter,
        .slide-leave-to {
          opacity: 0.2;
        	transform: translate3D(20px,10px,0) rotate(180deg);
        } */
  .slide-enter-active {
  	animation: slide-in 0.5s linear;
  }
  .slide-leave-active {
  	animation: slide-in 0.5s linear reverse;
  }
  @keyframes slide-in {
  	0% {
  		transform: translate(30px, 0) rotate(0deg);
  	}
  	50% {
  		transform: translate(10px, -20px) rotate(180deg);
  	}
  	100% {
  		transform: translate(0, 0) rotate(360deg);
  	}
  }
</style>
