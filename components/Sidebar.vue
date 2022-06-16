<template>
  <div class="leftDiv">
    <div class="sidebar">
      <el-row>
        <el-col>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>技术文章</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">Java基础</el-menu-item>
                <el-menu-item index="1-2">Redis入门</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">开发日记</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">刷题日记</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">不正经</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-setting"></i>
              <span slot="title">网站公告</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div @click="sidebarBtn" class="sidebar-wrapper">
      <span class="left-btn el-icon-caret-left"></span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      sidebarBtn() {
        if (!$(".leftDiv").hasClass("toggle")) {
          $(".leftDiv").addClass("toggle")
        } else {
          $(".leftDiv").removeClass("toggle")
        }
      }
    }
  };
</script>

<style type="text/css" >
  .leftDiv {
    float: left;
    position: absolute;
    width: 17rem;
    height: 80%;
    transition: transform 0.5s;
    transform: translateX(0%);
    border-right: solid 1px #e6e6e6;
  }
  .el-menu{
    border-right: 0;
  }
  .leftDiv.toggle{
    transform: translateX(-100%);
  }

  .sidebar {
    overflow: hidden;
    white-space: nowrap;
  }

  .sidebar-wrapper {
    position: fixed;
    top: 3.75rem;
    bottom: 0;
    left: 100%;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    transition: left .3s ease;
  }
  .left-btn{
    bottom: 0;
  }
  .sidebar-wrapper:hover{
    background-color: hwb(0deg 97% 3%);
  }
</style>
