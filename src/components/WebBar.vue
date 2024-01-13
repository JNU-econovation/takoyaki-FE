<template>
    <div>
      <v-app-bar color="#FCFCFD" flat height="72">
        <v-avatar> 
        <img src="public\images\takoImg.png" alt="takoyaki Image">
      </v-avatar>
      
        <router-link to="/">
          <v-btn class="me-2">home</v-btn>
        </router-link>  
        <!--<me-2> 오른쪽 여백을 생성하여 두 번째 버튼과의 간격이 생긴다-->
        <router-link to="/writeform">
          <v-btn class="me-2">글 쓰기</v-btn>
        </router-link>
      
        <v-spacer></v-spacer>
      
        <v-col class="text-right">
          <router-link to="/mypage">
            <v-btn class="me-2">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </router-link>
          <v-btn>login</v-btn>
        </v-col>
      
      </v-app-bar>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>