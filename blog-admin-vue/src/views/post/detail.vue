<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px">
      <el-form-item label="文章标题：" prop="title">
        <el-input v-model="temp.title" placeholder="请输入标签名称"/>
      </el-form-item>

      <!-- 分类信息的无限级联：目前最多不超过2级 -->
      <el-form-item label="所属分类：" prop="type_id">
        <el-cascader
          :options="options"
          v-model="selectedOptions"
          @change="handleTypeChange"/>
      </el-form-item>

      <!-- 给文章贴标签 -->
      <el-form-item class="tag-wrapper" label="贴标签：" prop="tag_id">
        <el-tag
          v-for="tag in tags"
          :key="tag.name"
          :type="tag.type"
          closable>
          {{ tag.name }}
        </el-tag>
        <el-input v-model="temp.tag_id" placeholder="请输入标签名称" @keydown="handleEnterDown"/>
      </el-form-item>

      <el-form-item label="文章内容：" prop="content">
        <el-input v-model="temp.content" type="textarea" placeholder="请输入标签名称"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="warning" @click="handleClose">保存草稿</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
    </div>
  </div>
</template>

<script>
import { getPostDetail, createPost, updatePost } from '@/api/post'
export default {
  data () {
    return {
      temp: {
        id: undefined,
        title: '',
        type_id: '',
        tag_id: '',
        content: ''
      },
      rules: {
        title: [{ required: true, message: '请输入分类名称', trigger: 'change' }]
      },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      selectedOptions: [],
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' }
      ]
    }
  },

  watch: {
    visible (val) {
      if (val) {
        // 修改的时候，获取详情数据
        if (this.dialogStatus === 'update') { this.getPostDetail() }

        this.$nextTick(() => {
          // 清除数据和验证状态
          this.$refs['dataForm'].resetFields()
        })
      }
    }
  },

  created () {},

  methods: {
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
        title: undefined
      }
    },
    /**
     * 修改的时候获取详情
     */
    async getPostDetail () {
      // console.log('getPostDetail', this.id)
      const result = await getPostDetail(this.id)

      // 只赋值登录名，密码不用
      this.temp.title = result.title
    },
    /**
     * 发送请求，添加数据
     */
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createPost(this.temp).then(() => {
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

          updatePost(tempData).then(() => {
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

<style lang="scss">
.tag-wrapper {
  .el-tag {
    margin-right: 10px;
  }
}
</style>

