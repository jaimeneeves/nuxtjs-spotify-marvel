<template>
  <div>
    <SelectServer/>
  </div>
</template>

<script>
import SelectServer from '~/components/SelectServer.vue'

export default {
  components: { SelectServer },
  computed: {
    isConnected() {
      return this.$store.state.isConnected
    }
  }
}
</script>
