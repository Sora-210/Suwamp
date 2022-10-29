<template>
    <div class="container">
        <div class="reader">
            <h1 class="title">
                <span>スタンプを探して</span><span>カメラで読み取ろう!</span>
            </h1>
            <qrcode-stream class="camera" @decode="onDecode" @init="onInit" />
            <a @click="onDecode('test')" style="cursor: pointer;">
                DEBUG
            </a>
        </div>
        <div @click="$emit('close')" class="close-btn">
          <img src="@/assets/cross.png" />
        </div>

        <div id="result-overlay" :class="{'open': result}">
            <div id="result">
                <h1>
                    スタンプを押したよ!
                </h1>
                <div id="result-stamp">
                    <img src="@/assets/logo.png" />
                </div>
                <div id="result-action">
                    <div class="btn" @click="allClose">
                        <span>スタンプを見に行く</span>
                    </div>
                    <div class="btn" @click="result = ''">
                        <span>続けて読み取る</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'StampQR',
    props: [
        'isQRProp'
    ],
    data() {
        return {
            result: '',
        }
    },
    computed: {
        isQR: function() {
            return this.isQRProp;
        }
    },
    methods: {
        async onInit(promise) {
            try {
                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    alert("カメラのアクセス権限がありません.");
                } else if (error.name === 'NotFoundError') {
                    alert("このデバイスにはカメラが搭載されていません");
                } else if (error.name === 'NotSupportedError') {
                    alert("[Dev] 暗号化通信を行ってください.");
                } else if (error.name === 'NotReadableError') {
                    alert("カメラが他のアプリケーションで利用されています.");
                } else if (error.name === 'StreamApiNotSupportedError') {
                    alert("カメラ機能に対応していません.");
                } else if (error.name === 'InsecureContextError') {
                    alert('[Dev] 暗号化通信を行ってください.');
                } else {
                    alert(`[Dev] Undefined Error code(${error})`);
                }
            }
        },
        onDecode(result) {
            // console.log(this.isQR)
            if (this.isQR) {
                this.result = result;
            }
        },
        async allClose() {
            this.$emit('close');
            this.result = ''
        },

        
    }
}
</script>
  
<style scoped>
.error {
    font-weight: bold;
    color: red;
}

.container {
    padding: 4vh 0 0 0;
    background-color: #fff;
    height: 100vh;
    width: 100%;
    z-index: 1;
}
.reader {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
}
.title {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    font-family: "Nico Moji";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.camera {
    padding-top: 3vh;
    width: 40vh;
    height: 40vh;
    margin: 0 auto;
}

#result-overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(99, 99, 99, 0.5);
    position: absolute;
    top: 0;
    right: -100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    transition: all ease 0.5s;
}
#result-overlay.open {
    right: 0;
    transition: all ease 0.5s;
}
#result {
    background-color: #fff;
    padding: 5rem 0;
}

#result-stamp {
    margin: 20px 0;
}
#result-stamp img{
    width: 30%;
    border-radius: 50%;
    border: solid 4px rgb(2, 131, 35);
    opacity: 0;
    transition: opacity ease 0.7s;
}
#result-overlay.open #result-stamp img {
    animation: pushAnime 0.4s 0.7s;
    animation-fill-mode: forwards;
}

@keyframes pushAnime {
    0% {
        transform: rotate(0deg) scale(2);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: rotate(-25deg) scale(1);
        opacity: 1;
    }
}


.close-btn {
  width: 4rem;
  height: 4rem;
  position: absolute;
  bottom: 4.5rem;
  right: 1rem;

  border: solid 5px #b94242;
  border-radius: 15px;
  transition: all ease 0.7s;
  cursor: pointer;
}

.close-btn img {
  width: 100%;
  height: 100%;
}

.btn {
    position: relative;
    padding: 7px;
    margin: 5px;
    width: 50%;
    cursor: pointer;
    color: rgb(106, 209, 156);
    border: solid 2px rgb(106, 209, 156);
    border-radius: 50px;
    transition: color ease 0.2s;
}
.btn::after {
    content: '\025b6';
    position: absolute;
    right: 4%;
    color: rgb(106, 209, 156);
    transition: color ease 0.2s;
}

.btn:hover {
    color: #fff;
    background-color: rgb(106, 209, 156);
    transition: color ease 0.2s;
}
.btn:hover::after {
    color: rgb(255, 255, 255);
    transition: color ease 0.2s;
}

#result-action {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
