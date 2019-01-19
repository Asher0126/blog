<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="visible" :fullscreen="false" :before-close="handleClose">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
      <el-form-item label="日期" prop="timestamp">
        <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="请选择日期"/>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="temp.title" placeholder="请输入标题"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="temp.status" class="filter-item" placeholder="请选择">
          <el-option v-for="item in statusOptions" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark" type="textarea" placeholder="备注信息"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getArticleDetail, createArticle, updateArticle } from '@/api/template'
export default {
  props: {
    dialogStatus: {
      type: String,
      default: 'create'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      statusOptions: [{ id: 1, name: '启用' }, { id: 2, name: '禁用' }],
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      textMap: {
        update: '修改',
        create: '添加'
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },

  created () {
    if (this.dialogStatus === 'update') { this.getArticleDetail() }
  },
  methods: {
    /**
     * 修改的时候获取详情
     */
    getArticleDetail () {
      getArticleDetail().then(() => {})
    },
    /**
     * 发送请求，添加数据
     */
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.handleClose() // 添加成功，关闭dialog
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    /**
     * 修改数据
     */
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.handleClose() // 修改成功，关闭dialog
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    /**
     * 关闭当前对话框
     */
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>

