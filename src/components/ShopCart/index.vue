<template>
	<div class="shop-cart">
		<div class="wrapper">
			<div class="content-left" @click="showCart=!showCart">
				<div class="logo-wrapper">
					<div class="logo" :class="{highlight:totalCount>0}">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-shopping_cart"></use>
						</svg>
					</div>
					<div class="num" v-show="totalCount">{{totalCount}}</div>
				</div>
				<div class="price border-right" :class="{highlight:totalPrice>0}">
					￥{{totalPrice}}元
				</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" @click="pay">
				<div class="pay" :class="{highlight:totalPrice>=minPrice}">
					{{payDesc}}
				</div>
			</div>
		</div>
		<div class="ball-wrapper">
			<div v-for="(ball,index) in balls" :key="index">
				<transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
					<div class="ball" v-show="ball.show">
						<div class="inner inner-hook"></div>
					</div>
				</transition>
			</div>
		</div>
		<transition name="fold">
			<div class="cart-list" v-show="showList">
				<div class="cart-header">
					<h1 class="title">购物车</h1>
					<div class="empty" @click="empty">清空</div>
				</div>
				<div class="cart-content" ref="cartContent">
					<ul>
						<li v-for="(food,index) in selectedFoods" :key="index" class="item border-bottom">
							<span class="name">{{food.name}}</span>
							<div class="right">
								<div class="price">￥{{food.price*food.count}}</div>
								<div class="edit-wrapper">
									<cart-button :food="food" @add="addCart"></cart-button>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	import cartButton from "../../components/CartButton";
	import BScroll from "better-scroll";
	export default {
		props: {
			deliveryPrice: {
				type: Number,
				default: 6
			},
			minPrice: {
				type: Number,
				default: 0
			},
			selectedFoods: {
				type: Array,
				default: () => {
					return [{ price: 11, count: 3 }];
				}
			}
		},
		data() {
			return {
				showCart: false,
				balls: [
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},

					{
						show: false
					}
				],
				dropBalls: []
			};
		},
		components: {
			cartButton
		},
		methods: {
			addCart(target) {
				this.$emit("add", target);
			},
			pay() {
				if (this.totalPrice < this.minPrice) return;
				alert("别点了，没饭吃的");
			},
			empty() {
				this.selectedFoods.forEach(item => {
					item.count = 0;
				});
			},
			initScroll() {
				this.cartScroll = new BScroll(this.$refs.cartContent, {
					click: true
				});
			},
			drop(el) {
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforeEnter(el) {
				let count = this.balls.length;
				while (count--) {
					let ball = this.balls[count];
					if (ball.show) {
						let { left, top } = ball.el.getBoundingClientRect();
						let x = left - 32;
						let y = top + 22 - window.innerHeight;
						el.style.display = "";
						el.style.transform = `translate(0,${y}px)`;
						let inner = el.getElementsByClassName("inner-hook")[0];
						inner.style.transform = `translate(${x}px,0)`;
					}
				}
			},
			enter(el, done) {
				setTimeout(() => {
					this.$nextTick(() => {
						el.style.transform = "translate(0,0)";
						let inner = el.getElementsByClassName("inner-hook")[0];
						inner.style.transform = `translate(0,0)`;
						el.addEventListener("transitionend", done);
					});
				}, 0);
			},
			afterEnter: function(el) {
				let ball = this.dropBalls.shift();
				if (ball) {
					el.style.display = "none";
					ball.show = false;
				}
			}
		},
		created() {
			this.$nextTick(() => {
				if (!this.cartScroll) {
					this.initScroll();
				} else {
					this.cartScroll.refresh();
				}
			});
		},
		computed: {
			showList: {
				get() {
					if (!this.totalCount) {
						return false;
					}
					return this.showCart;
				},
				set() {
					if (!this.totalCount) {
						this.showCart = true;
					}
				}
			},
			totalPrice() {
				let total = 0;
				this.selectedFoods.forEach(item => {
					total += item.price * item.count;
				});
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectedFoods.forEach(item => {
					count += item.count;
				});
				return count;
			},
			payDesc() {
				if (this.totalPrice === 0) {
					return `满￥20元起送`;
				} else if (this.totalPrice < this.minPrice) {
					return `还差￥${this.minPrice - this.totalPrice}起送`;
				} else {
					return `合计￥${this.totalPrice + this.deliveryPrice}`;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.shop-cart {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		width: 100%;
		height: 48px;
		.wrapper {
			background: #141d27;
			height: 100%;
			display: flex;
			.content-left {
				flex: 1;
				font-size: 0;
				.logo-wrapper {
					display: inline-block;
					position: relative;
					top: -10px;
					margin: 0 18px;
					padding: 6px;
					border-radius: 50%;
					box-sizing: border-box;
					width: 56px;
					height: 56px;
					background: #141d27;
					.logo {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background: #2c3e51;
						text-align: center;
						&.highlight {
							background: rgb(0, 160, 220);
							.icon {
								color: #fff;
							}
						}
						.icon {
							color: #80858a;
							font-size: 24px;
							line-height: 44px;
							padding: 10px 0;
						}
					}
					.num {
						position: absolute;
						top: 0;
						right: 0;
						width: 24px;
						height: 16px;
						line-height: 16px;
						text-align: center;
						border-radius: 16px;
						font-size: 9px;
						font-weight: 700;
						color: #fff;
						background: #f01315;
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
					}
				}
				.price {
					display: inline-block;
					vertical-align: top;
					box-sizing: border-box;
					line-height: 24px;
					margin-top: 12px;
					padding-right: 12px;
					color: rgba(255, 255, 255, 0.4);
					font-size: 16px;
					&.highlight {
						color: #fff;
					}
					&.border-right {
						border-width: 102px;
						border-color: rgba(255, 255, 255, 0.4);
					}
				}
				.desc {
					display: inline-block;
					vertical-align: top;
					line-height: 24px;
					margin: 12px;
					font-size: 10px;
					color: rgba(255, 255, 255, 0.4);
				}
			}
			.content-right {
				flex: 0 0 105px;
				width: 105px;
				.pay {
					padding: 0 8px;
					line-height: 48px;
					height: 48px;
					text-align: center;
					background: #2b333b;
					font-size: 12px;
					color: rgba(255, 255, 255, 0.4);
					&.highlight {
						color: #fff;
						background: green;
					}
				}
			}
		}
		.ball-wrapper {
			.ball {
				position: fixed;
				left: 32px;
				bottom: 22px;
				z-index: 9999;
				border-radius: 50%;
				transition: all 0.4s cubic-bezier(0.32, -0.45, 0.62, 0.9);
				.inner {
					width: 16px;
					height: 16px;
					border-radius: 50%;
					background: rgb(0, 160, 220);
					transition: all 0.4s linear;
				}
			}
		}
		.cart-list {
			position: absolute;
			bottom: 48px;
			width: 100%;
			background: #fff;
			z-index: -1;
			.cart-header {
				padding: 0 18px;
				height: 40px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #f3f5f7;
				.title {
					font-size: 14px;
					font-weight: 200;
					color: rgb(7, 17, 27);
					line-height: 40px;
				}
				.empty {
					font-size: 12px;
					color: rgb(0, 160, 220);
				}
			}
			.cart-content {
				padding: 0 18px 20px 18px;
				max-height: 220px;
				overflow: hidden;
				.item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 12px 0;
					.name {
						font-size: 14px;
						color: rgb(7, 17, 27);
						line-height: 24px;
					}
					.right {
						display: flex;
						align-items: center;
						.price {
							display: inline-block;
							font-size: 14px;
							color: rgb(240, 20, 20);
							line-height: 24px;
							margin-right: 12px;
						}
					}
				}
			}
		}
	}
	.fold-enter-active,
	.fold-leave-active {
		transition: all 0.5s ease;
	}
	.fold-enter,
	.fold-leave-to {
		transform: translateY(100%);
		opacity: 0;
	}
</style>