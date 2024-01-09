
<template>
    <div class="BasicCard">
      <div v-for="(card, index) in cards" :key="index" class="card">
        <h3>{{ card.title }}</h3>
        <p>{{ card.date }}</p>

        <p> {{ card.category }}, {{ card.location }}</p>

        <p>조회수: {{ card.views }}</p>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cards: [
          // 카드 데이터 기본 형식
          { title: '제목 1', 
          date: new Date().toISOString().slice(0, 10),
          category: '카테고리', location: '활동 지역',
          views: 100 },
          
        ]
      };
    },
    created() {
     // 날짜 받아야됨
    }
  };
  </script>
  
  <style>

  .card-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .card {
    border: 1px solid #fff2d1;
    padding: 16px;
    border-radius: 8px;
  }
  </style>
  