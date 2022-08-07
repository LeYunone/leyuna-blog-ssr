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
        cardList:[]
      }
    },
    async asyncData({params}){
      const { data } = await axios.get("/leyuna/blog/blogs")
      console.log(data.data)
      return  {cardList:data.data.records}
    },
    mounted: function () {
      //默认得到该顶级菜单下的所有文章
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
