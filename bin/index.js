#! /usr/bin/env node
const { Command } = require('commander')
const program = new Command()

program
    .name('my cli')
    .description('这里是描述文案')
    .version('1.0.0')

program.command('create <app-name>')
    .description('创建一个新工程')
    // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
	.option('-f, --force', 'overwrite target directory if it exist')
    // 这个name 就代表第一个必填参数 options就代表其余， 如果有第二个就在写一个，最后一个永远是剩余参数
    .action((name,option) => {
        // 打印执行结果
        require("../lib/create")(name,option);
    })

// 解析用户执行命令传入参数
program.parse(process.argv);