<template>
  <v-main style="padding-left: 10em; padding-right: 10em;">
    <router-link to="/banner">
      <BannerComponent />
    </router-link>
    <v-sheet
      class="mx-auto pa-2 pt-6"
      color="grey-lighten-2"
    >
      <v-sheet class="party-list">
        👀 내가 관심있는 팟
      </v-sheet>
      <v-slide-group show-arrows>
        <!--여러개의 슬라이드 아이템을 가지고 있는 그룹을 생성할때-->
        <v-slide-group-item
          v-for="n in 8"
          :key="n"
        >
          <v-sheet
            class="ma-3"
            color="grey-lighten-1"
            height="200"
            rounded
            width="250"
          />
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <v-sheet
      class="mx-auto pa-2 pt-6"
      color="grey-lighten-2"
    >
      <v-sheet class="party-list">
        🥢모든 팟

        <v-sheet class="selectBtn">
          <v-container>
            <v-row>
              <v-col>
                <v-select
                  v-model="selectCategory"
                  label="카테고리"
                  :items="categoryList"
                  @click="clickCategory"
                />
              </v-col>
              <v-col>
                <v-select
                  v-model="selectArea"
                  label="활동지역"
                  :items="area"
                  @click="clickArea"
                />
              </v-col>
              <v-col style="padding-top: 26px">
                <v-btn @click="applyBtn">
                  적용
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-sheet>

      <v-container style="padding-left: 3px;">
        <v-container v-if="clickApplyBtn">
          <v-row>
            <v-col
              v-for="item in list"
              :key="item.party_id"
              cols="3"
              style="padding: 30px"
            >
              <router-link
                :to="{
                  name: 'userCategorize',
                  params: { party_id: item.party_id },
                }"
              >
                <BasicCard
                  :party_id="item.party_id"
                  :competition_rate="item.competition_rate"
                  :title="item.title"
                  :category="item.category"
                  :activity_location="item.activity_location"
                  :planned_closing_date="item.planned_closing_date"
                  :occupation_rate="item.occupation_rate"
                />
              </router-link>
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

        <!--해당 카테고리,활동지역 조회 페이지-->
        <v-container v-else>
          <v-row>
            <v-col
              v-for="item in applyList"
              :key="item.party_id"
              cols="3"
              style="padding: 30px"
            >
              <!--키로 각각 모든 카드 리스트의 id를 가져옴 -->
              <router-link
                :to="{
                  name: 'userCategorize',
                  params: { party_id: item.party_id },
                }"
              >
                <BasicCard
                  :party_id="item.party_id"
                  :competition_rate="item.competition_rate"
                  :title="item.title"
                  :category="item.category"
                  :activity_location="item.activity_location"
                  :planned_closing_date="item.planned_closing_date"
                  :occupation_rate="item.occupation_rate"
                />
              <!--받은 키로 BasicCard에 props-->
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

    
      <!--페이지네이션-->
      <v-row class="fixed bottom py-4">
        <v-col>
          <!--페이지네이션-->
          <v-pagination
            v-model="page"
            rounded="circle"
            :length="total_pages"
            @input="handleCategorizePage"
          />
        </v-col>
      </v-row>
    </v-sheet>
  </v-main>
</template>

<script>
import BasicCard from "@/components/CardList/BasicCard.vue";
import BannerComponent from "../components/BannerComponent.vue";
export default {
  components: {
    BannerComponent: BannerComponent,
    BasicCard: BasicCard,
  },

  data() {
    return {
      categoryList: [],
      area: [],
      selectCategory: "",
      selectArea: "",
      list: [],
      applyList: [],
      clickApplyBtn: true,
      page: null,
      total_pages: null,
      title:'',
      category:'',
      activity_location:'',
      planned_closing_date:'',
      occupation_rate:'',
      waiting_list:[],
    };
  },
  created() {
    this.$axios
      .get(
        process.env.VUE_APP_TAKOYAKI_API +
          "parties?number=16&page_number=1"
      )
      .then((response) => {
        console.log(response)
        this.list=response.data.data.card_list;
        this.total_pages=response.data.meta.total_pages;
      })
      .catch((error) => {
        console.log(error)
      })


      
  },

  methods: {
    waitingList(ID){
      const apiUrl=process.env.VUE_APP_TAKOYAKI_API+'parties/'+ID
      const response= this.$axios.get(apiUrl);
      const waitingL=response.data.data.waiting_list;
      for(const temp of this.list)

      this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + ID)
      .then((response) => {
        console.log(response)
        this.waiting_list=response.data.data.waiting_list;
      })
      .catch((error) => {
        console.log(error)
      })},
      
    clickCategory: function () {
      this.$axios
        .get(process.env.VUE_APP_TAKOYAKI_API + "party/category")
        .then((response) => {
          console.log(response);
          this.categoryList = response.data.data.category;
        })
        .catch((error) => {
          console.log(error)
        });
    },
    clickArea: function () {
      this.$axios
        .get(process.env.VUE_APP_TAKOYAKI_API + "party/activity-location", {})
        .then((response) => {
          this.area = response.data.data.activity_location;
        })
        .catch((error) => {
          console.log(error)
        });
    },
    applyBtn() {
      this.$axios
        .get(
          process.env.VUE_APP_TAKOYAKI_API +
            "parties?number=16&page_number=1&category=" +
            this.selectCategory +
            "&activity_location=" +
            this.selectArea
        )
        .then((response) => {
          this.clickApplyBtn = false;
          this.applyList = response.data.data.card_list; //해당 팟 카드리스트 받음
        })
        .catch((error) => {
          console.log(error)
        });
    },
    handlePage() {
      this.$axios
        .get(
          process.env.VUE_APP_TAKOYAKI_API +
            "parties?number=16&page_number=" +
            this.page
        )
        .then((response) => {
          console.log(response);
          this.list = response.data.data.card_list; //팟 정보의 객체를 받아옴
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleCategorizePage(){
      this.$axios
        .get(
          process.env.VUE_APP_TAKOYAKI_API +
            "parties?number=16&page_number=" +
            this.page+"&category=" +
            this.selectCategory +
            "&activity_location=" +
            this.selectArea
        )
        .then((response) => {
          console.log(response);
          this.applyList = response.data.data.card_list; //팟 정보의 객체를 받아옴
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped>


@import "./style/MainHome.css";
</style>
