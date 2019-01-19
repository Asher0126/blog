<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="visible" :fullscreen="false" :before-close="handleClose">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px">
      <el-form-item label="登录名" prop="name">
        <el-input v-model="temp.name" placeholder="请输入登录名"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="temp.password" type="password" placeholder="请输入密码"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getManagerDetail, createManager, updateManager } from '@/api/manager'
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
      statusOptions: [{ id: 1, name: '启用' }, { id: 2, name: '禁用' }],
      temp: {
        id: undefined,
        name: '',
        password: ''
      },
      textMap: {
        update: '修改',
        create: '添加'
      },
      rules: {
        name: [{ required: true, message: '请设置登录名', trigger: 'change' }],
        password: [{ required: true, message: '请设置密码', trigger: 'change' }]
      }
    }
  },

  watch: {
    visible (val) {
      if (val) {
        // 修改的时候，获取详情数据
        if (this.dialogStatus === 'update') { this.getManagerDetail() }

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
        name: undefined,
        password: undefined
      }
    },
    /**
     * 修改的时候获取详情
     */
    async getManagerDetail () {
      // console.log('getManagerDetail', this.id)
      const result = await getManagerDetail(this.id)

      // 只赋值登录名，密码不用
      this.temp.name = result.name
    },
    /**
     * 发送请求，添加数据
     */
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createManager(this.temp).then(() => {
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

          updateManager(tempData).then(() => {
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

