<template>
  <div class="rating" ref="rating">
    <div class="ratings-content">
      <div class="desc-wrapper">
        <div class="rating-left border-right">
          <h1 class="score">{{seller.score}}111</h1>
          <p class="title">综合评分</p>
          <div class="rank"> 高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="rating-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">食品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="content">
        <rating-select :select-type="selectType" 
        :desc="desc" :ratings="ratings" :only-content="onlyContent" @changeSelectType="changeSelectType" @contentToggle="contentToggle"></rating-select>

        <div class="content-wrapper">
          <ul>
            <li v-for="(rating,index) in ratings" v-show="showList(rating.rateType,rating.text)" :key="index" class="rating-list border-bottom">
              <div class="avatar">
                <img :src="rating.avatar" alt="">
              </div>
              <div class="content-list">
                <div class="name">{{rating.username}}</div>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend&&rating.recommend.length">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-thumb_up"></use>
                  </svg>
                  <span v-for="(item,index) in rating.recommend" :key="index" class="recommend-content">
                    {{item}}
                  </span>
                </div>
              </div>
              <div class="rate-time">
                {{rating.rateTime | filterDate}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import RatingSelect from "../../components/RatingSelect";
  import Star from "../../components/star";
  import fetch from "../../api/fetch.js";
  import BScroll from "better-scroll";
  import { formatDate } from "../../assets/date";
  const ALL = 2;
  export default {
  	name: "ratings",
  	components: {
  		RatingSelect,
  		Star
  	},
  	props: {
  		seller: {
  			type: Object
  		}
  	},
  	data() {
  		return {
  			ratings: [],
  			selectType: ALL,
  			onlyContent: true,
  			desc: {
  				all: "全部",
  				positive: "满意",
  				negative: "吐槽"
  			}
  		};
  	},
  	methods: {
  		contentToggle() {
  			this.onlyContent = !this.onlyContent;
  		},
  		changeSelectType(type) {
  			this.selectType = type;
  		},
  		showList(type, text) {
  			if (this.onlyContent && !text) {
  				return false;
  			}
  			if (this.selectType === ALL) {
  				return true;
  			} else {
  				return type === this.selectType;
  			}
  		}
  	},
  	created() {
  		this.selectType = ALL;
  		this.onlyContent = true;
  		fetch("ratings").then(res => {
  			this.ratings = res.data;
  			this.$nextTick(() => {
  				if (!this.ratingScroll) {
  					this.ratingScroll = new BScroll(this.$refs.rating, {
  						click: true
  					});
  				} else {
  					this.ratingScroll.refresh();
  				}
  			});
  		});
  	},
  	filters: {
  		filterDate(time) {
  			let date = new Date(time);
  			return formatDate(date, "yyyy-MM-dd hh:mm");
  		}
  	}
  };
</script>
<style lang="scss" scoped>
  .rating {
  	position: absolute;
  	top: 174px;
  	left: 0;
  	bottom: 0;
  	overflow: hidden;
  	background: #f3f5f7;
  	.ratings-content {
  		.desc-wrapper {
  			display: flex;
  			padding: 18px 0;
  			margin-bottom: 18px;
  			background: #fff;
  			.rating-left {
  				width: 137px;
  				flex: 0 0 137px;
  				text-align: center;
  				padding-top: 6px;
  				@media screen and(max-width:320px) {
  					width: 120px;
  					flex: 0 0 120px;
  				}
  				.score {
  					font-size: 24px;
  					line-height: 28px;
  					color: rgb(255, 153, 0);
  					margin-bottom: 6px;
  				}
  				.title {
  					font-size: 12px;
  					line-height: 12px;
  					color: rgb(7, 17, 27);
  					margin-bottom: 8px;
  				}
  				.rank {
  					font-size: 10px;
  					line-height: 12px;
  					color: rgb(147, 153, 159);
  				}
  			}
  			.rating-right {
  				padding: 6px 24px 0 24px;
  				flex: 1;
  				@media screen and(max-width:320px) {
  					padding-left: 6px;
  				}
  				.score-wrapper {
  					margin-bottom: 8px;
  					font-size: 0;
  					.title {
  						font-size: 12px;
  						color: rgb(7, 17, 27);
  						margin-right: 12px;
  						line-height: 18px;
  					}
  					.star {
  						display: inline-block;
  						margin-right: 12px;
  						vertical-align: top;
  						line-height: 18px;
  					}
  					.score {
  						font-size: 12px;
  						color: rgb(255, 153, 0);
  						line-height: 18px;
  					}
  					.delivery-time {
  						font-size: 12px;
  						color: rgb(147, 153, 159);
  						line-height: 18px;
  					}
  				}
  			}
  		}
  		.content {
  			padding: 0 18px;
  			background: #fff;
  			.content-wrapper {
  				.rating-list {
  					padding: 18px 0;
  					display: flex;
  					position: relative;
  					.avatar {
  						margin-right: 12px;
  						img {
  							border-radius: 50%;
  							width: 28px;
  							height: 28px;
  						}
  					}
  					.content-list {
  						.name {
  							font-size: 10px;
  							color: rgb(7, 17, 27);
  							line-height: 12px;
  							margin-bottom: 4px;
  						}
  						.star-wrapper {
  							margin-bottom: 6px;
  							.star {
  								display: inline-block;
  								margin-right: 6px;
  							}
  							.delivery {
  								font-size: 10px;
  								color: rgb(147, 153, 159);
  								line-height: 12px;
  							}
  						}
  						.text {
  							font-size: 12px;
  							color: rgb(7, 17, 27);
  							line-height: 18px;
  							margin-bottom: 8px;
  						}
  						.recommend {
  							font-size: 0;

  							.icon {
  								color: rgb(0, 160, 220);
  								font-size: 12px;
  								line-height: 16px;
  								margin-right: 8px;
  							}
  							.recommend-content {
  								display: inline-block;
  								font-size: 9px;
  								color: rgb(147, 153, 159);
  								line-height: 16px;
  								border: 1px solid rgba(7, 17, 27, 0.1);
  								padding: 0 6px;
  								margin-right: 8px;
  								margin-bottom: 6px;
  							}
  						}
  					}
  					.rate-time {
  						position: absolute;
  						top: 18px;
  						right: 18px;
  						line-height: 12px;
  						font-size: 10px;
  						color: rgb(147, 153, 159);
  					}
  				}
  			}
  		}
  	}
  }
</style>
