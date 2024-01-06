<template>
    <div class="card-list">
      <div v-for="(card, index) in cards" :key="index" class="card">
        <h3>{{ card.title }}</h3>
        <p>카테고리: {{ card.category }}</p>
        <p>활동 지역: {{ card.region }}</p>
        <a :href="card.contactUrl" target="_blank"><v-btn color="primary">연락하기</v-btn></a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cards: [
          // 카드 데이터
          { title: '제목 1', category: '카테고리1', region: '지역1', contactUrl: 'https://example.com' },
          // 추가 카드 데이터...
        ]
      };
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
  