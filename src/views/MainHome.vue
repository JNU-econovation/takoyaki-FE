<template>
  <v-main>
    <BannerComponent></BannerComponent>
    <v-sheet class="mx-auto pa-2 pt-6" color="grey-lighten-2">
            <v-sheet color="grey" height="24" rounded="pill" width="145" style="padding-left: 10px;">내가 관심있는 팟</v-sheet>
            <v-slide-group show-arrows> <!--여러개의 슬라이드 아이템을 가지고 있는 그룹을 생성할때-->
              <v-slide-group-item v-for="n in 8" :key="n">
                <v-sheet class="ma-3" color="grey-lighten-1" height="200" rounded width="250" ></v-sheet>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
          
    <v-sheet class="mx-auto pa-2 pt-6" color="grey-lighten-2">
      <v-sheet color="grey" height="24" rounded="pill" width="75" style="padding-left: 10px;">모든 팟</v-sheet>

      <v-sheet class="selectBtn">
        <v-contain >
          <v-row>
            <v-col>
              <v-select
              label="카테고리"
              :items=category
              variant="Tonal">
              </v-select>
            </v-col>
            <v-col>
              <v-select
                label="활동지역"
                :items=area
                variant="Tonal">
              </v-select>
            </v-col>
            <v-col style="padding-top: 26px;">
              <v-btn>적용</v-btn>
            </v-col>
          </v-row>
        </v-contain>
      </v-sheet>

      <!--card 
        <v-container fluid>
            <v-row>
              <v-col
                v-for="n in 24"
                :key="n"
                cols="3"
              >
                <v-card class="rounded-card" width="100%" height="300">
                  <v-toolbar color=""
                  height="150">
                    <v-toolbar-title>title</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn size="small" color="surface-variant" variant="text">
                      <v-icon>mdi-bookmark</v-icon>
                    </v-btn>
                  </v-toolbar>
                
                </v-card>
              </v-col>
            </v-row>
            

          </v-container>-->

          <!--페이지네이션-->
          <v-row class="fixed bottom py-4">
            <v-col>
              <v-pagination :length="9"></v-pagination>
            </v-col>
          </v-row>

    </v-sheet>
  </v-main>
</template>

<script>
import BannerComponent from '../components/BannerComponent.vue';

export default {
  components:{
  'BannerComponent':BannerComponent,
  },
  
data(){
  return{
    category:['대외활동', '취업/스터디', 'OTT', '습관챌린지', '게임', '소모임', '기타'],
    area:['전국', '온라인', '수도권', '강원', '충청', '전라', '경상', '제주']
  }
}
}
  
</script>

<style scoped>
.rounded-card {
  border-radius:40px;
}
#dropdown {
  max-width:500px;  
}
.selectBtn {
  padding-top: 15px;
  padding-left: 10px;
  max-width: 450px;
}
</style>