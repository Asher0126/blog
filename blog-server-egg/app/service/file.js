'use strict';

const Service = require('egg').Service;
const path = require('path');
const sendToWormhole = require('stream-wormhole');

class FileService extends Service {
  async upload() {
    // 2. 获取文件
    const stream = await this.ctx.getFileStream();

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

      // 3. 获取OSS所需参数
      const objectName = utils.getFilename() + path.extname(stream.filename);

      // 4. 进行上传
      return await oss.put(objectName, stream);
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }
  }
}

module.exports = FileService;
