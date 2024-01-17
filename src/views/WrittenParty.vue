<template>
  <v-app id="inspire">
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="1">
            <v-sheet
              rounded="lg"
              class="mypage-card"
            >
              <v-card
                class="elevation-12"
                max-width="500px"
              >
                <v-list rounded="lg">
                  <v-list-item
                    v-for="(n, k) in routerMypage"
                    :key="k"
                    :to="`/mypage/${n}`"
                    class="listItem"
                  >
                    <!--라우터연결-->
                  
                    <v-list-item-content>
                      <v-list-item-title>{{ mypage[k] }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
              width="1500px"
              class="MyPageBG"
            >
              <v-col>
                <h1>작성 목록</h1>
              </v-col>
              <v-row>
                <v-col
                  v-for="item in written_list"
                  :key="item.party_id"
                  cols="3"
                  style="padding: 30px;"
                >
                  <router-link :to="{name:'userCategorize', params:{party_id:item.party_id}}">
                    <BasicCard :party_id="item.party_id" />
                  </router-link>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import BasicCard from '@/components/CardList/BasicCard.vue';
export default {
  components:{
    'BasicCard': BasicCard
  },
  data() {
    return {
      mypage: ['나의 정보', '내가 연팟', '내가 참여한 팟'],
      routerMypage: ['my-information', 'written-party', 'participated-party'],
      written_list:[],
    }
  },
  created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties?type=wrote&number=6&page=1')
      .then((response) => {
        /* eslint-disable */console.log(...oo_oo(`3929895578_74_8_74_29_4`,response));
        this.written_list=response.data.data;
      })
      .catch((error) => {
        /* eslint-disable */console.log(...oo_oo(`3929895578_78_8_78_26_4`,error));
      })
  }
}
</script>

<style scoped>
.listItem {
  width: 150px;
}

.elevation-12 {
  width: 170px;

}

.mypage-card {
  padding-top: 50px;
}

.MyPageBG {
  padding-left: 150px;
  padding-top: 50px;
}

.divideLine {
  padding-top: 100px;

}
</style>