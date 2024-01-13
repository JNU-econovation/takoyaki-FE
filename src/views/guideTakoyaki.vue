<template>
  <div>
    <v-container>
      <h1>Welcome to Takoyaki!!</h1>
      <h2>타코야끼 가이드</h2>
      <button @click="printLog">
        click me
      </button>
    </v-container>
  </div>
</template>

<script>
export default {
  methods:{
    printLog() {
      /* eslint-disable */console.log(...oo_oo(`4162970002_15_6_15_51_4`,process.env.VUE_APP_TAKOYAKI_API));
    }
  }
}
</script>

<style>

</style>