<template>
    <div>
        <main>
            <router-view/>
        </main>
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/qr">QR</router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: "UserLayout",
}
</script>

<style>
main {
  overflow-y: scroll;
  height: 93vh;
}
main::-webkit-scrollbar {
  width: 5px;
}
main::-webkit-scrollbar-track {
  background-color: rgb(223, 223, 223);
}
main::-webkit-scrollbar-thumb {
  background-color: #42b983;
}

nav {
  width: 100%;
  height: 7vh;
  position: absolute;
  bottom: 0;
  right: 0;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  border-top: solid 1px #2c3e50;
  background-color: #fff;
}

nav a {
  font-weight: bold;
  color: #2c3e50;

  padding: 20px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>