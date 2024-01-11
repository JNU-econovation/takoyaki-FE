<template>
  <v-app id="inspire">
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg" class="mypage-card">
              <v-card class="elevation-12" max-width="500px">
                <v-list rounded="lg">
                  <v-list-item v-for="(n, k) in routerMypage" :key="k" :to="`/mypage/${n}`" class="litstItem"><!--라우터연결-->
                  
                      <v-list-item-content >
                        <v-list-item-title>{{ mypage[k] }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                </v-list>
              </v-card>
            </v-sheet>
          </v-col>
        <v-col>
          <v-sheet min-height="70vh" rounded="lg" width="700px" class="card">
            <!--화면 상단 부분-->
            <v-row>
              <v-col>
                <h1>내가 신청한 팟</h1>
                <br>
                <v-row>
                    <v-btn class="me-3">대기중</v-btn>
                    <v-btn>수락</v-btn>
                </v-row>
                
              </v-col>
            </v-row>

            <!--화면의 중앙에 구분선-->
            <v-row align="center">
              <v-col>
                <v-divider class="my-3 divideLine"></v-divider>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <h1>마감+수락된 팟(연락처가 공개되었어요!)</h1>
              </v-col>
            </v-row>
            <JoinedCard></JoinedCard>
          </v-sheet>
        </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import JoinedCard from '@/components/CardList/JoinedCard.vue';
export default {
  components: {
    'JoinedCard':JoinedCard
  },
  data() {
    return {
      mypage: ['나의 정보', '내가 연팟', '내가 참여한 팟'],
      routerMypage: ['my-information', 'written-party', 'participated-party']
    }
  }
}
</script>

<style scoped>
.litstItem {
  width: 150px;
}

.elevation-12 {
  width: 170px;

}

.mypage-card {
  padding-top: 50px;
}

.card {
  padding-left: 200px;
  padding-top: 50px;
}
.divideLine {
  width:100%;
  
}
</style>