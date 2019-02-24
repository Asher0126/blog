<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-for="(item, index) in postList" :key="index" class="post-item">
        <v-img
          class="white--text"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">Top 10 Australian beaches</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <!-- <h3 class="display-2 post-title">
          {{ item.title }}
        </h3> -->

        <v-card-title>
          <div>
            <span class="grey--text">{{ item.updated_at }}</span><br>
            <div class="post-detail">
              {{ item.content }}
            </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat :nuxt="true">
            查看详情
          </v-btn>
        </v-card-actions>
      </v-card>

      <div v-if="totalPage" class="pagination-wrapper">
        <v-pagination
          v-model="query.page"
          :length="totalPage"
          @input="handlePageChange"
        />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
// import * as api from '~/assets/js/api'

export default {
  data() {
    return {
      postList: [],
      // page: 1,
      totalPage: '',
      query: {
        page: 1,
        type_id: '',
        tag_id: ''
      }
    }
  },
  watch: {
    $route(v) {
      this.getPostList()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getPostList()
    },
    /**
     * 获取文章列表
     */
    async getPostList() {
      const params = Object.assign({}, this.query, {
        type_id: this.$route.query.type_id,
        tag_id: this.$route.query.tag_id
      })
      console.log('query:', params)

      const res = await this.$axios.$get('http://localhost:7001', {
        params
      })
      // console.log(res)
      this.postList = res.data.data
      // 总页码数量
      this.totalPage = Math.ceil(res.data.total / 10)
    },
    /**
     * 监听页码发生改变
     */
    handlePageChange() {
      // console.log('this.page:', this.page)
      this.getPostList()
    }
  }
}
</script>

<style>
.post-item {
  margin-bottom: 20px;
}
.post-title {
  padding: 16px 16px 0;
}
.pagination-wrapper {
  display: flex;
  justify-content: center;
}
</style>
