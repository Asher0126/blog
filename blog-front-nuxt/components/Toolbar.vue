<template>
  <div class="toolbar">
    <!-- 左侧目录 -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in typeList"
          :key="i"
          :to="{ path: '/', query: { type_id: item.id } }"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>apps</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- 顶部工具栏 -->
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- 右侧标签栏目 -->
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <h3 class="tag-title">
        标签
      </h3>
      <v-chip v-for="(item, index) in tagList" :key="index" @click="handleClickTag(item)">
        {{ item.title }}
      </v-chip>
      <!-- <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>
              compare_arrows
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list> -->
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  components: {},
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      typeList: [],
      tagList: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '聊聊前端'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getMenuList()
    },
    /**
     * 获取typeList和tagList
     */
    async getMenuList() {
      const res = await this.$axios.$get('http://localhost:7001/menu')
      console.log(res)
      this.typeList = res.data.type
      this.tagList = res.data.tag
    },
    /**
     * 告诉index获取指定tag对应的文章
     */
    handleClickTag(item) {
      this.$router.push({ path: '/', query: { tag_id: item.id } })
    }
  }
}
</script>

<style lang="scss">
.tag-title {
  padding: 20px;
}
</style>
