<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="main-m">
      <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in cardList" :key="'article'+index">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-card shadow="hover" class="indexContent" style="height:403px;">
              <a target="_blank" :href="'#/blog?blogId='+item.id" class="a_title">
                <div class="article_title">{{item.title}}</div>
              </a>
              <div class="clearfix">
                <span></span>
              </div>
              <el-divider content-position="center"><i class="el-icon-date"></i>{{item.createDt}}
              </el-divider>
              <div class="blog-content">
                <div class="blog-content-into" v-html="item.remarks"></div>
              </div>
              <div v-if="item.tag!=null">
                <el-divider content-position="left">乐云一
                  <el-link :href="'#/blogindex?tagName='+str" class="home-tag"
                           v-for="(str,index) in item.tag.split(',')">{{str}}
                  </el-link>
                </el-divider>
              </div>
              <div v-else>
                <el-divider content-position="left">乐云一</el-divider>
              </div>
            </el-card>
            <!--            <div class="openBtn" @click="open('blog'+item.id)">-->
            <!--              <svg class="icon" aria-hidden="true">-->
            <!--                <use xlink:href="#el-icon-transfer"></use>-->
            <!--              </svg>-->
            <!--            </div>-->
            <div class="md-editor" :id="'blog'+item.id" name="draw" style="display: none">
              <v-md-editor v-model="item.blogContent" mode="preview"></v-md-editor>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </div>
  </div>

</template>

<script>
  import axios from "axios";

  export default {
    name: 'cardIndex',
    data() {
      return {
        cardList: []
      }
    },
    async asyncData({params}) {
      const {data} = await axios.get("/leyuna/blog/blogs")
      console.log(data.data)
      return {cardList: data.data.records}
    },
    mounted: function () {
      /[4/默认得到该顶级菜单下的所有文章
    },
    methods: {},
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

  .right-bott {
    height: 300px;
  }

  .home-tag {
    padding: 7px;
    color: #f6a939;
    border-radius: 4px;
  }

  .right-top {
    margin-top: 5px;
    padding: .6rem 1rem;
    border-left: 4px solid #4eaaff;;
    background-color: rgba(10, 120, 231, .05);
    height: 310px;
    font-family: 'PingFang SC', 'Microsoft YaHei', Roboto, Arial, sans-serif;
  }

  .a-font {
    color: #476582;
  }

  .box-right-card {
    position: absolute;
    top: 10px;
    right: 100px;
    height: 670px;
    width: 300px;
    float: right;
    opacity: 0.9;
  }

  .clearfix {
    clear: both;
  }

  .openBtn {
    position: relative;
    bottom: 20px;
    text-align: center;
    background-color: #fafafa;
  }

  .draw-enter-active, .draw-leave-active {
    transition: all 1s ease;
  }

  .draw-enter, .draw-leave-to {
    height: 0;
  }

  .md-editor {
    position: relative;
    bottom: 20px;
    opacity: 0.97;
    height: 100%;
  }

  .blog-content {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #348fc3;
    margin: 20px 0;
  }

  .blog-content-into {
    padding: 7px;
  }

  .sharelistBox {
    transition: all 0.5s ease-out;
    font-size: 15px;
    padding-left: 90px;
  }

  .indexContent {
    opacity: 0.96;
  }

  .article_title {
    text-align: center;
    color: #409EFF;
    margin: 0;
    padding: 10px;
    font-size: 1.5rem;
    font-weight: 900;
    font-family: 'Hiragino Sans GB';
  }

  .article_title:hover {
    color: #E6A23C;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .box-card {
    width: 500px;
    height: 350px;
    background-color: white;
    display: block;
    right: 28px;
    top: 40px;
    bottom: 40px;
    position: relative;
    overflow: hidden;
    float: right;
  }

  .upload-frame {
    width: 360px;
    margin-left: 10px;
  }

  .page-card {
    margin-top: 14px;
    text-align: center;
  }
</style>
