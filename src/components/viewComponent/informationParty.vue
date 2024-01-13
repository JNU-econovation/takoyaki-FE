<template>
  <div>
    <!--해당 게시물 정보를 뿌려줄 것이기 때문에 path만을 전달하는 것이 아니라 게시물 ID도 params로 보내줘야 한다.-->
    <v-container>
      <v-row align="center">
        <v-col>
          <v-divider class="my-3 divideLine"></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1"><strong>카테고리</strong></v-col>
        <v-col cols="2">{{ category }}</v-col>
        <v-col cols="1"><strong>지역:</strong></v-col>
        <v-col cols="2">{{ area }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="1"><strong>활동시작:</strong></v-col>
        <v-col cols="2">{{ plannedStartDate }}</v-col>
        <v-col cols="1"><strong>예상기간:</strong></v-col>
        <v-col cols="2">{{ activityDuration }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="1"><strong>모집인원:</strong></v-col>
        <v-col cols="2">{{ recruitNumber }}</v-col>
        <v-col cols="1"><strong>연락방법:</strong></v-col>
        <v-col cols="2">{{ contactMethod }}</v-col>
      </v-row>

      <br><br><br><br>
      <h3> 팟 소개 </h3>

      <v-row align="center">
        <v-col>
          <v-divider class="my-3 divideLine"></v-divider>
        </v-col>
      </v-row>

      <br><br>
      {{ body }} <!--tiptap에디터사용해서 <p>,<h1>태그 없애줘야 함 그리고 해당 태그를 어떻게 적용할건지 한번 더 고민해봐야 할듯-->

    </v-container>
  </div>
</template>

<script>
export default {
  props: ['party_id'],

  data() {
    return {
      title: '',
      closingDate: '',
      category: '',
      area: '',
      competitionRate: '',
      nickname: '',
      activityDuration: '',
      recruitNumber: null,
      plannedStartDate: '',
      contactMethod: '',
      body: '',
      informationList: ['카테고리', '활동 시작', '모집 인원', '연락 방법', '지역', '예상 기간']
    };
  },
  created() {
    this.$axios.get(process.env.VUE_APP_TAKOYAKI_API + "parties/" + this.party_id + "?login=true")
      .then((response) => {
        console.log(response);
        this.title = response.data.data.title;
        this.closingDate = response.data.data.planned_closing_date;
        this.category = response.data.data.category;
        this.area = response.data.data.activity_location;
        this.competitionRate = response.data.data.competition_rate;
        this.nickname = response.data.data.nickname;
        this.activityDuration = response.data.data.activity_duration;
        this.recruitNumber = response.data.data.recruit_number;
        this.plannedStartDate = response.data.data.planned_start_date;
        this.contactMethod = response.data.data.contact_method;
        this.body = response.data.data.body;
      })
      .catch((error) => {
        console.log(error);
      })
  },

}
</script>

<style></style>