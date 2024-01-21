<template>
  <div>
    <v-container>
      <v-card class="writtenCard">
        
        <br>
        <h1>제목</h1>
        <v-text-field
          v-model="title"
          placeholder="제목을 입력하세요"
          maxlength="20"
          
        />
        <h1>기본정보를 입력해주세요.</h1>

        <v-row align="center">
          <v-col>
            <v-divider class="my-3 divideLine" />
          </v-col>
        </v-row>

        <v-container class="infoContent" >
        <v-sheet
          id="dropdown-example"
          grid-list-xl
        >
          <v-row
            row
            wrap
            
          >
            <v-flex
              v-for="k in basicInformation"
              :key="k"
              xs12
              sm4
              class="me-16"
            >
              <p style="font-weight: bold">
                {{ k }}
              </p>

              <v-overflow-btn
                v-if="k == '카테고리'"
                v-model="selectCategory"
                class="width"
                :items="category"
                label="카테고리"
                target="#dropdown-example"
                @click="clickCategory"
              />

              <v-overflow-btn
                v-if="k == '활동 지역'"
                v-model="selectArea"
                class="width"
                :items="area"
                label="활동 지역"
                target="#dropdown-example"
                @click="clickArea"
              />

              <v-sheet v-if="k == '예상 기간'">
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="selectDuration"
                      oninput="this.value = this.value.replace(/[^1-9]/g, '')"
                      placeholder="0보다 큰 숫자 입력"
                    />
                  </v-col>
                  <v-col>
                    <v-select
                      v-model="selectDurationUnit"
                      :items="DurationUnit"
                      placeholder="기간"
                      @click="clickDurationUnit"
                    />
                  </v-col>
                </v-row>
              </v-sheet>

              <v-text-field
                v-if="k == '모집 인원'"
                v-model="selectRecruitNumber"
                placeholder="숫자 입력"
                oninput="this.value = this.value.replace(/[^0-9]/g, '')"
              />

              <v-sheet v-if="k == '마감 날짜'">
                <input
                  v-model="selectClosingDate"
                  class="calendar"
                  style="outline: auto"
                  type="date"
                  @input="checkClosingDate"
                >
                <p
                  v-if="isClosingValid"
                  class="width"
                />
                <p
                  v-else
                  class="error-message width"
                >
                  6개월 이내의 날짜를 선택해주세요.
                </p>
              </v-sheet>
              
              <v-sheet v-if="k == '활동 시작'">
                <input
                  v-model="selectStartDate"
                  style="outline: auto"
                  class="calendar"
                  type="date"
                  @input="checkStartDate"
                >
                <p
                  v-if="isStartValid"
                  class="error-message width"
                >
                  마감 날짜와 같거나 커야 합니다
                </p>
              </v-sheet>

              <v-sheet
                v-if="k == '연락 방법'"
                class="width"
              >
                <v-select
                  v-model="selectContactMethod"
                  :items="contactMethod"
                  placeholder="연락 수단"
                  variant="Tonal"
                  @click="clickContactMethod"
                />
                <v-text-field
                  v-if="selectContactMethod == '전화번호'"
                  v-model="contactInput"
                  placeholder="숫자 입력"
                  maxlength="13"
                  oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');"
                />
                <v-text-field
                  v-else-if="selectContactMethod == '카카오톡 오픈채팅'"
                  v-model="contactInput"
                  placeholder="https://카카오톡URL.."
                />
                <v-text-field
                  v-else-if="selectContactMethod == '이메일'"
                  v-model="contactInput"
                  placeholder="takoyaki@gmail.com"
                  @input="checkEmailValidity"
                />
                <div
                  v-if="isInvalidEmail"
                  class="error-message"
                >
                  이메일 형식이 올바르지 않습니다.
                </div>
              </v-sheet>
            </v-flex>
          </v-row>
        </v-sheet>
      </v-container>

        <!--팟 소개 -->

        <br><br>
        <h1>팟 소개</h1> 

        <v-row align="center">
          <v-col>
            <v-divider class="my-3 divideLine" />
          </v-col>
        </v-row>

        <TipTap
          :register="(registerBtn = false)"
          @input="handleText"
        />
        <v-btn @click="handleText">
          a
        </v-btn>
        <button @click="login">
          login
        </button>
        <v-btn @click="logincheck">
          logincheck
        </v-btn>
        <button @click="signUp">
          sign
        </button>
        <v-btn @click="logOut">
          logout
        </v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import TipTap from "@/components/TipTap.vue";

