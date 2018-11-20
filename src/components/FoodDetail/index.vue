<template>
  <transition name="show-detail">
    <div class="food-detail" v-show="showDetail" ref="detail">
      <div class="food-header">
        <img :src="food.image" alt="" class="food-image">
        <div class="icon-wrapper" @click="$emit('close')">
          <svg class="icon back" aria-hidden="true">
            <use xlink:href="#icon-arrow_lift"></use>
          </svg>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="extra">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span>￥{{food.price}}</span>
          <span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
        </div>
        <div class="button-wrapper">
          <transition name="fade">
            <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count||food.count===0">加入购物车</div>
          </transition>
          <cart-button :food="food" v-show="food.count>0" @add="addFood"></cart-button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import CartButton from "../../components/CartButton";
  import BScroll from "better-scroll";
  import Vue from "vue";
  export default {
  	props: {
  		food: {
  			type: Object
  		},
  		showDetail: {
  			type: Boolean,
  			default: false
  		}
  	},
  	components: {
  		CartButton
  	},
  	created() {
  		this.$nextTick(() => {
  			if (!this.detailScroll) {
  				this.detailScroll = new BScroll(this.$refs.detail, {
  					probeType: 3,
  					click: true
  				});
  			} else {
  				this.detailScroll.refresh();
  			}
  		});
  	},
  	methods: {
  		addFirst(e) {
  			this.$emit("add", e.target);
  			Vue.set(this.food, "count", 1);
      },
      addFood(target) {
        this.$emit('add', target);
      },
  	}
  };
</script>

<style lang="scss" scoped>
  .food-detail {
  	position: fixed;
  	left: 0;
  	top: 0;
  	bottom: 48px;
  	z-index: 99;
  	width: 100%;
  	background: #fff;
  	color: #fff;
  	background: #f3f5f7;
  	.food-header {
  		position: relative;
  		width: 100%;
  		height: 0;
  		padding-bottom: 100%;
  		.food-image {
  			height: 100%;
  			width: 100%;
  			position: absolute;
  			top: 0;
  			left: 0;
  		}
  		.icon-wrapper {
  			position: absolute;
  			top: 10px;
  			left: 0;
  			cursor: pointer;
  			.back {
  				color: #fff;
  				font-size: 24px;
  				padding: 10px;
  			}
  		}
  	}
  	.content {
  		color: #000;
  		background: #fff;
  		padding: 18px;
  		position: relative;
  		.title {
  			font-size: 14px;
  			color: rgb(7, 17, 27);
  			font-weight: 700;
  			line-height: 14px;
  		}
  		.extra {
  			font-size: 10px;
  			color: rgb(147, 153, 159);
  			line-height: 10px;
  			margin-top: 8px;
  			margin-bottom: 18px;
  			.sell-count {
  				margin-right: 12px;
  			}
  		}
  		.price {
  			font-size: 14px;
  			color: rgb(240, 20, 20);
  			font-weight: 700;
  			line-height: 24px;
  			.old-price {
  				font-size: 10px;
  				color: rgb(147, 153, 159);
  				font-weight: 700;
  				line-height: 24px;
  				margin-left: 8px;
  				text-decoration: line-through;
  			}
  		}
  		.button-wrapper {
  			position: absolute;
  			right: 18px;
  			bottom: 18px;
  			z-index: 9999;
  			.buy {
  				/* position: absolute; */
  				/* right: 18px;
                				bottom: 18px; */
  				box-sizing: border-box;
  				height: 24px;
  				line-height: 24px;
  				padding: 0 12px;
  				color: #fff;
  				font-size: 10px;
  				background: rgb(0, 160, 220);
  				border-radius: 12px;
  			}
  		}
  	}
  }
  .show-detail-enter-active,
  .show-detail-leave-active {
  	transition: all 0.5s;
  }
  .show-detail-enter, .show-detail-leave-to /* .fade-leave-active below version 2.1.8 */ {
  	transform: translateX(100%);
  }
  .fade-enter-active,
  .fade-leave-active {
  	transition: all 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  	opacity: 0;
  }
</style>
