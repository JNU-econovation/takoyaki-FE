<template>
  <div>
    <v-container>
      <div v-if="closed_date==null">
        <v-row justify-end>
          <v-col class="text-right">
            <!--text-right 버튼 오른쪽으로 붙임 좀 더 css로 추가기능 필요해 보임-->

            <!--마감 모달-->
            <v-btn @click="dialog=true">
              마감하기
            </v-btn>
            <v-dialog
              v-model="dialog"
              width="auto"
            >
              <v-card>
                <v-card-text>
                  <h2>{{ title }}</h2>
                </v-card-text>
                <v-card-subtitle>
                  <v-col>
                    <v-row>
                      ✔  남은 자리 {{ recruitNumber-accepted_list.length }}
                    </v-row>
                    <v-row>
                      ✔  대기 중인 야끼  {{ waiting_list.length }}
                    </v-row>
                  </v-col>
                </v-card-subtitle>
                <v-card-actions>
                  <v-col>
                    <v-btn @click="dialog = false">
                      취소
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn @click="closing">
                      마감하기
                    </v-btn>
                  </v-col>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>


          <v-col
            cols="1"
            class="text-right"
          >
            <v-btn @click="edit">
              수정
            </v-btn>
          </v-col>


          <!--삭제 모달-->
          <v-col
            cols="1"
            class="text-right"
          >
            <div class="text-center">
              <v-btn
                @click="dialogremove = true"
              >
                삭제
              </v-btn>
              <v-dialog
                v-model="dialogremove"
                width="auto"
              >
                <v-card>
                  <v-card-text>
                    {{ title }}
                  </v-card-text>
                  <v-card-subtitle>
                    <v-col>
                      <v-row>
                        ✔  남은 자리 {{ recruitNumber - accepted_list.length }}
                      </v-row>
                      <v-row>
                        ✔  대기 중인 야끼  {{ waiting_list.length }}
                      </v-row>
                    </v-col>
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-col>
                      <v-btn @click="dialogremove = false">
                        취소
                      </v-btn>
                    </v-col>
                    <v-col>
                      <v-btn @click="remove">
                        삭제하기
                      </v-btn>
                    </v-col>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-col>
        </v-row>
      </div>
      <div v-else />
  
      <!--본문시작-->
      <h1> {{ title }} </h1>
      <br>

      <YakiList
        :party_id="party_id"
        :waiting_list="waiting_list"
        :accepted_list="accepted_list"
        :closed_date="closed_date"
      />
      <br><br>

      <v-row>
        <v-col cols="2">
          <h3> 팟 정보 </h3>
        </v-col>
        <v-col cols="2">
          <h4> 마감날짜 </h4>
        </v-col>
        <v-col>
          {{ closingDate }}
        </v-col>
      </v-row>

      <informationParty
        :title="title"
        :closing-date="closingDate"
        :nickname="nickname"
        :category="category"
        :activity-duration="activityDuration"
        :recruit-number="recruitNumber"
        :planned-start-date="plannedStartDate"
        :contact-method="contactMethod"
        :body="body"
        :activity_location="activity_location"
      />
    </v-container>
  </div>
</template>

<script>
import informationParty from './informationParty.vue';
import YakiList from '../YakiList.vue';
export default {

  components: {
    'informationParty': informationParty,
    'YakiList': YakiList,
  },
  props: ["party_id","title","closing-date","nickname","category","activity-duration","recruit-number","planned-start-date","contact-method","body","activity_location","waiting_list","accepted_list","closed_date"],
  data() {
    return {
      dialog:false,
      dialogremove:false,
    }
  },
  

  /* created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "?login=true")
      .then((response) => {
        console.log(response)
        this.user_type = response.data.data.user_type;
        this.title = response.data.data.title;
        this.nickname = response.data.data.nickname;
        this.closingDate = response.data.data.planned_closing_date;
        this.waiting_list = response.data.data.waiting_list;
        this.recruit_number = response.data.data.recruit_number;
        this.accepted_list=response.data.data.accepted_list;
        this.closed_date=response.data.data.closed_date;
      })
      .catch((error) => {d
        console.log(error)
      })
  }, */

  methods: {
    closing() {
      this.$axios.post(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id + "/closing")
        .then((response) => {
        console.log(response)
        this.$router.push({ path: '/' })

        })
        .catch((error) => {
        console.log(error)
        })
    },
    edit(){
      this.$router.push(
        { path: '/editComponent'});
    },
      
    remove() {
      this.$axios.delete(process.env.VUE_APP_TAKOYAKI_API + 'parties/' + this.party_id,)
        .then((response) => {
          console.log(response)
          this.$router.push({path:'/'})
        })
        .catch((error) => {
        console.log(error)
        })
    }

  }
}
</script>

<style></style>