'use strict';

const Service = require('egg').Service;

class FileService extends Service {
  async upload() {
    try {
      const OSS = require('ali-oss');
      const oss = new OSS({
        region: 'oss-cn-beijing',
        // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
        accessKeyId: 'LTAIo4jjQ03uCUR3',
        accessKeySecret: 'HRH3wQlxLqN0LQvwINj2svEQGCl1b1',
        bucket: 'junblog',
      });

      // 1. 引入所需对象
      const utils = require('../helper/utils');
      const path = require('path');

      // 2. 获取文件
      const { files } = this.ctx.request;
      const file = files[0];
      console.log('service-upload:', file);

      // 3. 获取OSS所需参数
      const objectName = utils.getFilename() + '.' + path.extname(file.filename);
      const localFile = file.filepath;

      // 4. 进行上传
      return await oss.put(objectName, localFile);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = FileService;
