<template>
    <div id="frame">
        <div id="content">
            <h1 id="title">SWAMP!</h1>
            <h2 id="subtitle">in 新風祭2022</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TitleAnime',
}
</script>

<style scoped>
#frame {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background-color: rgb(66, 184, 131);
    animation: backgroundAnime 1s 1.5s;
    animation-fill-mode: forwards;
    z-index: 100000;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #fff;
}
#title {
    animation: TitleAnime 0.5s;
    animation-fill-mode: forwards;
    z-index: 110000;
    font-family: "Nico Moji";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#subtitle {
    position: relative;
    z-index: 101000;
    font-family: "Nico Moji";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#subtitle::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgb(66, 184, 131);
    top: 0;
    left: 0;
    animation: subTitleAnime 0.2s 0.7s;
    animation-fill-mode: forwards;
    z-index: 101001;
}


@keyframes backgroundAnime {
    0% {
        top: 0;
        right: 0;
        transform: rotate(0deg);
    }
    100% {
        top: -100vh;
        right: -100vh;
        transform: rotate(90deg);
    }
}
@keyframes TitleAnime {
    0% {
        
        transform: scale(4) translateY(-100%);
    }
    100% {
        transform: scale(1) translateY(0);
    }
}
@keyframes subTitleAnime {
    0% {
        left: 0;
    }
    100% {
        left: 100%;
    }
}

</style>