<template>
	<div class="rating-select">
		<div class="rating-type border-bottom">
			<span class="block positive"
						:class="{active:selectType===2}"
			      @click="select(2)"
			>{{desc.all}} <span class="count">{{ratings.length}}</span></span>
			<span class="block positive"
			      :class="{active:selectType===0}"
			      @click="select(0)"
			>{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span class="block negative"
			      :class="{active:selectType===1}"
			      @click="select(1)"
			>{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div class="rating-switch border-bottom"
		:class="{on:onlyContent}">
			<span class="icon-wrapper" @click="toggleContent">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-check_circle"></use>
				</svg>
			</span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  name: "index",
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL,
      validate(val) {
        return [ALL, POSITIVE, NEGATIVE].indexOf(val) >= 0;
      }
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
	computed:{
  	positives(){
		  return this.ratings.filter((item)=>{
			  return item.rateType===POSITIVE
		  })
	  },
		negatives(){
			return this.ratings.filter((item)=>{
				return item.rateType===NEGATIVE
			})
		},
	},
	methods:{
		select(type){
			this.$emit('changeSelectType',type)
		},
		toggleContent(){
			this.$emit('contentToggle')
		}
	}
};
</script>

<style lang="scss" scoped>
.rating-select {
  .rating-type {
    margin-top: 6px;
    padding-top: 18px;
    padding-bottom: 18px;
    .block {
      font-size: 12px;
      background: #02a0dc;
      line-height: 16px;
      margin-right: 8px;
      padding: 8px 12px;
      border-radius: 2px;
      color: rgb(77, 85, 93);
      &.positive {
        background: #ccecf8;
        &.active {
          background: #4ba5dc;
          color: #fff;
        }
      }
      &.negative {
        background: #e9ebec;
        &.active {
          background: rgb(77, 85, 93);
          color: #fff;
        }
      }

      .count {
        font-size: 8px;
        margin-left: 2px;
        line-height: 16px;
      }
    }
  }
	.rating-switch{
		padding: 12px 0;
		line-height: 24px;
		color: rgb(147,153,159);
		font-size: 0;
		&.on{
			.icon-wrapper{
				color:#03A45E
			}
		}
		.icon-wrapper{
			font-size: 24px;
			margin-right:4px;
			display: inline-block;
			vertical-align: top;
		}
		.text{
			font-size: 12px;
			display: inline-block;
			vertical-align: top;
		}
	}
}
</style>
