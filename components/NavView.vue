<template>
  <nav class="nav-view">
    <ul class="nav-view__nav">
      <nuxt-link
        v-for="(item, index) in links"
        v-show="item.isVisible !== undefined ? item.isVisible : true"
        :key="index"
        :to="item.to"
        exact tag="li"
        class="nav-view__nav-item"
        active-class="nav-view__nav-item--active"
      >
        {{item.name}}
      </nuxt-link>
    </ul>
  </nav>
</template>

<script>
  export default {

    props: {
      links: {
        required: true
      },
    },
  }
</script>

<style scoped lang="scss">


</style>