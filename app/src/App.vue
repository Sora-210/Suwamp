<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Nico Moji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  height: 100vh;
  overflow: hidden;

  position: relative;
}

.container {
  padding: 0 2rem;
  height: 100%;
}
</style>
