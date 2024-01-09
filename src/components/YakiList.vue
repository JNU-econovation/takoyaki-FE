<template>
    <div class="yaki-list">
      <div v-for="yaki in yakis" :key="yaki.id" class="yaki">
        <span>{{ yaki.name }}</span>
        <span v-if="yaki.status === 'accepted'">&#10004;</span>


        <button v-if="yaki.status !== 'accepted'" @click="acceptYaki(yaki)">수락</button>
        <button v-if="yaki.status !== 'rejected'" @click="rejectYaki(yaki)">거절</button>
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        yakis: [
          // 야끼 db에서 불러오기
        ]
      };
    },
    methods: {
      acceptYaki(yaki) {
        yaki.status = 'accepted';
        // 수락 야끼 버튼 누르면 바로 이동하게 만들어야됨
      },
      rejectYaki(yaki) {
        const index = this.yakis.indexOf(yaki);
        if (index > -1) {
          this.yakis.splice(index, 1);
        }
      }
    }
  };
  </script>
  
  <style>
  .yaki {
   
  }
  .yaki button {
    
  }
  </style>
  