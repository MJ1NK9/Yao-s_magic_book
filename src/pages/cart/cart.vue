<template>
  <view class="page">
    <view v-if="items.length === 0" class="empty">
      <text class="empty__text">购物车还是空的</text>
      <view class="empty__btn" @click="goMenu">去点餐</view>
    </view>

    <block v-else>
      <view class="list">
        <view v-for="item in items" :key="item.id" class="row">
          <view class="row__info">
            <text class="row__name">{{ item.name }}</text>
            <text class="row__unit">¥{{ item.price }}</text>
          </view>
          <view class="row__ops">
            <view class="row__op" @click="minus(item.id)">-</view>
            <text class="row__count">{{ item.count }}</text>
            <view class="row__op row__op--add" @click="add(item)">+</view>
          </view>
        </view>
      </view>

      <view class="footer">
        <view class="footer__total">
          <text class="footer__label">合计</text>
          <text class="footer__price">¥{{ totalPrice }}</text>
        </view>
        <view class="footer__btn" @click="submit">提交订单</view>
      </view>
    </block>
  </view>
</template>

<script>
import { useCart } from '@/store/cart.js'
import { useOrders } from '@/store/orders.js'

export default {
  setup() {
    const { items, totalPrice, add, minus, clear } = useCart()
    const { create } = useOrders()

    function goMenu() {
      uni.switchTab({ url: '/pages/index/index' })
    }

    function submit() {
      if (items.value.length === 0) return
      create(items.value, totalPrice.value)
      clear()
      uni.showToast({ title: '下单成功', icon: 'success' })
      setTimeout(() => {
        uni.switchTab({ url: '/pages/order/order' })
      }, 600)
    }

    return { items, totalPrice, add, minus, goMenu, submit }
  }
}
</script>

<style>
.page {
  min-height: 100vh;
  padding: 24rpx;
  box-sizing: border-box;
}

.empty {
  padding-top: 240rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty__text {
  font-size: 28rpx;
  color: #8a8f99;
}

.empty__btn {
  margin-top: 32rpx;
  padding: 16rpx 48rpx;
  font-size: 28rpx;
  color: #ffffff;
  background-color: #ff6b35;
  border-radius: 40rpx;
}

.list {
  padding-bottom: 160rpx;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 24rpx;
  margin-bottom: 16rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
}

.row__name {
  font-size: 30rpx;
  color: #1f2329;
}

.row__unit {
  margin-left: 16rpx;
  font-size: 24rpx;
  color: #8a8f99;
}

.row__ops {
  display: flex;
  align-items: center;
}

.row__op {
  width: 48rpx;
  height: 48rpx;
  line-height: 44rpx;
  text-align: center;
  font-size: 32rpx;
  color: #ff6b35;
  border: 1rpx solid #ff6b35;
  border-radius: 50%;
}

.row__op--add {
  color: #ffffff;
  background-color: #ff6b35;
}

.row__count {
  min-width: 56rpx;
  text-align: center;
  font-size: 28rpx;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 112rpx;
  display: flex;
  align-items: center;
  padding: 0 32rpx;
  background-color: #ffffff;
  border-top: 1rpx solid #ebedf0;
}

.footer__total {
  flex: 1;
  display: flex;
  align-items: baseline;
}

.footer__label {
  font-size: 26rpx;
  color: #8a8f99;
}

.footer__price {
  margin-left: 12rpx;
  font-size: 36rpx;
  font-weight: bold;
  color: #ff6b35;
}

.footer__btn {
  padding: 20rpx 56rpx;
  font-size: 30rpx;
  color: #ffffff;
  background-color: #ff6b35;
  border-radius: 48rpx;
}
</style>