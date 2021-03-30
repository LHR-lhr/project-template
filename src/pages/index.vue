<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src
import { QuickSort } from '@/utils/helper.js'
export default {
  name: 'Home',
  components: {
  },
  created () {
    const arr = [2, 343, 56, 234, -1, 0, 8, 35, 324]
    const a = QuickSort(arr)
    console.log(a)
  }
}
</script>

<style lang="scss" scoped>
</style>
