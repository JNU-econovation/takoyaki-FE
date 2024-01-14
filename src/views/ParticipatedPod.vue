<template>
  <v-app id="inspire">
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
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
              width="700px"
              class="MyPageBG"
            >
              <!--화면 상단 부분-->
              <v-row>
                <v-col>
                  <h1>내가 신청한 팟</h1>
                  <br>
                  <v-row>
                    <v-btn
                      class="me-3"
                      @click="waiting"
                    >
                      대기중
                    </v-btn>
                    <v-btn @click="accepted">
                      수락
                    </v-btn>
                    <!--대기중누르면 누른표시나게 색깔을 다르게 한다거나 추가해야함-->
                  </v-row>
                </v-col> 
              </v-row>
              <v-row>
                <v-col 
                  v-for="item in list"
                  :key="item.party_id"
                  cols="12"
                  class="me-7"
                  offset-sm=""
                >
                  <!--키로 각각 모든 카드 리스트의 id를 가져옴 -->
                  <router-link :to="{ name: 'userCategorize', params: { party_id: item.party_id } }">
                    <BasicCard :party_id="item.party_id" />
                  <!--받은 키로 BasicCard에 props-->
                  </router-link>
                </v-col>
              </v-row>
              <!--화면의 중앙에 구분선-->
              <v-row align="center">
                <v-col>
                  <v-divider class="my-3 divideLine" />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h1>마감+수락된 팟(연락처가 공개되었어요!)</h1>
                </v-col>
              </v-row>

              <v-row>
                <v-col 
                  v-for="closedItem in closedList"
                  :key="closedItem.party_id"
                  cols="12"
                  class="me-7"
                  offset-sm=""
                >
                  <!--키로 각각 모든 카드 리스트의 id를 가져옴 -->
                  <router-link :to="{ name: 'userCategorize', params: { party_id: closedItem.party_id } }">
                    <JoinedCard :party_id="closedItem.party_id" />
                    <!--받은 키로 BasicCard에 props-->
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
import JoinedCard from '@/components/CardList/JoinedCard.vue';
import BasicCard from '@/components/CardList/BasicCard.vue';
export default {
  components: {
    'JoinedCard':JoinedCard,
    'BasicCard':BasicCard,
  },
  data() {
    return {
      mypage: ['나의 정보', '내가 연팟', '내가 참여한 팟'],
      routerMypage: ['my-information', 'written-party', 'participated-party'],
      list:[],
      closedList:[],
    }
  },
  created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties?type=not_closed_waiting&number=3&page=1')
      .then((response) => {
        /* eslint-disable */console.log(...oo_oo(`2121293739_117_8_117_29_4`,response));
        this.list = response.data.data;
      })
      .catch((error) => {
        /* eslint-disable */console.log(...oo_oo(`2121293739_121_8_121_26_4`,error));
      }),
      this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties?type=closed&number=3&page=1')
        .then((response) => {
          /* eslint-disable */console.log(...oo_oo(`2121293739_125_10_125_31_4`,response));
          this.closedList = response.data.data;
        })
        .catch((error) => {
          /* eslint-disable */console.log(...oo_oo(`2121293739_129_10_129_28_4`,error));
        })
      },
  methods: {
    waiting() {
      this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties?type=not_closed_waiting&number=3&page=1')
        .then((response) => {
          /* eslint-disable */console.log(...oo_oo(`2121293739_136_10_136_31_4`,response));
          this.list=response.data.data;
        })
        .catch((error) => {
          /* eslint-disable */console.log(...oo_oo(`2121293739_140_10_140_28_4`,error));
        })
    },
    accepted() {
      this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties?type=not_closed_accepted&number=3&page=1')
        .then((response) => {
          /* eslint-disable */console.log(...oo_oo(`2121293739_146_10_146_31_4`,response));
          this.list = response.data.data;
        })
        .catch((error) => {
          /* eslint-disable */console.log(...oo_oo(`2121293739_150_10_150_28_4`,error));
        })
    }
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
  width:100%;
  
}
</style>