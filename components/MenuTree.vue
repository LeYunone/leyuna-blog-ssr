<template>
  <div>
    <template v-for="menu in this.menuData">
      <nuxt-link :to="menu.menuUrl+'/'+menu.menuId">
        <el-submenu :key="menu.menuId" :index="menu.menuId" v-if="menu.childrenMenu">
          <template slot="title">
            <!--          <i :class="menu.icon"></i>-->
            <span slot="title">{{menu.menuName}}</span>
          </template>
          <menu-tree :menuData="menu.childrenMenu"></menu-tree>
        </el-submenu>
        <el-menu-item :route="menu.menuUrl" :key="menu.menuId" :index="menu.menuId" v-else>
          <!--        <i :class="menu.icon"></i>-->
          <span slot="title">{{menu.menuName}}</span>
        </el-menu-item>
      </nuxt-link>
    </template>
  </div>
</template>

<script>
  export default {
    props: ['menuData'],
    name: 'MenuTree'
  }
</script>
