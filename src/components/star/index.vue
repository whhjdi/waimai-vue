<template>
  <div class="star" :class="starType">
    <span v-for="(item,index) in itemList" :class="item" :key="index"></span>
  </div>
</template>

<script>
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
      default:5,
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
        result.push(score)
      }
      if(hasDecimal){
        result.push()
      }
      while(result.length<5){
        result.push
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
  @import url("../../assets/css/mixin.scss");
  .star {
  	.star-item {
  		display: inline-block;
  		background-repeat: no-repeat;
  	}
  	&.star-48 {
  		.star-item {
  			width: 20px;
  			height: 20px;
  			margin-right: 22px;
  			background-size: 20px 20px;
  			&:last-child {
  				margin-right: 0;
  			}
  			&.on {
  				@include bg-image("star48-on");
  			}
  			&.half {
  				@include bg-image("star48-half");
  			}
  			&.off {
  				@include bg-image("star48-off");
  			}
  		}
  	}
  	&.star-36 {
  		.star-item {
  			width: 15px;
  			height: 15px;
  			margin-right: 16px;
  			background-size: 15px 15px;
  			&:last-child {
  				margin-right: 0;
  			}
  			&.on {
  				@include bg-image("star36-on");
  			}
  			&.half {
  				@include bg-image("star36-half");
  			}
  			&.off {
  				@include bg-image("star36-off");
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
  				@include bg-image("star24-on");
  			}
  			&.half {
  				@include bg-image("star24-half");
  			}
  			&.off {
  				@include bg-image("star24-off");
  			}
  		}
  	}
  }
</style>
