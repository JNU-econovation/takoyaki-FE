
<template>
    <div class="BasicCard">
      <div v-for="(card, index) in cards" :key="index" class="card">
        <h3>{{ card.title }}</h3>
        <p>{{ card.date }}</p>
        <p>카테고리: {{ card.category1 }}, {{ card.category2 }}</p>
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
          { title: '제목 1', date: new Date().toISOString().slice(0, 10), category1: '카테고리1', category2: '카테고리2', views: 100 },
          
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
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
  }
  </style>
  