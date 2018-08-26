<template>
<div>
  <NavBar></NavBar>
  <RightKeyNav></RightKeyNav>
  <Category></Category>
  <Src></Src>
  <router-view></router-view>
  <!-- <FooterBar></FooterBar> -->
  <User></User>
</div>
</template>
<script>
import RightKeyNav from '@/components/Common/RightKeyNav'
import Category from '@/components/Common/Category'
import Source from '@/components/Common/Source'
import Nav from '@/components/Common/Nav'
import Footer from '@/components/Common/Footer'
import User from '@/components/Common/User'
export default {
  name: 'Index',
  components: {
    NavBar: Nav,
    Src: Source,
    FooterBar: Footer,
    RightKeyNav,
    Category,
    User
  }
}
</script>
<style lang="scss" scoped>

</style>
