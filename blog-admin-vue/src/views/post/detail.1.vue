<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="visible" :fullscreen="false" :before-close="handleClose">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px">
      <el-form-item label="标签名称：" prop="title">
        <el-input v-model="temp.title" placeholder="请输入标签名称"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getTagDetail, createTag, updateTag } from '@/api/tag'
export default {
  props: {
    dialogStatus: {
      type: String,
      default: 'create'
    },
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      temp: {
        id: undefined,
        title: ''
      },
      textMap: {
        update: '修改',
        create: '添加'
      },
      rules: {
        title: [{ required: true, message: '请输入分类名称', trigger: 'change' }]
      }
    }
  },

  watch: {
    visible (val) {
      if (val) {
        // 修改的时候，获取详情数据
        if (this.dialogStatus === 'update') { this.getTagDetail() }

        this.$nextTick(() => {
          // 清除数据和验证状态
          this.$refs['dataForm'].resetFields()
        })
      }
    }
  },

  created () {},

  methods: {
    refreshFormData () {
      this.temp = {
        id: undefined,
        title: undefined
      }
    },
    /**
     * 修改的时候获取详情
     */
    async getTagDetail () {
      // console.log('getTagDetail', this.id)
      const result = await getTagDetail(this.id)

      // 只赋值登录名，密码不用
      this.temp.title = result.title
    },
    /**
     * 发送请求，添加数据
     */
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createTag(this.temp).then(() => {
            this.handleClose(true) // 添加成功，关闭dialog
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
          const tempData = Object.assign({}, this.temp, { id: this.id })

          updateTag(tempData).then(() => {
            this.handleClose(true) // 修改成功，关闭dialog
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
    handleClose (val) {
      this.$emit('close', val)
    }
  }
}
</script>

