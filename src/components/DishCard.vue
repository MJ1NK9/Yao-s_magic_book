<template>
  <view class="dish-card">
    <image class="dish-card__pic" :src="image" mode="aspectFill" />
    <view class="dish-card__body">
      <view class="dish-card__head">
        <text class="dish-card__name">{{ dish.name }}</text>
        <text v-if="dish.tag" class="dish-card__tag">{{ dish.tag }}</text>
      </view>
      <text class="dish-card__desc">{{ dish.desc }}</text>
      <view class="dish-card__foot">
        <text class="dish-card__price">♥{{ dish.price }}</text>
        <view class="dish-card__add" @click="onAdd">+</view>
      </view>
    </view>
  </view>
</template>

<script>
import { DEFAULT_DISH_IMAGE } from '@/mock/dishes.js'

export default {
  name: 'DishCard',
  props: {
    dish: {
      type: Object,
      required: true
    }
  },
  computed: {
    image() {
      return this.dish.image || DEFAULT_DISH_IMAGE
    }
  },
  methods: {
    onAdd() {
      this.$emit('add', this.dish)
    }
  }
}
</script>

<style>
.dish-card {
  display: flex;
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
}

.dish-card__pic {
  flex-shrink: 0;
  width: 160rpx;
  height: 160rpx;
  margin-right: 20rpx;
  border-radius: 12rpx;
  background-color: #f0f1f3;
}

.dish-card__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.dish-card__head {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.dish-card__name {
  font-size: 30rpx;
  font-weight: bold;
  color: #1f2329;
  white-space: nowrap;
}

.dish-card__tag {
  margin-left: 12rpx;
  flex-shrink: 0;
  padding: 2rpx 10rpx;
  font-size: 20rpx;
  color: #ff6b35;
  border: 1rpx solid #ff6b35;
  border-radius: 6rpx;
}

.dish-card__desc {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #8a8f99;
}

.dish-card__foot {
  margin-top: auto;
  padding-top: 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dish-card__price {
  font-size: 32rpx;
  font-weight: bold;
  color: #ff6b35;
}

.dish-card__add {
  width: 52rpx;
  height: 52rpx;
  line-height: 48rpx;
  text-align: center;
  font-size: 36rpx;
  color: #ffffff;
  background-color: #ff6b35;
  border-radius: 50%;
}
</style>
