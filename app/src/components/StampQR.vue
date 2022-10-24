<template>
    <div class="container">
        <div class="reader">
            <h1 class="title">
                <span>スタンプを探して</span><span>カメラで読み取ろう!</span>
            </h1>
            <qrcode-stream class="camera" @decode="onDecode" @init="onInit" />
            <span @click="$emit('close')">カメラを閉じる</span>
        </div>

        <div id="result-overlay" v-if="result">
            <div id="result">
                <h1>
                    スタンプを押したよ!
                </h1>
                <div id="result-stamp">
                    <img src="@/assets/logo.png" />
                </div>
                <span>
                    スタンプを見に行く
                </span>
                <span>
                    他のスタンプを探す
                </span>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'StampQR',
    data() {
        return {
            result: ''
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
            this.result = result;
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
    right: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
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
    border: solid 2px rgb(2, 131, 35);
    transform: rotate(-25deg);
}

</style>
