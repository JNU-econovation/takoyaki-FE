<template>
  <div id=banner><!--배너 컴포넌트를 감싸는 부모 컨테이너-->
    <div id=bannerimg><!--배너 이미지와 좌우 화살표 버튼을 감싸는 컨테이너-->
      <img v-bind:src="img_url" class="banner-image">
      <div id=beforearr style="color:gray">
        <!--@click="beforeimg"-->
      <i class="fas fa-chevron-left fa-2x"></i></div>
      <div id=nextarr style="color:gray">
        <!-- @click="nextimg" -->
      <i class="fas fa-chevron-right fa-2x"></i></div>
    </div>
  </div>
</template>
<script>
export default {
  created: function () {
    this.img_idx = 0;
    this.img_url = './images/takoImg.png';
  },
  data() {
    return {
      images: [
        {
          img_idx:0,
          img_url:'./images/takoImg.png',
        },
      ]
    }
  },
  /*다른 이미지가 있으면 돌아가게끔
  methods: {
    nextimg: function () {
      this.img_idx = this.img_idx + 1;
      if (this.img_idx>this.images.length) this.img_idx = 0;
      this.img_url =this.images[this.img_idx].img_url;

    },
    beforeimg: function () {
      this.img_idx = this.img_idx - 1;
      if (this.img_idx < 1) this.img_idx = this.images.length;
      //첫번째 이미지에서 이전으로 가려고 하면 마지막 이미지로 돌아감
      this.img_url = this.images[this.img_idx].img_url;
    }
  }*/ //타코야끼 가이드말고 다른 이미지가 있을 경우 화살표 누르면 넘어가게끔 
}
</script>
<style>
#banner {
  width: 100%;
  position: relative;
  
}

#bannerimg {
  width: 100%;
  height: 500px;
 
}

#beforearr {
  display: block;
  position: absolute;
  left: 3%;
  top: 50%;
  height: 100%;
}

#nextarr {
  display: block;
  position: absolute;
  right: 3%;
  top: 50%;
}
.banner-image {
  with:100%;
  height:100%;
  padding-left: 100px;
  padding-top:50px;
  padding-bottom:50px ;
}
</style>
