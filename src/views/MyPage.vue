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
                    v-for="(n,k) in routerMypage"
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
              <h1>나의 정보</h1>
              <br><br><h4>회원 정보 수정</h4>
              <br>닉네임
              <br><v-card>
                <v-card-title>
                  타끼
                  <v-spacer />
                  <v-btn>수정</v-btn>
                </v-card-title>
              </v-card>   
              <br><h4>회원 정보</h4>   
              <br><p>연결된 계정</p>

              <p>
                <v-container>
                  <!-- 첫 번째 행 -->
                  <v-row>
                    <v-col>
                      이름
                      <v-card>
                        <!-- 카드 내용예시 -->
                        <v-card-title>김타코</v-card-title>
                      </v-card>
                    </v-col>
                    <v-col>
                      이메일
                      <v-card>
                        <v-card-title>takoyaki@gmail.com</v-card-title>
                      </v-card>
                    </v-col>
                  </v-row>

                  <!-- 두 번째 행 -->
                  <v-row>
                    <v-col>
                      전화번호
                      <v-card>
                        <v-card-title>010-1234-5678</v-card-title>
                      </v-card>
                    </v-col>
                    <v-col>
                      성별
                      <v-card>
                        <v-card-title>여성</v-card-title>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
export default {
  data(){
    return{
      mypage:['나의 정보','내가 연팟','내가 참여한 팟'],
      routerMypage:['my-information','written-party','participated-party']
    }
  }
}
</script>

<style scoped>
.listItem {
  width: 150px;
}
.elevation-12 {
  width:170px;
  
}
.mypage-card {
  padding-top: 50px;
}
.MyPageBG {
  padding-left:150px;
  padding-top:50px;
}

</style>