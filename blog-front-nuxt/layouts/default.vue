<template>
    <div>
        <p-header />
        <nuxt />
    </div>
</template>

<script>
import pHeader from '~/components/p-header.vue'

export default {
  components: { pHeader }
}
</script>

<style>
@import '~/assets/scss/app.scss';
</style>
