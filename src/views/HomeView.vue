<template>
  <div>
    <HomeViewDefine/>
    <HomeViewInfo/>
  </div>
</template>

<script>
import HomeViewInfo from '@/components/HomeViewInfo.vue';
import HomeViewDefine from '@/components/HomeViewDefine.vue';

export default {
  name: 'HomeView',
  components: {
    HomeViewDefine,
    HomeViewInfo
  }
}
</script>

<style>
/* Add any necessary styling here */
</style>
