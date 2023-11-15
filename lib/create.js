const path = require('path')
// fs-extra 对fs模块的扩展，支持promise语法
const fs = require('fs')
// 用于交互式询问用户问题
const inquirer = require('inquirer')
// 导出Generator类
const Generator = require('./Generator')

// 抛出一个方法用来接收用户要创建的文件夹（项目名）和 其他参数
module.exports = async function (name, options) {
    // 当前命令行选择的目录
    const cwd = process.cwd()
    // 需要创建的目录地址
    const targetAir = path.join(cwd, name)
    // 判断是否存在相同文件夹
    // 目录是否已经存在
    if (options.force) {
        await fs.remove(targetAir)
    } else {
        // 询问用户是否确定要覆盖
        let { action } = inquirer.createPromptModule([
            {
                name: 'action',
                type: 'list',
                message: '目录已存在，请选择',
                choices: [
                    {
                        name: '覆盖',
                        value: 'overwrite'
                    }, {
                        name: '取消',
                        value: false
                    }
                ]
            }
        ])
        // 如果用户拒绝覆盖停止剩余操作
        if (!action) {
            // return
        } else if (action === 'overwrite') {
            // 移除已存在的目录
            console.log(`\r\nRemoving...`);
            await fs.remove(targetAir)
        }
    }
    // 新建generator类
    const generator = new Generator(name, targetAir);
    generator.create();
}