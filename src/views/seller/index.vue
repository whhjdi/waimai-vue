<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="info border-bottom">
        <h1 class="title">{{seller.name}}</h1>
        <div class="star-wrapper">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.sellCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="list-wrapper border-top">
          <li class="list border-right">
            <h2>起送价</h2>
            <div class="content">
              <span class="price">{{seller.minPrice}}</span>
              <span class="small">元</span>
            </div>
          </li>
          <li class="list border-right">
            <h2>商家配送</h2>
            <div class="content">
              <span class="price">{{seller.deliveryPrice}}</span>
              <span class="small">元</span>
            </div>
          </li>
          <li class="list">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="price">{{seller.deliveryTime}}</span>
              <span class="small">分钟</span>
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <svg class="icon" aria-hidden="true" :class="{active:favorite}">
            <use xlink:href="#icon-favorite"></use>
          </svg>
          <div class="text">
            {{favoriteText}}
          </div>
        </div>
      </div>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-bottom">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="support-list">
          <li class="support-item border-bottom" v-for="(item,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <div class="seller-view">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul ref="picList">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" alt="" style="height:90px;width:120px">
            </li>
          </ul>
        </div>
      </div>
      <div class="desc">
        <h1 class="title">商家信息</h1>
        <ul class="desc-wrapper">
          <li v-for="(info,index) in seller.infos" class="desc-item border-top" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import Star from "../../components/star";
  import BScroll from "better-scroll";
  export default {
  	props: {
  		seller: {
  			type: Object
  		}
  	},
  	data() {
  		return {
  			favorite: false,
  			classMap: ["decrease", "discount", "special", "guarantee", "invoice"]
  		};
  	},
  	computed: {
  		favoriteText() {
  			return this.favorite ? "已收藏" : "收 藏";
  		}
  	},
  	components: {
  		Star
  	},
  	created() {
  		this.$store.commit("loadFromLocal", {
  			id: this.seller.id,
  			key: "favorite",
  			value: this.favorite
  		});
  		this.favorite = this.$store.state.sellerFavorite;
  	},
  	mounted() {
  		this.$nextTick(() => {
        this.initSeller()
        this.initPics()
  		});
  	},
  	methods: {
      initSeller(){
        if (!this.sellerScroll) {
  				this.sellerScroll = new BScroll(this.$refs.seller, {
  					click: true
  				});
  			} else {
  				this.sellerScroll.refresh();
  			}
      },
  		initPics() {
  			let picWidth = 120;
  			let margin = 6;
  			let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + "px"
        this.$nextTick(()=>{
          if (!this.picScroll) {
  				this.picScroll = new BScroll(this.$refs.picWrapper, {
            scrollX: true,
            click: true,
            eventPassthrough: 'vertical'
  				});
  				console.log(2);
  			} else {
  				this.picScroll.refresh();
  			}
        })
  		},
  		toggleFavorite() {
  			this.favorite = !this.favorite;
  			this.$store.commit("saveToLocal", {
  				id: this.seller.id,
  				key: "favorite",
  				value: this.favorite
  			});
  		}
  	}
  };
</script>
<style lang="scss" scoped>
  @import "../../assets/css/mixin.scss";
  .seller {
  	position: absolute;
  	top: 174px;
  	left: 0;
  	bottom: 0;
  	overflow: hidden;
  	width: 100%;
  	background: #f3f5f7;
  	.seller-content {
  		.info {
  			background: #fff;
  			padding: 18px;
  			margin-bottom: 18px;
  			position: relative;
  			.title {
  				font-size: 14px;
  				color: rgb(7, 17, 27);
  				line-height: 14px;
  				margin-bottom: 8px;
  			}
  			.star-wrapper {
  				margin-bottom: 18px;
  				font-size: 0;
  				color: rgb(77, 85, 93);
  				line-height: 18px;
  				.star {
  					vertical-align: top;
  					margin-right: 8px;
  					display: inline-block;
  				}
  				.text {
  					vertical-align: top;
  					margin-right: 12px;
  					font-size: 10px;
  				}
  			}
  			.list-wrapper {
  				display: flex;
  				padding: 18px;
  				.list {
  					flex: 1;
  					text-align: center;
  					h2 {
  						font-size: 10px;
  						color: rgb(147, 153, 159);
  						line-height: 10px;
  						margin-bottom: 4px;
  					}
  					.price {
  						font-size: 24px;
  						color: rgb(7, 17, 27);
  						line-height: 24px;
  						font-weight: 200;
  					}
  					.small {
  						font-size: 10px;
  						color: rgb(7, 17, 27);
  						line-height: 18px;
  					}
  				}
  			}
  			.favorite {
  				position: absolute;
  				right: 10px;
  				top: 18px;
  				text-align: center;
  				width: 50px;
  				.icon {
  					margin-bottom: 4px;
  					font-size: 24px;
  					line-height: 24px;
  					color: rgb(77, 85, 93);
  					&.active {
  						color: rgb(240, 20, 20);
  					}
  				}
  				.text {
  					font-size: 10px;
  					line-height: 10px;
  					color: rgb(77, 85, 93);
  				}
  			}
  		}
  		.bulletin {
  			padding: 18px 18px 0 18px;
  			background: #fff;
  			margin-bottom: 16px;
  			.title {
  				font-size: 14px;
  				color: rgb(7, 17, 27);
  				line-height: 14px;
  				margin-bottom: 8px;
  			}
  			.content {
  				font-size: 12px;
  				font-weight: 200;
  				color: rgb(240, 20, 20);
  				line-height: 24px;
  				padding: 0 12px 16px 12px;
  			}
  			.support-list {
  				.support-item {
  					padding: 16px 12px;
  					font-size: 0;
  					font-weight: 200;
  					color: rgb(7, 17, 27);
  					line-height: 16px;
  					.icon {
  						display: inline-block;
  						vertical-align: top;
  						width: 16px;
  						height: 16px;
  						margin-right: 6px;
  						background-size: 16px 16px;
  						background-repeat: no-repeat;
  						&.decrease {
  							@include bg-image("decrease_4");
  						}
  						&.discount {
  							@include bg-image("discount_4");
  						}
  						&.guarantee {
  							@include bg-image("guarantee_4");
  						}
  						&.invoice {
  							@include bg-image("invoice_4");
  						}
  						&.special {
  							@include bg-image("special_4");
  						}
  					}
  					.text {
  						font-size: 12px;
  					}
  				}
  			}
  		}
  		.seller-view {
  			padding: 18px;
  			background: #fff;
  			margin-bottom: 16px;
  			.title {
  				font-size: 14px;
  				color: rgb(7, 17, 27);
  				line-height: 14px;
  				margin-bottom: 12px;
  			}
  			.pic-wrapper {
  				width: 100%;
  				overflow: hidden;
  				white-space: nowrap;
  				font-size: 0;
  				.pic-item {
  					display: inline-block;
  					margin-right: 6px;
  				}
  			}
  		}
  		.desc {
  			padding: 18px;
  			background: #fff;
  			.title {
  				font-size: 14px;
  				color: rgb(7, 17, 27);
  				line-height: 14px;
  				margin-bottom: 12px;
  			}
  			.desc-wrapper {
  				font-size: 0;
  				.desc-item {
  					padding: 16px 12px;
  					font-size: 12px;
  					color: rgb(7, 17, 27);
  					line-height: 16px;
  					font-weight: 200;
  				}
  			}
  		}
  	}
  }
</style>
