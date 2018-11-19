<template>
  <div class="shop-cart">
    <div class="wrapper">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shopping_cart"></use>
            </svg>
          </div>
        </div>
        <div class="price border-right">
          ￥0元
        </div>
        <div class="desc">另需配送费4元</div>
      </div>
      <div class="content-right">2</div>
    </div>
  </div>
</template>
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
  					.icon {
  						color: #80858a;
  						font-size: 24px;
              line-height: 44px;
              padding:10px 0;
  					}
  				}
  			}
  			.price {
          display: inline-block;
          vertical-align: top;
          box-sizing: border-box;
          line-height: 24px;
          margin-top:12px;
          padding-right:12px;
          color:rgba(255,255,255,0.4);
          font-size: 16px;
          &.border-right{
            border-width: 102px;
            border-color:rgba(255,255,255,0.4)
          }
  			}
  			.desc {
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin:12px;
          font-size: 10px;
          color:rgba(255,255,255,0.4);
  			}
  		}
  		.content-right {
  			flex: 0 0 105px;
  			width: 105px;
  		}
  	}
  }
</style>
