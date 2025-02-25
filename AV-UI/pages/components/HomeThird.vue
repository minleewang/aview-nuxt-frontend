<template>
  <div class="home-third">
    <div class="home-third-body">

      <div class="content-container" data-aos="fade-left" data-aos-offset="400">
        <v-card class="content-image" id="github-image"></v-card>
        <div class="text-container">
          <p class="number-icon">1</p>
          <div class="text-title-container">
            <p class="text-title">GitHub연동</p>
            <p class="text-subtitle">회원가입 필요 없음</p>
          </div>
          <div class="text-content-container">
            <p class="text-content"><span class="AIV-span">AIV</span>는 GitHub와 연동을 통해 회원가입 없이 GitHub 아이디만으로 프로젝트를 관리할 수 있습니다.</p>
          </div>
        </div>
      </div>


      <div class="content-container" data-aos="fade-right" data-aos-offset="400">
        <div class="text-container">
          <p class="number-icon">2</p>
          <div class="text-title-container">
            <p class="text-title">생성된 보고서 검색 </p>
            <p class="text-subtitle">쉬운 검색 확인</p>
          </div>
          <div class="text-content-container">
            <p class="text-content">생성한 프로젝트 보고서를 쉽게 검색하여 확인할 수 있습니다.</p>
          </div>
        </div>
        <v-card class="content-image" id="search-image"></v-card>
      </div>


      <div class="content-container" data-aos="fade-left" data-aos-offset="400">
        <v-card class="content-image" id="backlog-image"></v-card>
        <div class="text-container">
          <p class="number-icon">3</p>
          <div class="text-title-container">
            <p class="text-title">Backlog 생성</p>
            <p class="text-subtitle">Backlog 자동 생성 및 관리 가능 </p>
          </div>
          <div class="text-content-container">
            <p class="text-content">GitHub의 Repository와 Branches 별로 Backlog를 자동 생성 및 관리할 수 있습니다.</p>
          </div>
        </div>
      </div>


      <div class="content-container" data-aos="fade-right" data-aos-offset="400">
        <div class="text-container">
          <p class="number-icon">4</p>
          <div class="text-title-container">
            <p class="text-title">Project Report 생성</p>
            <p class="text-subtitle">효율적인 업무 생산성</p>
          </div>
          <div class="text-content-container">
            <p class="text-content">개발자들의 업무 생산성을 높이기 위해 </p>
            <p class="text-content">Project Report의 초안 작성 및 관리를 도와드립니다.</p>
          </div>
        </div>
        <v-card class="content-image" id="report-image"></v-card>
      </div>



    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import 'aos/dist/aos.css'

export default defineComponent({
  name: 'HomeThird',
});
</script>

<style scoped>
.home-third {
  width: 100%;
  height: 350vh;
  background-color: #fc00d6;
  display: flex;
  justify-content: center;
}


.home-third-body {
  width: 70%;
  height: 100%;
  display: flex;
  background-color: 
  #fc02d2;
  display: flex;
  flex-direction: column;
  /* gap: 1%; */

}

.content-container {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
}

.content-image {
  width: 50%;
  height: 60%;
  border-radius: 25px;
}

#github-image {
  background-image: url('/fixed/github_logo2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#search-image {
  background-image: url('/fixed/search.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#backlog-image {
  background-image: url('/fixed/create_backlog.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#report-image {
  background-image: url('/fixed/create_report.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.text-container {
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
}

.number-icon {
  font-size: 4vh;
  font-weight: bold;
  color: #fc02f4d7;
  background-color: #ffffff;
  width: 5vh;
  height: 5vh;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.text-title {
  font-size: 5vh;
  font-weight: bold;
  color: #ffffff;
}

.text-subtitle {
  font-size: 2.3vh;
  font-weight: bold;
  color: #ffffff;
}

.text-content {
  font-size: 2.2vh;
  color: #ffffff;
}

.AIV-span {
  color: rgb(255, 240, 30);
}
</style>
