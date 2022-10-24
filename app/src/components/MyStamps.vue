<template>
    <div class="container">
        <h3>
            My Stamps
        </h3>
        <div class="stamp-list">
            <div class="stamp">
                <img src="@/assets/logo.png" />
                <h5>
                    SuwaGeeksブース
                </h5>
            </div>
            <div class="stamp">
                <img src="@/assets/logo.png" />
                <h5>
                    SuwaGeeksブース
                </h5>
            </div>
            <div class="stamp">
                <img src="@/assets/logo.png" />
                <h5>
                    SuwaGeeksブース
                </h5>
            </div>
            <div class="stamp">
                <img src="@/assets/logo.png" />
                <h5>
                    SuwaGeeksブース
                </h5>
            </div>
            <div class="stamp">
                <img src="@/assets/logo.png" />
                <h5>
                    SuwaGeeksブース
                </h5>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'MyStamps',
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
