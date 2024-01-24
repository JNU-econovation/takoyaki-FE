<template>
  <v-app id="inspire">
    <v-container>
      <v-row>
        <MyPage />
        <v-col>
          <v-sheet
            min-height="70vh"
            rounded="lg"
            width="1200px"
            class="MyPageBG"
          >
           
              <h1>작성 목록</h1>
         
            <v-row>
              <v-col
                v-for="item in written_list"
                :key="item.party_id"
                cols="3"
                style="padding: 30px;"
              >
                <router-link :to="{name:'userCategorize', params:{party_id:item.party_id}}">
                  <BasicCard
                    :party_id="item.party_id"
                    :competition_rate="item.competition_rate"
                    :title="item.title"
                    :category="item.category"
                    :activity_location="item.activity_location"
                    :planned_closing_date="item.planned_closing_date"
                    :closed_date="item.closed_date"
                    :occupation_rate="item.occupation_rate"
                  />
                </router-link>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row class="fixed bottom py-4">
        <v-col>
          <!--페이지네이션-->
          <v-pagination
            v-model="page"
            rounded="circle"
            :length="total_pages"
            @input="handlePage"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>


<script>
import BasicCard from '@/components/CardList/BasicCard.vue';
import MyPage from './MyPage';
export default {
  components:{
    'BasicCard': BasicCard,
    'MyPage':MyPage
  },
  data() {
    return {
      mypage: ['나의 정보', '내가 연 팟', '내가 참여한 팟'],
      routerMypage: ['my-information', 'written-party', 'participated-party'],
      written_list:[],
    }
  },
  created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/wrote?number=8&page_number=1')
      .then((response) => {
        console.log(response)
        this.written_list=response.data.data.card_list;
        this.closed_date=response.data.data.closed_date;
        this.occupation_rate=response.data.data.occupation_rate;
        this.total_pages=response.data.meta.total_pages;
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods:{
    handlePage() {
      this.$axios
        .get(
          process.env.VUE_APP_TAKOYAKI_API +
            "parties/wrote?number=8&page_number=" +
            this.page
        )
        .then((response) => {
          console.log(response);
          this.written_list = response.data.data.card_list; //팟 정보의 객체를 받아옴
        })
        .catch((error) => {
          console.log(error);
        });
    },
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