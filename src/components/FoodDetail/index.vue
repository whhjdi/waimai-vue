<template>
	<transition name="show-detail">
		<div class="food" ref="detail" v-show="showDetail">
			<div class="food-detail">
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
				<div class="info" v-show="food.info">
					<h1 class="title">商品介绍</h1>
					<p class="desc">{{food.info}}</p>
				</div>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<rating-select :select-type="selectType" :desc="desc" :ratings="food.ratings" :only-content="onlyContent" @changeSelectType="changeSelectType" @contentToggle="contentToggle"></rating-select>
					<ul v-show="food.ratings&&food.ratings.length" class="rating-wrapper">
						<li v-for="(rating,index) in food.ratings"
						    :key="index"
						    class="rating-list border-bottom"
								v-show="showList(rating.rateType,rating.text)"
						>
							<div class="time">{{rating.rateTime|filterDate}}</div>
							<p class="text-wrapper">
								<svg class="icon" aria-hidden="true"
								:class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'">
									<use :xlink:href="rating.rateType===0?'#icon-thumb_up':'#icon-thumb_down'"></use>
								</svg>
								<span class="text">{{rating.text}}<span v-show="!rating.text">用户暂无评价</span></span>
							</p>
							<div class="user">
								<span class="username">{{rating.username}}</span>
								<img :src="rating.avatar" alt="" class="avatar">
							</div>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
import CartButton from "../../components/CartButton";
import RatingSelect from "../../components/RatingSelect";
import BScroll from "better-scroll";
import {formatDate} from '../../assets/date'
import Vue from "vue";
const ALL = 2;
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
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "满意",
        negative: "吐槽"
      }
    };
  },
  components: {
    CartButton,
    RatingSelect
  },
  created() {
    this.showFlag = true;
    this.selectType = ALL;
    this.onlyContent = true;
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
      this.$emit("add", target);
    },
    changeSelectType(type) {
      this.selectType = type;
      this.$nextTick(()=>{
	      this.detailScroll.refresh();
      })
    },
    contentToggle() {
      this.onlyContent = !this.onlyContent;
	    this.$nextTick(()=>{
		    this.detailScroll.refresh();
	    })
    },
	  showList(type,text){
    	if(this.onlyContent&&!text){
    		return false
	    }
	    if(this.selectType === ALL){
	    	return true
	    }else{
	    	return type===this.selectType
	    }
	  }
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
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 99;
  width: 100%;
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
  .info {
    color: #000;
    background: #fff;
    padding: 18px;
    margin-top: 16px;
    .title {
      font-size: 14px;
    }
    .desc {
      margin-top: 6px;
      font-size: 12px;
      font-weight: 200;
      color: rgb(77, 85, 93);
      line-height: 24px;
    }
  }
  .rating {
    color: #000;
    background: #fff;
    padding: 18px;
    margin-top: 16px;
	  margin-bottom: 48px;
    .rating-wrapper {
      .rating-list {
        padding: 16px 0;
        position: relative;
        .time {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 12px;
        }
        .text-wrapper {
          margin-top: 6px;
          .icon {
            font-size: 12px;
            color: rgb(147, 153, 159);
            line-height: 12px;
            margin-right: 4px;
            &.icon-thumb_up {
              color: rgb(0, 160, 220);
            }
            &.icon-thumb_down {
              color: rgb(147, 153, 159);
            }
          }
          .text {
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 16px;
          }
        }
        .user {
          position: absolute;
          right: 0;
          top: 16px;
          line-height: 12px;
          .username {
            margin-right: 6px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .avatar {
            width: 12px;
            height: 12px;
          }
        }
      }
    }
	  .no-rating{
		  padding:16px 0;
		  font-size: 12px;
		  color: rgb(147,153,159);
	  }
  }
}

.show-detail-enter-active,
.show-detail-leave-active {
  transition: all 0.5s;
}

.show-detail-enter, .show-detail-leave-to /* .fade-leave-active below version 2.1.8 */
		 {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
		 {
  opacity: 0;
}
</style>
