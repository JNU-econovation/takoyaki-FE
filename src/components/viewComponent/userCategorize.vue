<template>
  <div>
    <TakoView
      v-if="user_type === 'TAKO'"
      :party_id="party_id"
    />
    <YakiView
      v-else-if="user_type === 'YAKI'"
      :party_id="party_id"
    />
    <OtherView
      v-else-if="user_type =='OTHER'"
      :party_id="party_id"
    />
    <loginFalse
      v-else
      :party_id="party_id"
    />
  </div>
</template>

<script>
import TakoView from './TakoView.vue'
import YakiView from './YakiView.vue'
import OtherView from './OtherView.vue'
import loginFalse from './loginFalse.vue'

export default {
  
  components: {
    'TakoView': TakoView,
    'YakiView': YakiView,
    'OtherView': OtherView,
    'loginFalse': loginFalse,
  },
  props:['party_id'],

  data() {
    return{
    user_type:'',
    }
  },

  created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "?login=true")
      .then((response) => {
        /* eslint-disable */console.log(...oo_oo(`2463455312_35_8_35_29_4`,response))
        this.user_type = response.data.data.user_type;
      })
      .catch((error) => {
        /* eslint-disable */console.log(...oo_oo(`2463455312_39_8_39_26_4`,error));
      })
  }
}

</script>

<style>

</style>