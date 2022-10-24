<template>
    <div class="error">
        <h1>Error 404</h1>
        <h2>Not Found</h2>
        <router-link to="/">Homeに戻る</router-link>
    </div>
</template>

<script>
export default {
    name: '404View'
}
</script>

<style scoped>
.error {
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
</style>
  