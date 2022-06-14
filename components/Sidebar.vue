<template>
    <div class="sidebar">
      <el-row class="tac">
        <el-col :span="7">
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
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        setup() {
        },
    };
</script>

<style>
    .sidebar {
    }
</style>
