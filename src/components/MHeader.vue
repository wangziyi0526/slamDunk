<template>
    <div class="header">
        {{title}}
    </div>
</template>
<script>
    export default {
        props:["title"],
        data(){
            return {}
        },
        computed: {},
        components: {},
        methods: {}
    }
</script>
<style scoped>
  .header{
    background: #fff;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #EE7600;
    font-size: 16px;
    font-weight: bold;
  }
</style>
