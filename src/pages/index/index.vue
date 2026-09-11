<template>
  <view class="page">
    <scroll-view class="cate" scroll-y>
      <view
        v-for="cate in categories"
        :key="cate.id"
        class="cate__item"
        :class="{ 'cate__item--active': cate.id === activeCategory }"
        @click="activeCategory = cate.id"
      >
        {{ cate.name }}
      </view>
    </scroll-view>

    <scroll-view class="menu" scroll-y>
      <view class="menu__title">{{ activeCategoryName }}</view>
      <DishCard v-for="dish in currentDishes" :key="dish.id" :dish="dish" @add="add" />
    </scroll-view>

    <view v-if="totalCount > 0" class="bar" @click="goCart">
      <view class="bar__count">{{ totalCount }}</view>
      <text class="bar__price">♥{{ totalPrice }}</text>
      <text class="bar__action">去结算</text>
    </view>
  </view>
</template>

<script>
import DishCard from '@/components/DishCard.vue'
import { categories, getDishesByCategory } from '@/mock/dishes.js'
import { addToCart, getCartTotalCount, getCartTotalPrice } from '@/store/cart.js'

export default {
  components: { DishCard },
  data() {
    return {
      categories,
      activeCategory: categories[0].id
    }
  },
  computed: {
    currentDishes() {
      return getDishesByCategory(this.activeCategory)
    },
    activeCategoryName() {
      const hit = categories.find((item) => item.id === this.activeCategory)
      return hit ? hit.name : ''
    },
    totalCount() {
      return getCartTotalCount()
    },
    totalPrice() {
      return getCartTotalPrice()
    }
  },
  methods: {
    add(dish) {
      addToCart(dish)
    },
    goCart() {
      uni.switchTab({ url: '/pages/cart/cart' })
    }
  }
}
</script>

<style>
.page {
  display: flex;
  flex-direction: row;
  height: 100vh;
  box-sizing: border-box;
}

.cate {
  width: 180rpx;
  height: 100%;
  background-color: #f0f1f3;
}

.cate__item {
  padding: 32rpx 20rpx;
  font-size: 26rpx;
  color: #4e5969;
}

.cate__item--active {
  background-color: #ffffff;
  color: #ff6b35;
  font-weight: bold;
}

.menu {
  flex: 1;
  height: 100%;
  padding: 20rpx 20rpx 160rpx;
  box-sizing: border-box;
}

.menu__title {
  margin-bottom: 20rpx;
  font-size: 26rpx;
  color: #8a8f99;
}

.bar {
  position: fixed;
  left: 24rpx;
  right: 24rpx;
  bottom: calc(24rpx + var(--window-bottom, 0px));
  height: 96rpx;
  display: flex;
  align-items: center;
  padding: 0 32rpx;
  background-color: #1f2329;
  border-radius: 48rpx;
}

.bar__count {
  min-width: 40rpx;
  height: 40rpx;
  line-height: 40rpx;
  padding: 0 8rpx;
  text-align: center;
  font-size: 24rpx;
  color: #1f2329;
  background-color: #ff6b35;
  border-radius: 20rpx;
}

.bar__price {
  flex: 1;
  margin-left: 20rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #ffffff;
}

.bar__action {
  font-size: 28rpx;
  color: #ff6b35;
}
</style>
