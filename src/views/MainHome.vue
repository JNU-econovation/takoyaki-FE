<template>
  <v-main>
    <router-link to="/banner">
      <BannerComponent></BannerComponent>
    </router-link>
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
              @click="clickCategory"
              label="카테고리"
              :items=category
              v-model="selectCategory">
              </v-select>
            </v-col>
            <v-col>
              <v-select
              @click="clickArea"
                label="활동지역"
                :items=area
                v-model="selectArea">
              </v-select>
            </v-col>
            <v-col style="padding-top: 26px;">
              <v-btn>적용</v-btn>
            </v-col>
          </v-row>
          {{ list }}

          <v-col cols="12" sm="8">
            <v-row>
              <v-sheet 
                v-for="item in list"
                :key="item.id">

              </v-sheet>
            </v-row>
          </v-col>
          <BasicCard></BasicCard>

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
import BasicCard from '@/components/CardList/BasicCard.vue';
import BannerComponent from '../components/BannerComponent.vue';

export default {
  components:{
  'BannerComponent':BannerComponent,
  'BasicCard':BasicCard,
  },
  
data(){
  return{
    category:[],
    area:[],
    selectCategory:'',
    selectArea:'',
    list:[],
  }
},
  created() {
    this.$axios.get(this.$takoyaki_API+"parties/all")
    .then((response) => {
      this.list=response.data.data.card_list;
    })
    .catch((error)=>{
      console.log(error);
    })
    },
  
  methods: {
    clickCategory: function () {
      this.$axios.get(this.$takoyaki_API+'party/category', {
      })
        .then((response) => {
          this.category = response.data.data.category;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    clickArea: function () {
      this.$axios.get(this.$takoyaki_API+'party/activity-location', {
      })
        .then((response) => {
          this.area = response.data.data.activity_location;
        })
        .catch((error) => {
          console.log(error);
        })
    },
  },
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