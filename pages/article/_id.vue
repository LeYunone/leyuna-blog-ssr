<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="main-m">
      <div id="nav-card" class="nav-card">
<!--          <div v-for="anchor in titles"-->
<!--               :style="{ padding: `5px 0 10px ${anchor.indent * 20}px` }"-->
<!--               @click="handleAnchorClick(anchor)">-->
<!--            <a style="cursor: pointer">{{ anchor.title }}</a>-->
<!--          </div>-->
      </div>
      <div class="article-content">
        <header class="blog-header">
          <h1 class="blog-title">{{article.title}}</h1>
          <div class="blog-info">
            <span class="el-icon-timer"></span>
            <time>{{article.createDt}}</time>
            <span style="margin: 0 0.5rem;">-</span>
            <span class="el-icon-edit"></span>
            <time>{{article.updateDt}}</time>
          </div>
        </header>
        <v-md-editor ref="preview" mode="preview" v-model="article.blogContent" width="100%"
                     height="100%"></v-md-editor>
        <Comment :id=id></Comment>
      </div>
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
    },
    methods: {},
  }
</script>

<style>
  .blog-header {
    position: relative;
    text-align: center;
  }

  .article-content{
    margin: 0 auto;
    width: 90%;
  }
</style>
