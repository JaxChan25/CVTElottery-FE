<template>
  <div id="app">
    <navigation>
      <router-view></router-view>
    </navigation>
  </div>
</template>

<script>
//import {mapActions} from 'vuex'
export default {
    components: {
         
  },
    
}
</script>>

<style>
#app {
  min-height: 100%;
  background: #f5f5f5
}

.slide-right-enter-active {
  transition: 0.3s all ease;
}

.slide-right-enter {
  opacity: 1;
  transform: translateX(100%);
}
</style>