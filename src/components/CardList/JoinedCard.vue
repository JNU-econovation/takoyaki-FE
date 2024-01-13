<template>
  <div class="card-list">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="card"
    >
      <h3>{{ card.title }}</h3>

      <p>카테고리: {{ card.category }}</p>
      <p>활동 지역: {{ card.location }}</p>
        
      <a
        :href="card.contact"
        target="_blank"
      ><v-btn>연락하기</v-btn></a>
    </div>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        cards: [
          // 카드 데이터
          { title: '제목 1', category: '카테고리1', location: '지역', contact: 'https://example.com' },
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
  @import "./CardList.css"

  </style>
  