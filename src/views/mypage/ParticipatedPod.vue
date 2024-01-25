<template>
  <div>
    <v-container style="margin-right: 600px;">
      <v-row>
        <MyPage />
        <v-col style="margin-right: 375px;">
          <v-sheet
            style="padding-left:200px; padding-right: -50px;"
            min-height="70vh"
            rounded="lg"
            width="1200px"
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
                  <v-col class="text-right">
                    <v-btn
                      class="icon"
                      @click="showBackFour"
                    >
                      <i class="fa-solid fa-arrow-left" />
                    </v-btn>
                    <!--버튼 모양 좀더 이쁘게 만들어 주세요-->
                    <v-btn
                      class="icon"
                      @click="showNextFour"
                    >
                      <i class="fa-solid fa-arrow-right" />
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                v-for="(item) in visibleItem" 
                :key="item.party_id"
                cols="3"
                style="padding: 30px;"
              >
                <!--키로 각각 모든 카드 리스트의 id를 가져옴 -->
                <router-link :to="{ name: 'userCategorize', params: { party_id: item.party_id } }">
                  <BasicCard
                    :party_id="item.party_id"
                    :competition_rate="item.competition_rate"
                    :title="item.title"
                    :category="item.category"
                    :activity_location="item.activity_location"
                    :planned_closing_date="item.planned_closing_date"
                    :occupation_rate="item.occupation_rate"
                    :waiting_number="item.waiting_number"
                  />
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
            <v-col class="text-right">
              <v-btn
                class="icon"
            
                @click="showBack2Four"
              >
                <i class="fa-solid fa-arrow-left" />
              </v-btn>
              <!--버튼 모양 좀더 이쁘게 만들어 주세요-->
              <v-btn
                class="icon"
                @click="showNext2Four"
              >
                <i class="fa-solid fa-arrow-right" />
              </v-btn>
            </v-col>
            <v-row>
              <v-col
                v-for="(closedItem) in visibleItem2"
                :key="closedItem.party_id"
                cols="3"
                style="padding: 30px;"
              >
                <router-link :to="{ name: 'userCategorize', params: { party_id: closedItem.party_id } }">
                  <JoinedCard
                    :party_id="closedItem.party_id"
                    :competition_rate="closedItem.competition_rate"
                    :title="closedItem.title"
                    :category="closedItem.category"
                    :activity_location="closedItem.activity_location"
                    :planned_closing_date="closedItem.planned_closing_date"
                  />
                </router-link>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import JoinedCard from '@/components/CardList/JoinedCard.vue';
import BasicCard from '@/components/CardList/BasicCard.vue';
import MyPage from './MyPage.vue';

export default {
  components: {
    'JoinedCard': JoinedCard,
    'BasicCard': BasicCard,
    'MyPage':MyPage
},
  data() {
    return {
      mypage: ['나의 정보', '내가 연팟', '내가 참여한 팟'],
      routerMypage: ['my-information', 'written-party', 'participated-party'],
      list:[],
      closedList:[],
      itemsPerPage:4, 
      currentPage:1,
      current2Page:1,
      waiting_number:null,
    }
  },
      computed: {
        visibleItem(){
          const starIndex=(this.currentPage-1)*this.itemsPerPage;
          const endIndex= starIndex+this.itemsPerPage;
          return this.list.slice(starIndex,endIndex); 
        },
        visibleItem2(){
          const starIndex=(this.current2Page-1)*this.itemsPerPage;
          const endIndex= starIndex+this.itemsPerPage;
          return this.closedList.slice(starIndex,endIndex); 
        },
    },
  created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/not-closed-waiting?number=4000&page_number=1')
      .then((response) => {
        console.log(response)
        this.list = response.data.data.card_list;
        this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/closed?number=4000&page_number=1')
          .then((response) => {
            console.log(response)
            this.closedList = response.data.data.card_list;
          })
          .catch((error) => {
            console.log(error)
            switch(error.response.data.code) {
            case "UNAUTHORIZED":
              alert("로그인이 필요합니다.");
              break;
            case "USER_NOT_FOUND":
              alert("사용자를 찾을 수 없습니다.")
              break;
            }
            history.back();
          })
      })
      .catch((error) => {
        console.log(error)
        switch(error.response.data.code) {
          case "UNAUTHORIZED":
            alert("로그인이 필요합니다.");
            break;
          case "USER_NOT_FOUND":
            alert("사용자를 찾을 수 없습니다.")
            break;
          }
          history.back();
      })
  
  },
  methods: {
    waiting() {
      this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/not-closed-waiting?number=4000&page_number=1')
        .then((response) => {
          console.log(response)
          this.list=response.data.data.card_list;
        })
        .catch((error) => {
          console.log(error)
          switch(error.response.data.code) {
          case "UNAUTHORIZED":
            alert("로그인이 필요합니다.");
            break;
          case "USER_NOT_FOUND":
            alert("사용자를 찾을 수 없습니다.")
            break;
          }
        })
    },
    accepted() {
      this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/not-closed-accepted?number=4000&page_number=1')
        .then((response) => {
          console.log(response)
          this.list = response.data.data.card_list;
        })
        .catch((error) => {
          console.log(error)
          switch(error.response.data.code) {
          case "UNAUTHORIZED":
            alert("로그인이 필요합니다.");
            break;
          case "USER_NOT_FOUND":
            alert("사용자를 찾을 수 없습니다.")
            break;
          }
        })
    },
    showNextFour() {
      this.currentPage++;
    },
    showBackFour(){
      this.currentPage--;
    },
    showNext2Four(){
      this.current2Page++;
    },
    showBack2Four(){
      this.current2Page--;
    }
    
    
  }
}
</script>

<style scoped>
.icon {
  margin-right: 13px;
  border-radius: 13px;
}
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
a{text-decoration:none; color: white}
</style>