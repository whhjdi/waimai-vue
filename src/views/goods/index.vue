<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul class="menu">
				<li v-for="(item,index) in goods" :key="index" class="menu-item border-bottom" :class="{current:currentIndex===index}" @click="handleClick(index,$event)">
					<span class="text">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="content-wrapper" ref="contentWrapper">
			<ul class="goods-wrapper">
				<li v-for="(item,index) in goods" class="food-list" ref="foodList" :key="index">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="(food,index) in item.foods" :key="index" class="food-item border-bottom">
							<div class="img-icon">
								<img :src="food.icon" alt="">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="sell-count">月售{{food.sellCount}}</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span>￥{{food.price}}</span>
									<span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
								</div>
								<div class="cart-button-wrapper">
									<cart-button :food="food" @add="addCart"></cart-button>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shop-cart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selected-foods="selectedFoods" ref="shopCart"></shop-cart>
	</div>
</template>
<script>
	import fetch from "../../api/fetch.js";
	import BScroll from "better-scroll";
	import ShopCart from "../../components/ShopCart";
	import CartButton from "../../components/CartButton";
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				goods: [],
				classMap: ["decrease", "discount", "special", "guarantee", "invoice"],
				heightList: [],
				scrollY: 0
			};
		},
		components: {
			ShopCart,
			CartButton
		},
		created() {
			fetch("goods").then(res => {
				this.goods = JSON.parse(JSON.stringify(res.data));
				this.$nextTick(() => {
					this.initScroll();
					this.getHeight();
				});
			});
		},
		computed: {
			currentIndex() {
				for (let i = 0; i < this.heightList.length; i++) {
					let height1 = this.heightList[i];
					let height2 = this.heightList[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
			selectedFoods() {
				let foods = [];
				this.goods.forEach(item => {
					item.foods.forEach(food => {
						if (food.count > 0) {
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		methods: {
			initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				});
				this.foodsScroll = new BScroll(this.$refs.contentWrapper, {
					probeType: 3,
					click: true
				});
				this.foodsScroll.on("scroll", pos => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			getHeight() {
				let foodList = this.$refs.foodList;
				let height = 0;
				this.heightList.push(height);
				for (let i = 0; i < foodList.length; i++) {
					height += foodList[i].clientHeight;
					this.heightList.push(height);
				}
			},
			handleClick(index) {
				let el = this.$refs.foodList[index];
				this.foodsScroll.scrollToElement(el, 300);
			},
			addCart(target) {
				this.$nextTick(() => {
					this.$refs.shopCart.drop(target);
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import "../../assets/css/mixin.scss";
	.goods {
		position: absolute;
		display: flex;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
		.menu-wrapper {
			width: 80px;
			background: #f3f5f7;
			.menu {
				display: flex;
				flex-direction: column;
				align-items: center;
				.menu-item {
					height: 54px;
					padding: 0 12px;
					text-align: center;
					box-sizing: border-box;
					width: 100%;
					display: table;
					cursor: pointer;
					&.current {
						background: #fff;
						.text {
							font-size: 12px;
							color: rgb(240, 20, 20);
							font-weight: bold;
							line-height: 14px;
						}
					}

					.text {
						font-size: 12px;
						color: rgb(147, 153, 159);
						font-weight: 200;
						line-height: 12px;
						display: table-cell;
						vertical-align: middle;
						.icon {
							display: inline-block;
							vertical-align: middle;
							width: 12px;
							height: 12px;
							margin-right: 4px;
							background-size: 12px 12px;
							background-repeat: no-repeat;
							&.decrease {
								@include bg-image("decrease_3");
							}
							&.discount {
								@include bg-image("discount_3");
							}
							&.guarantee {
								@include bg-image("guarantee_3");
							}
							&.invoice {
								@include bg-image("invoice_3");
							}
							&.special {
								@include bg-image("special_3");
							}
						}
					}
				}
			}
		}
		.content-wrapper {
			flex: 1;
			.goods-wrapper {
				.food-list {
					.title {
						padding-left: 14px;
						height: 26px;
						line-height: 26px;
						border-left: 2px solid #d9dde1;
						font-size: 12px;
						color: rgb(147, 153, 159);
						background: #f3f5f7;
					}
				}
				.food-item {
					padding: 18px 0;
					margin: 0 18px;
					display: flex;
					flex-direction: row;
					position: relative;
					.img-icon {
						margin-right: 10px;
						& > img {
							width: 57px;
							height: 57px;
						}
					}
					.content {
						.name {
							font-size: 14px;
							color: rgb(7, 17, 27);
							line-height: 14px;
							margin-top: 2px;
						}
						.desc {
							font-size: 10px;
							color: rgb(147, 153, 159);
							line-height: 12px;
							margin: 8px 0;
						}
						.extra {
							font-size: 10px;
							color: rgb(147, 153, 159);
							line-height: 12px;
							margin: 8px 0;
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
						.cart-button-wrapper {
							position: absolute;
							right: 0;
							bottom: 18px;
						}
					}
				}
			}
		}
	}
</style>
