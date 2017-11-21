<template>
<div>
  <Count></Count>
  <List></List>
  <router-view></router-view>
</div>
</template>
<script>
import Count from '@/components/Common/Count'
import List from '@/components/Common/List'
export default {
  name: 'DashBoard',
  components: {
    Count,
    List
  }
}
</script>
<style lang="scss" scoped>

</style>
