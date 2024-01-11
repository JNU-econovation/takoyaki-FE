<template>
  <v-app id="inspire">
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg" class="mypage-card">
              <v-card class="elevation-12" max-width="500px">
                <v-list rounded="lg">

                   <v-list-item v-for="(n, k) in routerMypage" :key="k" :to="`/mypage/${n}`" class="listItem"><!--라우터연결-->
                  
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
              <v-col>
                <h1>작성 목록</h1>
              </v-col>

              
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      mypage: ['나의 정보', '내가 연팟', '내가 참여한 팟'],
      routerMypage: ['my-information', 'written-party', 'participated-party']
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

.card {
  padding-left: 200px;
  padding-top: 50px;
}

.divideLine {
  padding-top: 100px;

}
</style>