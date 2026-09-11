<script>
export default {
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/* uView 的全局样式，必须放在最前面 */
@import 'uview-ui/index.scss';

page {
  background-color: #f5f6f8;
  color: #1f2329;
  font-size: 28rpx;
}
</style>
