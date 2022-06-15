<template>
  <div>
    <div @click="sidebarBtn" class="sidebar-wrapper">
      <span class="el-icon-caret-left"></span>
    </div>
    <div class="sidebar">
      <el-row >
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
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods:{
      sidebarBtn(){

      }
    }
  };
</script>

<style>
  .sidebar {
    font-size: 16px;
    width: 20rem;
    position: fixed;
    z-index: 13;
    margin: 0;
    top: 3.6rem;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    overflow-y: auto;
    transform: translateX(0%);
    transition: transform .2s;
  }
  .sidebar-wrapper{
    position: fixed;
    top: calc(3.75rem);
    bottom: 0;
    left: calc(20rem);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    transition: left .3s ease;
  }
</style>
