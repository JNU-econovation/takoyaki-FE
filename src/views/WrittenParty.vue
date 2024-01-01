<template>
  <v-app id="inspire">
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg" class="mypage-card">
              <v-card class="elevation-12" max-width="500px">
                <v-list rounded="lg">
                  <v-list-item v-for="n in mypage" :key="n" :to="`/mypage/${n}`" class="litstItem"><!--라우터연결-->

                    <v-list-item-content>
                      <v-list-item-title>{{ n }}</v-list-item-title>
                    </v-list-item-content></v-list-item>
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
      mypage: ['나의정보', '내가 연팟', '내가 참여한 팟'],
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
  padding-top: 100px;

}
</style>