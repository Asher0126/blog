<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px">
      <el-form-item label="文章标题：" prop="title">
        <el-input v-model="temp.title" placeholder="请输入标签名称"/>
      </el-form-item>

      <!-- 分类信息的无限级联：目前最多不超过2级 -->
      <el-form-item label="所属分类：" prop="type_id">
        <el-cascader
          :options="typeOptions"
          v-model="typeValue"
          :props="{
            value: 'id',
            label: 'title'
          }"
          @change="handleTypeChange"/>
      </el-form-item>

      <!-- 给文章贴标签 -->
      <el-form-item class="tag-wrapper" label="贴标签：" prop="tag_id">
        <el-select
          v-model="temp.tag_id"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签">
          <el-option
            v-for="item in tags"
            :key="item.id"
            :label="item.title"
            :value="item.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="文章内容：" prop="content">
        <!-- <el-input v-model="temp.content" type="textarea" placeholder="请输入标签名称"/> -->
        <mavon-editor ref="md" v-model="temp.content" @imgAdd="handleEditorUpload"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="warning" @click="handleClose">保存草稿</el-button>
      <el-button :loading="sureBtnLoading" type="primary" @click="status === 'add' ? createData() : updateData()">确定</el-button>
    </div>
  </div>
</template>

<script>
/**
 * 需要的接口：
 *  文本编辑器
 *
 *  添加文章：
 *  1. 获取分类信息
 *  2. 获取标签信息
 *  3. 保存文章接口
 *
 *  修改文章：
 *  1. 获取文章信息
 *  2. 获取分类和标签信息
 *  3. 修改文章接口
 *
 *  保存到草稿：
 *  1. 走添加，但是状态是草稿箱
 */
import { getPostDetail, createPost, updatePost, createUpload } from '@/api/post'
import { getTypeList } from '@/api/type'
import { getTagList } from '@/api/tag'
import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

export default {
  data () {
    return {
      temp: {
        id: undefined,
        title: '',
        type_id: '',
        tag_id: [],
        content: ''
      },
      rules: {
        title: [{ required: true, message: '请输入分类名称', trigger: 'change' }]
      },
      typeValue: [],
      typeOptions: [],
      tags: [],
      status: 'add',
      sureBtnLoading: false
    }
  },

  watch: {
    typeValue (val) {
      // 获取数组最后一个值
      this.temp.type_id = val[val.length - 1]
    }
  },

  created () {
    console.log('this.$route:', this.$route)
    this.init()
  },

  methods: {
    /**
     * init
     */
    async init () {
      // 确认是新增，还是修改
      this.status = this.$route.name === 'post-add' ? 'add' : 'edit'
      console.log('init:', this.status, this.$route.name)

      // 获取分类配置项
      const type = await getTypeList()
      this.typeOptions = type.data

      // 获取已有的标签
      const tag = await getTagList()
      this.tags = tag.data

      // 如果是修改，则获取修改的参数，并获取远程数据
      if (this.status === 'edit') {
        this.id = this.$route.query.id
        await this.getPostDetail()
      }
    },
    /**
     * 回车按键按下
     */
    handleEnterDown (e) {
      console.log('e:', e)
    },
    /**
     * 分类级连菜单改变事件
     */
    handleTypeChange (value) {
      console.log(value)
    },
    /**
     * 重制表单数据
     */
    refreshFormData () {
      this.temp = {
        id: undefined,
        title: undefined,
        type_id: [],
        tag_id: [],
        content: ''
      }
    },
    /**
     * 修改的时候获取详情
     */
    async getPostDetail () {
      // console.log('getPostDetail', this.id)
      const result = await getPostDetail(this.id)

      this.temp.title = result.title
      this.typeValue = [result.type_id]
      this.temp.content = result.content
      result.tags.forEach(v => {
        this.temp.tag_id.push(v.id)
      })
    },
    /**
     * 判断是否是当前路由
     */
    isActive (route) {
      return route.path === this.$route.path
    },
    /**
     * 添加 或者 修改完成，跳转到首页
     */
    goIndex () {
      // 2. 跳转到文章列表
      this.$router.push({ name: 'post-index' })
      // 3. 关闭当前页签
      const view = this.$route
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        this.$router.push('/post')
      })
    },
    /**
     * 发送请求，添加数据
     */
    createData () {
      this.sureBtnLoading = true
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createPost(this.temp).then(() => {
            // 1. 提醒
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            // 2. 去首页
            setTimeout(() => this.goIndex(), 2000)
          })
        } else {
          this.sureBtnLoading = false
        }
      })
    },
    /**
     * 修改数据
     */
    updateData () {
      this.sureBtnLoading = true
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp, { id: this.id })

          updatePost(tempData).then(() => {
            this.handleClose(true) // 修改成功，关闭dialog
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
          // 2. 去首页
          setTimeout(() => this.goIndex(), 2000)
        } else {
          this.sureBtnLoading = false
        }
      })
    },
    /**
     * 关闭当前对话框
     */
    handleClose (val) {
      this.$emit('close', val)
    },
    /**
     * 图片上传
     */
    async handleEditorUpload (pos, file) {
      const formdata = new FormData()
      formdata.append('image', file)
      const url = await createUpload(formdata)
      this.$refs.md.$img2Url(pos, url)
    }
  }
}
</script>

<style lang="scss">
.tag-wrapper {
  .el-tag {
    margin-right: 10px;
  }
}
</style>