export default {
  components: {
    TipTap: TipTap,
  },
  props: ["register"],

  data() {
    return {
      selectCategory: "",
      selectArea: "",
      selectContactMethod: "",
      selectDuration: "",
      selectDurationUnit: "",
      selectRecruitNumber: null,
      selectClosingDate: "",
      selectStartDate: "",
      contactInput: "",
      isInvalidEmail: false,
      isClosingValid: false,
      isStartValid: "",
      title: "",
      id: null,
      receivedcontent: "",
      partyID: null,
      basicInformation: [
        "카테고리",
        "활동 지역",
        "예상 기간",
        "모집 인원",
        "마감 날짜",
        "활동 시작",
        "연락 방법",
      ],
      category: [],
      area: [],
      DurationUnit: [],
      contactMethod: [],
    };
  },
  methods: {
    handleText(text) {
      this.receivedcontent = text;
      this.registerParty();
    },

    signUp() {
      this.$axios
        .post(process.env.VUE_APP_TAKOYAKI_API + "test/users/signup")
        .then((response) => {
          console.log(response);
          this.id = response.data.data.id;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logOut() {
      this.$axios
        .post(process.env.VUE_APP_TAKOYAKI_API + "users/logout")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    login() {
      this.$axios
        .post(process.env.VUE_APP_TAKOYAKI_API + "test/users/login/" + 49)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logincheck() {
      this.$axios
        .get(process.env.VUE_APP_TAKOYAKI_API + "users/login-check")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    registerParty() {
      this.$axios
        .post(process.env.VUE_APP_TAKOYAKI_API + "party", {
          category: this.selectCategory,
          activity_location: this.selectArea,
          activity_duration_unit: this.selectDurationUnit,
          contact_method: this.selectContactMethod,
          title: this.title,
          body: this.receivedcontent,
          recruit_number: this.selectRecruitNumber,
          activity_duration: this.selectDuration,
          planned_closing_date: this.selectClosingDate,
          planned_start_date: this.selectStartDate,
          contact: this.contactInput,
        })
        .then((response) => {
          console.log(response);
          this.partyID = response.data.data.party_id; //팟 등록 id받아옴
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clickCategory: function () {
      this.$axios
        .get(process.env.VUE_APP_TAKOYAKI_API + "party/category")
        .then((response) => {
          this.category = response.data.data.category;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clickArea: function () {
      this.$axios
        .get(process.env.VUE_APP_TAKOYAKI_API + "party/activity-location", {})
        .then((response) => {
          this.area = response.data.data.activity_location;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clickDurationUnit: function () {
      this.$axios
        .get(
          process.env.VUE_APP_TAKOYAKI_API + "party/activity-duration-unit",
          {}
        )
        .then((response) => {
          this.DurationUnit = response.data.data.activity_duration_unit;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkClosingDate: function () {
      const selectedDateObj = new Date(this.selectClosingDate);
      const currentDate = new Date();

      // 입력 날짜가 현재 날짜의 1일 후부터 180일 후 사이에 있는지 확인
      this.isClosingValid =
        !isNaN(selectedDateObj.getTime()) &&
        selectedDateObj >= currentDate.setDate(currentDate.getDate()) &&
        selectedDateObj <= currentDate.setDate(currentDate.getDate() + 180);
    },
    checkStartDate: function () {
      //입력된 문자열을 날짜 객체로 변환
      const selectStartDateObject = new Date(this.selectStartDate);
      const selectClosingDateObj = new Date(this.selectClosingDate);
      //마감날짜보다 큰지 여부 확인
      if (selectStartDateObject >= selectClosingDateObj) {
        this.isStartValid = false;
      } else {
        this.isStartValid = true;
      }
    },

    clickContactMethod: function () {
      this.$axios
        .get(process.env.VUE_APP_TAKOYAKI_API + "party/contact-method")
        .then((response) => {
          this.contactMethod = response.data.data.contact_method;
          /*           console.log(response);*/
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkEmailValidity: function () {
      //이메일 형식 검사
      const emailPattern =
        /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/;
      //입력된 이메일이 정규표현식과 일치하는지 확인
      //만약 일치하지 않으면 isInvalidEmail을 true로 업데이트
      this.isInvalidEmail = !emailPattern.test(this.emailInput);
    },
  },
};
</script>

<style>

.infoContent{
  padding: 30px;
}
.writtenCard {
  padding-left: 50px;
  padding-top: 60px;
}
.calendar {
  padding: 3px;
  margin-bottom: 30px;
}
.error-message {
  color: #ff5555;
  font-size: 14px;
}
.width {
  margin-top: -15px;
}
</style>
