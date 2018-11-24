<template>
  <div class="star" :class="starType">
    <span v-for="(item,index) in itemList" :class="item" :key="index" class="star-item"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const STAR_ON = 'on'
const STAR_HALF = 'half'
const STAR_OFF= 'off'
export default {
  props:{
    size:{
      type:Number,
      default: 24,
      validator(val){
        return [24,36,48].indexOf(val)>=0
      }
    },
    score:{
      type:Number,
      default:0,
    }
  },
  computed:{
    starType(){
      return 'star-' +this.size
    },
    itemList() {
      let result = []
      let score = Math.floor(this.score*2)/2;
      let hasDecimal = score % 1 !=0;
      let integer = Math.floor(score)
      for(let i =0;i<integer;i++){
        result.push(STAR_ON)
      }
      if(hasDecimal){
        result.push(STAR_HALF)
      }
      while(result.length<LENGTH){
        result.push(STAR_OFF)
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
	@import "../../assets/css/mixin.scss";
  .star {
  	.star-item {
  		display: inline-block;
  		background-repeat: no-repeat;
  	}
  	&.star-48 {
  		.star-item {
  			width: 20px;
  			height: 20px;
  			margin-right: 11px;
  			background-size: 20px 20px;
  			&:last-child {
  				margin-right: 0;
  			}
  			&.on {
  				@include bg-image("star48_on");
  			}
  			&.half {
  				@include bg-image("star48_half");
  			}
  			&.off {
  				@include bg-image("star48_off");
  			}
  		}
  	}
  	&.star-36 {
  		.star-item {
  			width: 15px;
  			height: 15px;
  			margin-right: 6px;
  			background-size: 15px 15px;
  			&:last-child {
  				margin-right: 0;
  			}
  			&.on {
  				@include bg-image("star36_on");
  			}
  			&.half {
  				@include bg-image("star36_half");
  			}
  			&.off {
  				@include bg-image("star36_off");
  			}
  		}
  	}
  	&.star-24 {
  		.star-item {
  			width: 10px;
  			height: 10px;
  			margin-right: 3px;
  			background-size: 10px 10px;
  			&:last-child {
  				margin-right: 0;
  			}
  			&.on {
  				@include bg-image("star24_on");
  			}
  			&.half {
  				@include bg-image("star24_half");
  			}
  			&.off {
  				@include bg-image("star24_off");
  			}
  		}
  	}
  }
</style>
