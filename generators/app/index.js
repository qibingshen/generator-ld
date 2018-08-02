'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log('构造函数执行完成');
  }

  initializing() {
    this.props = {};
    this.log('初始化完成');
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the laudable ${chalk.red('generator-ld')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'appname',
        message: 'give Your project a name',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'cool',
        message: 'Would you like to enable the Cool feature?'
      },
      {
        type: 'input',
        name: 'projectDesc',
        message: 'Please input project description:'
      },
      {
        type: 'list',
        name: 'projectLicense',
        message: 'Please choose license:',
        choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
      },
      {
        type: 'input',
        name: 'username',
        message: `"What's·your·GitHub·username"`,
        store: true
      }
    ];

    return this.prompt(prompts).then(answers => {
      // To access props later use this.props.someAnswer;
      this.log('appname ：', answers.appname);
      this.log('cool feature ：', answers.cool);
      this.log('username ：', answers.username);
      this.log('projectDesc ：', answers.projectDesc);
      this.log('projectLicense ：', answers.projectLicense);

      this.props = answers;
    });
  }

  defaults() {
    if (path.basename(this.destinationPath()) !== this.props.appname) {
      this.log(
        `Your generator must be inside a folder named ${
          this.props.appname
        } \n I'll automatically create this folder.`
      );
      mkdirp(this.props.appname);
      // This.destinationRoot则是设置要创建的工程的根目录为工程名文件夹。
      this.destinationRoot(this.destinationPath(this.props.appname));
    }
  }

  writing() {
    mkdirp('public');
    mkdirp('src');

    this.fs.copy(
      this.templatePath('public/index.html'),
      this.destinationPath('public/index.html'),
      { title: '首页' }
    );

    this.fs.copy(
      this.templatePath('public/index.js'),
      this.destinationPath('public/index.js')
    );
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: true
    });
    this.npmInstall(['lodash', 'jquery'], { 'save-dev': true });
  }

  end() {
    this.log('新建目录完成');
  }
};
