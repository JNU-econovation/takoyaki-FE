<template>
  <div>
    <v-container>
      <v-card class="writtenCard">
        <h1>기본정보를 입력해주세요.</h1>

          <v-row align="center">
            <v-col>
              <v-divider class="my-3 divideLine"></v-divider>
            </v-col>
          </v-row>

          <v-sheet id="dropdown-example" grid-list-xl>
          <v-row row wrap >
          <v-flex xs12 sm4 v-for="(k) in basicInformation" v-bind:key="k" class="me-16">
            
          <p style="font-weight: bold;">{{k}}</p>

          <v-overflow-btn v-if="k=='카테고리'" class="width"
            @click="clickCategory"
            :items=category
            label="카테고리"
            target="#dropdown-example"
            v-model="selectCategory"
          ></v-overflow-btn>

          <v-overflow-btn v-if="k == '활동 지역'" class="width"
            @click="clickArea"
            :items=area
            label="활동 지역"
            target="#dropdown-example"
            v-model="selectArea"
          ></v-overflow-btn>

          <v-sheet v-if="k=='예상 기간'">
            <v-row>
              <v-col>
                <v-text-field 
                oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                placeholder="숫자 입력"
                v-model="selectDuration"></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  @click="clickDurationUnit"
                  :items=DurationUnit
                  placeholder="기간"
                  v-model="selectDurationUnit">
                </v-select>
              </v-col>
            </v-row>
          </v-sheet>

          <v-text-field v-if="k == '모집 인원'"
            placeholder="숫자 입력"
            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
            v-model="selectRecruitNumber">
          </v-text-field>
          
          <v-sheet v-if="k == '마감 날짜'">
            <input class="calendar" style="outline: auto;"
              type="date" 
              @input="checkClosingDate"
              v-model="selectClosingDate">
              <p v-if="isClosingValid" class="width"></p>
              <p v-else class="error-message width">현재날짜로부터 6개월 안쪽으로 정해주세요 </p>
          </v-sheet>
              
          <v-sheet v-if="k == '활동 시작'">
          <input style="outline: auto;" class="calendar"
          type="date"
          v-model="selectStartDate"
          @input="checkStartDate">
          <p v-if="isStartValid" class="error-message width">마감 날짜와 같거나 커야 합니다</p>
          </v-sheet>

          <v-sheet  v-if="k == '연락 방법'" class="width">
            <v-select
              @click="clickContactMethod"
              :items=contactMethod
              placeholder="연락 수단"
              variant="Tonal"
              v-model="selectContactMethod">
            </v-select>
            <v-text-field v-if="selectContactMethod == '전화번호'"
              placeholder="숫자 입력"
              v-model="selectPhoneNumber"
              maxlength="13"
              oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');">
            </v-text-field>
            <v-text-field v-else-if="selectContactMethod == '카카오톡 오픈채팅'" 
              placeholder="https://카카오톡URL.."
              v-model="kakaoChatInput" >
            </v-text-field>
            <v-text-field v-else-if="selectContactMethod == '이메일'"
              placeholder="takoyaki@gmail.com"
              v-model="emailInput"
              @input="checkEmailValidity">
            </v-text-field>
              <div v-if="isInvalidEmail" class="error-message">
                이메일 형식이 올바르지 않습니다.
              </div>
          </v-sheet>
          </v-flex>
          </v-row>
          </v-sheet>

          <!--팟 소개 -->

            <br><br>
            <h1>팟 소개</h1>

            <v-row align="center">
              <v-col>
                <v-divider class="my-3 divideLine"></v-divider>
              </v-col>
            </v-row>

          <br>
          <h3>제목</h3>
          <v-text-field
            placeholder="제목을 입력하세요"
            maxlength="100">
          </v-text-field>
            
          
            <TipTap>d</TipTap>
            
        
    

        <v-card-actions >
          <v-spacer></v-spacer>
          <v-btn>Click me</v-btn>
        </v-card-actions>
    </v-card>
    </v-container>
  </div>
</template>




<script>
import TipTap from '@/components/TipTap.vue'

export default {
  components: {
    'TipTap':TipTap,
  }, 

  data() {
    return {
      //  editor: null,
      selectCategory:'',
      selectArea:'',
      selectContactMethod:'',
      selectDuration:'',
      selectDurationUnit:'',
      selectRecruitNumber:'',
      selectClosingDate:'',
      selectStartDate:'',
      selectPhoneNumber: '',
      kakaoChatInput: '',
      emailInput: '',
      isInvalidEmail: false,
      isClosingValid: false ,
      isStartValid: '',


      basicInformation:['카테고리', '활동 지역',  '예상 기간', '모집 인원', '마감 날짜','활동 시작','연락 방법'],
      category: [],
      area: [],
      DurationUnit:[],
      contactMethod:[]
    }
  },
  methods: {
    clickCategory: function () {
      this.$axios.get('http://13.125.248.139:8080/party/category', {
      })
        .then((response) => {
          this.category = response.data.data.category;
          
        })
        .catch((error) => {
          console.log(error);
        })
    },
    clickArea: function () {
      this.$axios.get('http://13.125.248.139:8080/party/activity-location', {
      })
        .then((response) => {
          this.area = response.data.data.activity_location;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    clickDurationUnit: function () {
      this.$axios.get('http://13.125.248.139:8080/party/activity-duration-unit', {
      })
      .then((response) => {
        this.DurationUnit = response.data.data.activity_duration_unit;
      })
      .catch((error) => {
        console.log(error);
      })
  },
    checkClosingDate:function(){
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
      if(selectStartDateObject>= selectClosingDateObj){
        this.isStartValid=false;
      }else {
        this.isStartValid=true;
      }
    },
    
  
    clickContactMethod: function () {
      this.$axios.get('http://13.125.248.139:8080/party/contact-method')
        .then((response) => {
          this.contactMethod = response.data.data.contact_method;
/*           console.log(response);*/        
})
        .catch((error) => {
          console.log(error);
        })
    },
    checkEmailValidity:function() {
      //이메일 형식 검사
      const emailPattern = /[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*/;
      //입력된 이메일이 정규표현식과 일치하는지 확인
      //만약 일치하지 않으면 isInvalidEmail을 true로 업데이트
      this.isInvalidEmail = !emailPattern.test(this.emailInput);
    },
  }
  }
  


</script>

<style>
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
  margin-top:-15px;
}
</style>