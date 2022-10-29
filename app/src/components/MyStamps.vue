<template>
    <div class="container">
        <h3>
            Stamp List
        </h3>
        <div class="stamp-list">
            <div class="stamp" v-for="stamp in stamps" :key="stamp.id">
                <img :src="`/suwamp/stamps/${stamp.Name}.png`" />
                <h5>
                    {{ stamp.Name }}
                </h5>
                <h6>
                    {{ stamp.Location}}
                </h6>
                <p>{{ stamp.Pushed }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'

export default {
    name: 'MyStamps',
    data: () => {
        return {
            stamps: []
        }
    },
    mounted: async function() {
        try {
            this.stamps = (await axios.get('https://f2022.suwageeks.org/suwamp/api/stamps/list', {
                headers: {
                    Auth: this.$store.getters.getLoginHash,
                },
                data: {}
            })).data


            const res = (await axios.get('https://f2022.suwageeks.org/suwamp/api/pushed/list', {
                headers: {
                    Auth: this.$store.getters.getLoginHash,
                },
                data: {}
            })).data
            console.log(res)
        } catch(e) {
            console.log(e);
        }
    }
}
</script>
  
<style scoped>
h3 {
  padding: 1rem 3rem;
  -webkit-transform: skew(-15deg);
  transform: skew(-15deg);
  color: #fff;
  background-image: -webkit-gradient(linear, left top, right top, from(#209cff), to(#68e0cf));
  background-image: -webkit-linear-gradient(left, #209cff 0%, #68e0cf 100%);
  background-image: linear-gradient(to right, #209cff 0%, #68e0cf 100%);
}

.stamp-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding-top: 3vh;
}
.stamp {
    width: 14rem;
    padding-top: 3vh;
}

img{
    width: 30%;
    border-radius: 50%;
    border: solid 2px rgb(2, 131, 35);
    transform: rotate(-25deg);
}
</style>
