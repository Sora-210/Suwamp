<template>
    <div id="frame">
        <div id="content">
            <h1 id="title" v-if="mode">ユーザー登録してね!</h1>
            <h1 id="title" v-else>ログインしてね!</h1>
            <h3 id="error" v-if="error">{{ error }}</h3>
            <div class="form">
                <label>
                    UserName
                </label>
                <input type="text" v-model="name">
            </div>
            <div class="form">
                <label>
                    Password
                </label>
                <input type="password" v-model="password">
            </div>
            <div class="btn" v-if="mode" @click="onResistory">
                <span>
                    登録
                </span>
            </div>
            <div class="btn" v-else @click="onResistory">
                <span>
                    ログイン
                </span>
            </div>
            <p v-if="mode" @click="changeMode">
                ログインはこちら
            </p>
            <p v-else @click="changeMode">
                登録はこちら
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserResister',
    data: () => {
        return {
            error: '',
            name: '',
            password: '',
            mode: true
        }
    },
    methods: {
        onResistory: async function() {
            this.error = ''
            if (this.name !== '' && this.password !== '') {
                if (this.mode) {
                    try {
                        const r = (await axios.post('https://f2022.suwageeks.org/suwamp/api/users', {
                            name: this.name,
                            password: this.password
                        })).data[0]
                        this.$store.commit('setLoginHash', r.LoginHash)
                    } catch (e) {
                        if (e.response.status === 403) {
                            this.error = 'その名前は既に登録されてるよ';
                        }
                    }
                } else {
                    try {
                        const r = (await axios.post('https://f2022.suwageeks.org/suwamp/api/login', {
                            name: this.name,
                            password: this.password
                        })).data
                        this.$store.commit('setLoginHash', r.LoginHash)
                    } catch (e) {
                        if (e.response.status === 403) {
                            this.error = '名前かパスワードが間違っているよ';
                        }
                    }
                }
            } else {
                this.error = '名前とパスワードを入力してね';
            }
        },
        changeMode() {
            this.mode = !this.mode
        }
    }
}
</script>

<style scoped>
#frame {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background-color: rgba(59, 80, 70, 0.5);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;

    color: black;
}
#content {
    background-color: #fff;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
}

#title {
    margin-bottom: 30px;
    z-index: 11000;
}
#subtitle {
    position: relative;
    z-index: 10100;
}

#error {
    color: red;
    margin: 15px 0;
}

.form {
    width: 90%;
    margin: 5px 0;
}
.form label {
    display:block;
    text-align: left;
    padding: 0 8%;
}
.form input {
    padding: 7px;
    margin: 5px;
    width: 80%;
    cursor: pointer;
    color: rgb(106, 209, 156);
    border: solid 2px rgb(106, 209, 156);
    border-radius: 50px;
    transition: color ease 0.2s;
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

p {
    margin: 5px;
    cursor: pointer;
}
p:hover {
    color: blue;
}

.mode-enter-active, .mode-leave-active {
  transition: opacity .5s;
}
.mode-enter, .mode-leave-to {
  opacity: 0;
}
</style>
