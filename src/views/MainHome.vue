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
        <v-container>
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
              <v-btn @click="applyBtn">적용</v-btn>
            </v-col>
          </v-row>

          <v-container v-if="clickApplyBtn">
            <v-row >
                <v-col 
                  v-for="item in list"
                  :key="item.party_id"
                  cols="12"
                  class="me-7"
                  offset-sm=""
                  > <!--키로 각각 모든 카드 리스트의 id를 가져옴 -->
                  <router-link :to="{name:'cardListDetail', params:{party_id: item.party_id}}">
                <BasicCard :party_id="item.party_id" />
                <!--받은 키로 BasicCard에 props-->
              </router-link>
              </v-col>
            </v-row>
          </v-container>

          <v-container v-else>
              <v-row >
                  <v-col 
                    v-for="item in applyList"
                    :key="item.party_id"
                    cols="12"
                    class="me-7"
                    offset-sm=""
                    > <!--키로 각각 모든 카드 리스트의 id를 가져옴 -->
                  <BasicCard :party_id="item.party_id" />
                  <!--받은 키로 BasicCard에 props-->
                </v-col>
              </v-row>
            </v-container>

        </v-container>
      </v-sheet>
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
    applyList:[],
    party_id:'',
    clickApplyBtn:true,
  }
},
  created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + "parties?type=all&login=true&number=16&page_number=1")
      .then((response) => {
        console.log(response);
        this.list=response.data.data; //팟 정보의 객체를 받아옴 
        /* this.title = response.data.data[0].title;
        this.closingDate = response.data.data[0].planned_closing_date;
        this.category = response.data.data[0].category;
        this.area = response.data.data[0].activity_location;
        this.competitionRate = response.data.data[0].competition_rate; */

      })
      .catch((error) => {
        console.log(error);
      })
  },


  
  methods: {
    clickCategory: function () {
      this.$axios.get(process.env.VUE_APP_TAKOYAKI_API+'party/category', {
      })
        .then((response) => {
          this.category = response.data.data.category;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    clickArea: function () {
      this.$axios.get(process.env.VUE_APP_TAKOYAKI_API+'party/activity-location', {
      })
        .then((response) => {
          this.area = response.data.data.activity_location;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    applyBtn() {
      this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + "parties?type=all&login=true&number=16&page_number=1&category="+this.selectCategory+"&activity_location="+this.selectArea)
        .then((response) => {
          this.clickApplyBtn=false;
          this.applyList=response.data.data; //해당 팟 카드리스트 받음
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