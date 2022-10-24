<template>
    <div>
      <stamp-qr id="qr" class="qr" :class="{'qr-open': isQR}" @close="onQR" />
      <main>
          <router-view/>
      </main>
      <div @click="onQR" class="menu">
          <img src="@/assets/QR.png" />
      </div>
    </div>
</template>

<script>
import StampQR from '@/components/StampQR.vue'

export default {
    name: "UserLayout",
    components: {
      'stamp-qr': StampQR
    },
    data() {
      return {
        isQR: false
      }
    },
    methods: {
      onQR: function() {
        this.isQR = !this.isQR;
      }
    }
}
</script>

<style>
main {
  overflow-y: scroll;
  height: 100vh;
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

.menu {
  width: 4rem;
  height: 4rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;

  border: solid 5px #42b983;
  border-radius: 15px;
  transition: all ease 0.7s;
  cursor: pointer;
}

.menu img {
  width: 100%;
  height: 100%;
}

#qr {
  position: absolute;
}
.qr {
  z-index: 2;
  top: -103vh;
  transition: all ease 0.5s;
}
.qr-open {
  top: 0;
  transition: all ease 0.5s;
}
</style>