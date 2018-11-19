<template>
	<div class="header-bar">
		<div class="top-bar">
			<div class="content-wrapper">
				<div class="avatar">
					<img :src="seller.avatar" alt="">
				</div>
				<div class="content">
					<div class="title">
						<span class="brand"></span>
						<span class="name">{{seller.name}}</span>
					</div>
					<div class="desc">
						{{seller.description}} / {{seller.deliveryTime}}分钟送达
					</div>
					<div class="supports" v-if="seller.supports">
						<span class="icon" :class="classMap[seller.supports[iconIndex].type]"></span>
						<span class="text">{{seller.supports[iconIndex].description}}</span>
					</div>
				</div>
				<div class="support-count" v-if="seller.supports" @click="showDetail=true">
					<span class="count">{{seller.supports.length}}个</span>
					<svg class="icon arrow" aria-hidden="true">
						<use xlink:href="#icon-keyboard_arrow_right"></use>
					</svg>
				</div>
			</div>
			<div class="bottom-wrapper" @click="showDetail=true">
				<span class="title"></span><span class="text">{{seller.bulletin}}</span>
				<svg class="icon arrow" aria-hidden="true">
					<use xlink:href="#icon-keyboard_arrow_right"></use>
				</svg>
			</div>
			<div class="background">
				<img :src="seller.avatar" alt="">
			</div>
			<transition name="fade">
				<div class="detail" v-show="showDetail">
					<div class="detail-wrapper clearfix">
						<div class="detail-content">
							<h1 class="title">{{seller.name}}</h1>
							<div class="star-wrapper">
								<Star :size="48" :score="seller.score"></Star>
							</div>
							<div class="name-title">
								<div class="line"></div>
								<div class="text">优惠信息</div>
								<div class="line"></div>
							</div>
							<ul v-if="seller.supports" class="support-list">
								<li class="support-item" v-for="(item,index) in seller.supports" :key="index">
									<span class="icon" :class="classMap[seller.supports[index].type]"></span>
									<span class="text">{{seller.supports[index].description}}</span>
								</li>
							</ul>
							<div class="name-title">
								<div class="line"></div>
								<div class="text">商家公告</div>
								<div class="line"></div>
							</div>
							<div class="bulletin">
								<p class="content">
									{{seller.bulletin}}
								</p>
							</div>
						</div>
					</div>
					<div class="detail-close clearfix" @click="showDetail=false">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-close"></use>
						</svg>
					</div>

				</div>
			</transition>
		</div>
	</div>
</template>
<script>
import Star from '../star'
	export default {
	  props: {
	    seller: {
	      type: Object
	    }
	  },
	  data() {
	    return {
				classMap: ["decrease", "discount", "special", "guarantee", "invoice"],
				showDetail:false
	    };
		},
		components:{
			Star
		},
	  computed: {
	    iconIndex() {
	      let index = Math.floor(Math.random() * 10);
	      console.log(index);
	      if (index >= 0 && index <= 4) {
	        return index;
	      }
	      return index - 5;
	    }
	  }
	};
