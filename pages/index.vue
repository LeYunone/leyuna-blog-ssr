<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="main-m">
      中间内容
    </div>
  </div>

</template>

<script>
  export default {
    name: 'index',
    data() {
      return {}
    },
    head() {
      return {
        title: '乐云一',
        meta: [
          {
            name: "keywords",
            content: "乐云一,博客,Java,后端开发,杂谈,番剧"
          }, {
            hid: 'description', name: 'names', content: '乐云一'
          }
        ]
      }
    }
  }
</script>
<style>
  .main-m{
    padding-top: 3.75rem;;
    padding-left: calc(22rem);
  }
</style>
