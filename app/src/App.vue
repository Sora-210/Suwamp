<template>
  <div id="app">
    <router-view id="view" />
  </div>
</template>

<style>
.container {
  padding: 0 2rem;
  height: 100%;
}
</style>

<style scoped>
#app {
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
#view {
  padding-bottom: 4vh;
}
</style>
