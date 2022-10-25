<template>
  <div class="home">
    <div id="title">
      <h3 id="creater">
        Created by <img alt="Vue logo" src="../assets/logo.png" />Suwageeks
      </h3>
      <h1>『SUWAMP!』</h1>
      <h2>in 新風祭2022</h2>
    </div>
    <p>
      新風祭を回ってスタンプを集めよう!
    </p>
    <my-stamps class="my-stamp"/>
    <!-- <div id="contents">
      <div>
        STAMPS
      </div>
    </div> -->
  </div>
</template>

<script>
import MyStamps from '@/components/MyStamps.vue'

export default {
  components: {
    'my-stamps': MyStamps
  },
  name: 'HomeView',
}
</script>

<style scoped>
/* TITLE DESIGN */
#title {
  position: relative;
  padding: 1.5rem 2rem;
  border-top: 4px solid #000;
  border-bottom: 4px solid #000;
  margin: 2vh 0;
}
#title:before,
#title:after {
  position: absolute;
  left: 0;
  width: 100%;
  content: '';
  border-top: 4px dotted #000;
}
#title:before {
  top: 6px;
}
#title:after {
  bottom: 6px;
}
#title h1 {
  font-size: 4rem;
  font-family: "Nico Moji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#title h2 {
  font-family: "Nico Moji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media screen and (max-width: 700px) {
  #title h1 {
    font-size: 35px;
  }
  #title h2 {
    font-size: 20px;
  }
  #title h3 {
    font-size: 15px;
  }
}

/* CREATER DESIGN */
#creater {
  display: flex;
  align-items: center;
  justify-content: center;
}
#creater img {
  width: 2rem;
  height: 2rem;
  padding-left: 1rem;
}

#contents {
  padding: 3rem 2rem;
  display: flex;
}


p {
  font-size: 2em;
}
.my-stamp {
  padding-top: 2vh;
}
</style>