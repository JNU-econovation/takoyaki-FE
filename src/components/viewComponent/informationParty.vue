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
          <strong>카테고리:</strong>
        </v-col>
        <v-col cols="5">
          <v-btn style="background-color: #fff2d1; color: #664B3B;">
            {{ category }}
          </v-btn>
        </v-col>
        <v-col cols="1">
          <strong>활동지역:</strong>
        </v-col>
        <v-col
          cols="2"
        >
          <v-btn style="background-color: #fff2d1; color: #664B3B;">
            {{ activity_location }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1">
          <strong>활동시작:</strong>
        </v-col>
        <v-col cols="5">
          <h4>{{ plannedStartDate }}</h4>
        </v-col>
        <v-col cols="1">
          <strong>예상기간:</strong>
        </v-col>
        <v-col cols="2">
          <h4>{{ activityDuration }}</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1">
          <strong>모집인원:</strong>
        </v-col>
        <v-col cols="">
          <h4>{{ recruitNumber }}</h4>
        </v-col>
        <v-col cols="1">
          <strong>연락방법:</strong>
        </v-col>
        <v-col cols="5">
          <h4>{{ contactMethod }} </h4>
        </v-col>
      </v-row>
      <br><br><br>
      <p
        :style="{ textAlign: 'right' }"
        style="padding-right:50px"
      >
        <i class="fa-regular fa-eye" /> {{ view_count }}
      </p>
      

      <br>
      <h3> 팟 소개 </h3>

      <v-row align="center">
        <v-col>
          <v-divider class="my-3 divideLine" />
        </v-col>
      </v-row>

      <br><br>
      <div class="editor">
        <editor-content :editor="editor" />
      </div>
    </v-container>
    <br><br><br><br><br><br>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import { StarterKit } from "@tiptap/starter-kit";

export default {
  components: {
    EditorContent,
  },

  props: ['party_id',"title","closing-date","nickname","user_type","category","activity-duration","recruit-number","planned-start-date","contact-method","body","activity_location","view_count"],

  data() {
    return {
      informationList: ['카테고리', '활동 시작', '모집 인원', '연락 방법', '지역', '예상 기간'],
      editor: null,
    };
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit],
      editorProps: {
        attributes: {
          class: "Editor",
        },
      },
      content: this.body,
    });
    console.log(this.body);
  },
}
</script>

<style scoped>
.v-btn{
  border-radius: 18px;
  margin-top:-7px;
}
.button{
  padding-top:100px;
  padding-left:0px;
  position: absolute;
  
}</style>

