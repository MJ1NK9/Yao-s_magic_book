<template>
  <view class="page">
    <view v-if="orders.length === 0" class="empty">
      <u-empty mode="order" text="还没有订单" icon-size="140" />
      <text class="empty__tip">下单后会显示在这里</text>
    </view>

    <view v-else class="list">
      <view v-for="order in orders" :key="order.id" class="order">
        <view class="order__head">
          <text class="order__no">{{ order.id }}</text>
          <text class="order__time">{{ order.createdAt }}</text>
        </view>
        <view v-for="item in order.items" :key="item.id" class="order__row">
          <text class="order__name">{{ item.name }}</text>
          <text class="order__count">x{{ item.count }}</text>
        </view>
        <view class="order__foot">
          <text class="order__label">合计</text>
          <text class="order__price">¥{{ order.totalPrice }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { ordersState } from '@/store/orders.js'

export default {
  computed: {
    orders() {
      return ordersState.list
    }
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
  padding-top: 180rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty__tip {
  margin-top: 12rpx;
  font-size: 24rpx;
  color: #b8bcc4;
}

.order {
  padding: 24rpx;
  margin-bottom: 20rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
}

.order__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #ebedf0;
}

.order__no {
  font-size: 28rpx;
  font-weight: bold;
  color: #1f2329;
}

.order__time {
  font-size: 24rpx;
  color: #8a8f99;
}

.order__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16rpx;
}

.order__name {
  font-size: 28rpx;
  color: #4e5969;
}

.order__count {
  font-size: 26rpx;
  color: #8a8f99;
}

.order__foot {
  margin-top: 20rpx;
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
}

.order__label {
  font-size: 26rpx;
  color: #8a8f99;
}

.order__price {
  margin-left: 12rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #ff6b35;
}
</style>