</script>
<style lang="scss" scoped>
	@import "../../assets/css/mixin.scss";
	.header-bar {
		color: #fff;
		background-color: rgba(7, 17, 27, 0.5);
		overflow: hidden;
		.top-bar {
			position: relative;
			.content-wrapper {
				padding: 24px 12px 18px 24px;
				position: relative;
				.avatar {
					display: inline-block;
					vertical-align: top;
					img {
						width: 64px;
						border-radius: 4px;
					}
				}
				.content {
					display: inline-block;
					margin-left: 16px;
					font-size: 14px;
					.title {
						margin: 2px 0 8px 0;
						.brand {
							vertical-align: top;
							display: inline-block;
							width: 30px;
							height: 18px;
							background-size: 30px 18px;
							background-repeat: no-repeat;
							@include bg-image("brand");
						}
						.name {
							margin-left: 6px;
							font-size: 16px;
							font-weight: bold;
							line-height: 18px;
						}
					}
					.desc {
						margin-bottom: 10px;
						font-size: 12px;
					}
					.supports {
						max-width: 185px;
						.icon {
							display: inline-block;
							vertical-align: top;
							width: 12px;
							height: 12px;
							margin-right: 4px;
							background-color: #000;
							background-size: 12px 12px;
							background-repeat: no-repeat;
							&.decrease {
								@include bg-image("decrease_1");
							}
							&.discount {
								@include bg-image("discount_1");
							}
							&.guarantee {
								@include bg-image("guarantee_1");
							}
							&.invoice {
								@include bg-image("invoice_1");
							}
							&.special {
								@include bg-image("special_1");
							}
						}
						.text {
							line-height: 12px;
							font-size: 10px;
						}
					}
				}
				.support-count {
					cursor: pointer;
					position: absolute;
					right: 12px;
					bottom: 14px;
					padding: 0 8px;
					height: 24px;
					line-height: 24px;
					border-radius: 14px;
					background: rgba(0, 0, 0, 0.2);
					text-align: center;
					.count {
						font-size: 10px;
					}
					.arrow {
						font-size: 10px;
						line-height: 24px;
						margin-left: 2px;
					}
				}
			}
			.bottom-wrapper {
				height: 28px;
				line-height: 28px;
				padding: 0 22px 0 12px;
				background-color: rgba(7, 17, 27, 0.2);
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				position: relative;
				.title {
					display: inline-block;
					width: 22px;
					height: 12px;
					background-size: 22px 12px;
					background-repeat: no-repeat;
					@include bg-image("bulletin");
					vertical-align: top;
					margin-top: 8px;
				}
				.text {
					margin: 0 4px;
					font-size: 10px;
				}
				.arrow {
					position: absolute;
					right: 12px;
					top: 8px;
					font-size: 10px;
				}
			}
			.background {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: -1;
				img {
					width: 100%;
					height: 100%;
					filter: blur(10px);
				}
			}
			.detail {
				position: fixed;
				z-index: 9999;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				background: rgba(7, 17, 27, 0.8);
				backdrop-filter: blur(10px);
				overflow: auto;
				text-align: center;
				.detail-wrapper {
					min-height: 100%;
					.detail-content {
						padding-top: 64px;
						padding-bottom: 64px;
						width: 100%;
						.title {
							font-size: 16px;
							line-height: 16px;
							font-weight: 700px;
						}
						.star-wrapper {
							margin-top: 18px;
							padding: 2px 0;
						}
						.name-title {
							display: flex;
							justify-content: center;
							align-items: center;
							margin: 28px 36px 24px 36px;
							.line {
								flex: 1;
								border-bottom: 1px solid rgba(255, 255, 255, 0.2);
							}
							.text {
								margin: 0 12px;
								font-size: 14px;
								font-weight: 800;
							}
						}
						.support-list {
							width: 80%;
							margin: 0 auto;
							.support-item {
								padding: 0 12px;
								margin-bottom: 12px;
								text-align: left;
								&:last-child {
									margin-bottom: 0;
								}
								.icon {
									display: inline-block;
									vertical-align: top;
									width: 16px;
									height: 16px;
									margin-right: 6px;
									background-color: #000;
									background-size: 16px 16px;
									background-repeat: no-repeat;
									&.decrease {
										@include bg-image("decrease_2");
									}
									&.discount {
										@include bg-image("discount_2");
									}
									&.guarantee {
										@include bg-image("guarantee_2");
									}
									&.invoice {
										@include bg-image("invoice_2");
									}
									&.special {
										@include bg-image("special_2");
									}
								}
							}
						}
						.bulletin {
							width: 80%;
							margin: 0 auto;
							padding: 24px 12px 0 12px;
							.content {
								text-align: left;
								font-size: 12px;
								font-weight: 200;
								line-height: 24px;
							}
						}
					}
				}
				.detail-close {
					position: relative;
					width: 32px;
					height: 32px;
					margin: -64px auto 0 auto;
					font-size: 32px;
				}
			}
		}
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
		background: rgba(7, 17, 27, 0);
	}
</style>
