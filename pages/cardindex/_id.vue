<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="main-m">
      <div class="card-content">
        <el-col  class="card" v-for="(item,index) in cardList" :key="'article'+index">
          <el-row >
            <el-col >
              <el-card shadow="hover" class="indexContent">
                <header>
                  <nuxt-link :to="'/article/'+item.id">
                    <div class="article_title">{{item.title}}</div>
                  </nuxt-link>
                  <el-divider content-position="center"><i class="el-icon-date"></i>{{item.createDt}}</el-divider>
                </header>

                <div class="card-mid">
                  <v-md-editor ref="preview" mode="preview" v-model="item.foreword" width="100%"
                               height="100%"></v-md-editor>
                </div>

                <div class="card-bottom">
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
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </div>
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
      const {data} = await axios({
        url: "/leyuna/blog/getTopMenuBlogs",
        method: "GET",
        params: {"menuId": params.id}
      })
      if (data.status) {
        return {cardList: data.data.records}
      }
    },
    mounted: function () {
      //默认得到该顶级菜单下的所有文章
    },
    methods: {},
  }
</script>

<style>
  .card{
    margin-bottom: 40px;
  }

  .home-tag {
    padding: 7px;
    color: #f6a939;
    border-radius: 4px;
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
  .card-content{
    margin: 0 auto;
    height: 100%;
    width: 55%;
  }
</style>
