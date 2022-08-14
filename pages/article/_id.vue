<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="main-m">
      <div id="nav-card" class="nav-card">
        <!--        <div v-for="anchor in titles"-->
        <!--             :style="{ padding: `5px 0 10px ${anchor.indent * 20}px` }"-->
        <!--             @click="handleAnchorClick(anchor)">-->
        <!--          <a style="cursor: pointer">{{ anchor.title }}</a>-->
        <!--        </div>-->
      </div>
      <div class="main-content">
        <header class="blog-header">
          <p class="blog-title">{{article.title}}</p>
          <div class="blog-info">
            <span class="el-icon-timer">{{article.createDt}}</span><span>-</span> <span class="el-icon-edit">{{article.updateDt}}</span>
          </div>
        </header>
        <v-md-editor ref="preview" mode="preview" v-model="article.blogContent" width="500px"
                     height="100%"></v-md-editor>
      </div>
<!--      <Comment :id=id></Comment>-->
    </div>
  </div>

</template>

<script>
  import axios from "axios";

  export default {
    name: 'article',
    data() {
      return {
        article: "",
        id: "",
      }
    },
    async asyncData({params}) {
      let articleId = params.id;
      const {data} = await axios({
        url: "/leyuna/blog/blog/" + params.id,
        method: "GET",
      })
      return {article: data.data, id: articleId};
    },
    mounted: function () {
      //默认得到该顶级菜单下的所有文章
    },
    methods: {},
  }
</script>

<style>
  .blog-header {
    text-align: center;
  }

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
