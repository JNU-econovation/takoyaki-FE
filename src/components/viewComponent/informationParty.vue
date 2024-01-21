<template>
  <div>
    <!--해당 게시물 정보를 뿌려줄 것이기 때문에 path만을 전달하는 것이 아니라 게시물 ID도 params로 보내줘야 한다.-->
    <v-container>
      <v-row align="center">
        <v-col>
          <v-divider class="my-3 divideLine" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1">
          <strong>카테고리</strong>
        </v-col>
        <v-col cols="2">
          {{ category }}
        </v-col>
        <v-col cols="1">
          <strong>지역:</strong>
        </v-col>
        <v-col cols="2">
          {{ activity_location }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1">
          <strong>활동시작:</strong>
        </v-col>
        <v-col cols="2">
          {{ plannedStartDate }}
        </v-col>
        <v-col cols="1">
          <strong>예상기간:</strong>
        </v-col>
        <v-col cols="2">
          {{ activityDuration }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1">
          <strong>모집인원:</strong>
        </v-col>
        <v-col cols="2">
          {{ recruitNumber }}
        </v-col>
        <v-col cols="1">
          <strong>연락방법:</strong>
        </v-col>
        <v-col cols="2">
          {{ contactMethod }} 
        </v-col>
      </v-row>
      <br><br><br>
      <p :style="{ textAlign: 'right' }">
        조회수: {{ view_count }}
      </p>
      

      <br><br>
      <h3> 팟 소개 </h3>

      <v-row align="center">
        <v-col>
          <v-divider class="my-3 divideLine" />
        </v-col>
      </v-row>

      <br><br>
      {{ body }} <!--tiptap에디터사용해서 <p>,<h1>태그 없애줘야 함 그리고 해당 태그를 어떻게 적용할건지 한번 더 고민해봐야 할듯-->
    </v-container>
  </div>
</template>

<script>
export default {
  props: ['party_id',"title","closing-date","nickname","user_type","category","activity-duration","recruit-number","planned-start-date","contact-method","body","activity_location","view_count"],

  data() {
    return {
      informationList: ['카테고리', '활동 시작', '모집 인원', '연락 방법', '지역', '예상 기간']
    };
  },
}
</script>

<style></style>