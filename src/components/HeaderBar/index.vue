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
        <div class="support-count" v-if="seller.supports">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="buttom-wrapper"></div>
    </div>
    <div class="tab border-bottom">
      <router-link to="/goods" class="tab-item">
        商品
      </router-link>
      <router-link to="/ratings" class="tab-item">
        评价
      </router-link>
      <router-link to="/seller" class="tab-item">
        商家
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        classMap: ["decrease", "discount", "special", "guarantee", "invoice"]
      };
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
    background: #666;
    .top-bar {
      .content-wrapper {
        padding: 24px 12px 18px 24px;
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
          position: relative;
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
          .support-count {
            position: absolute;
            right: 12px;
            bottom: 18px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            background: rgba(0, 0, 0, 0.2);
            text-align: center;
            .count {
              font-size: 10px;
            }
            .icon-keyboard_arrow_right {
              font-size: 10px;
            }
          }
        }
      }
    }
    .tab {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      .tab-item {
        text-align: center;
        flex: 1;
        color: rgb(77, 85, 93);
        &.router-link-active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
</style>
