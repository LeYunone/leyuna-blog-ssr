<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="main-m">
    </div>
  </div>

</template>

<script>
  import axios from "axios";

  export default {
    name: 'noteIndex',
    data() {
      return {

      }
    },
    mounted: function () {
      //默认得到该顶级菜单下的所有文章

      this.loadBlogNav();
    },
    methods: {
    },
  }
</script>

<style>
  .main-m {
    padding-top: 3.75rem;;
    padding-left: calc(22rem);
    margin-left: 100px;
    transition: margin-left 0.5s;
  }
  .main-m.toggle {
    margin-left: -180px;
  }
</style>
