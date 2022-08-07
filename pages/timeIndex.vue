<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="main-m">
      <div id="top-time-index">
        <el-steps space="300px" finish-status="success">
          <el-step title="2022"></el-step>
          <el-step title="2021"></el-step>
        </el-steps>
      </div>
      <div id="mid-time-index">
        <h2 class="archive-year">2022</h2>
        <div class="mid-time-line">
          <el-timeline>
            <el-timeline-item>
              1231232
            </el-timeline-item>
            <el-timeline-item>
              1231232
            </el-timeline-item>
            <el-timeline-item>
              1231232
            </el-timeline-item>
            <el-timeline-item>
              1231232
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from "axios";

  export default {
    name: 'timeIndex',
    data() {
      return {
        timeList: []
      }
    },
    async asyncData({params}) {
      const {data} = await axios.get('/leyuna/blog/getTopMenuBlogs')
      console.log(data.data)
      return {timeList: data.data}
    },
    mounted: function () {
      //默认得到该顶级菜单下的所有文章
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

  .archive-year {
    font-family: 'Source Code Pro', Consolas, Monaco, SFMono-Regular, 'Ubuntu Mono', Menlo, monospace;
    color: #0078e7;
    margin: 0 1.5rem;
  }

  h2 {
    font-size: 2.2rem;
    font-weight: 400;
  }
</style>
