<template>
    <div>
      <m-header title="添加人物"></m-header>
      <div class="add">
        <div class="group">
          <label for="bookName">姓名</label>
          <input type="text" id="bookName" placeholder="请输入人物姓名" v-model="book.bookName">
        </div>
        <div class="group">
          <label for="bookName">头像</label>
          <input type="text" id="bookCover" placeholder="请输入人物头像" v-model="book.bookCover">
        </div>
        <div class="group">
          <label for="content">人物详情</label>
          <input type="text" id="content" placeholder="请输入人物详情" v-model="book.content">
        </div>
        <div class="group">
          <button @click="add">添加人物</button>
        </div>
      </div>
    </div>
</template>
<script>
    import MHeader from 'components/MHeader';
    import {addBook} from 'api';
    export default {
        data(){
            return {
                book:{
                    bookName:'',
                    bookCover:'',
                    content:''
                }
            }
        },
        computed: {},
        components: {MHeader},
        methods: {
            add(){
              addBook(this.book).then(res=>{
                 //添加成功后的逻辑
                 this.$router.push('/list');
              });
            }
        }
    }
</script>
<style scoped lang="less">
  .add{
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    .group{
      label{
        font-size: 16px;
        line-height: 25px;
      }
      input{
        border: 1px solid #ccc;
        height: 30px;
      }
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      button{
        height: 35px;
      }
    }
  }
</style>
