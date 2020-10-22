_Cross platform Command Line Interface utility with Node.js_
<h1 align="center" style="border:none !important;">
  mkdird-cli
</h1>

<div align="center">

![npm](https://img.shields.io/npm/v/mkdird.svg?style=flat-square) ![node](https://img.shields.io/node/v/mkdird.svg?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/drozerah/mkdird-cli.svg?style=flat-square) ![GitHub pull requests](https://img.shields.io/github/issues-pr/drozerah/mkdird-cli.svg?style=flat-square) [![Known Vulnerabilities](https://snyk.io/test/github/Drozerah/mkdird-cli/badge.svg?style=flat-square)](https://snyk.io/test/github/Drozerah/mkdird-cli) ![NPM](https://img.shields.io/npm/l/mkdird.svg?style=flat-square) ![GitHub top language](https://img.shields.io/github/languages/top/drozerah/mkdird-cli.svg?style=flat-square) 

</div>

__Make a directory on your OS's desktop: think **mkdird**~~esktop~~__

- install mkdird-cli (see below)
- Launch `mkdird run` command anywhere in terminal
- select the `yes` option to proceed (use your keyboard arrow keys)
- give your new directory a name **\***

Check your desktop - you are ready to go!


![mkdird image](https://raw.githubusercontent.com/Drozerah/MyGitHubStorage/master/img/mkdird-cli/mkdird-cli.gif)

**\*** mkdird-cli will check if the path to create is valid, see [specifications](#specs) section for more informations

__Install__

We recommend to install mkdird-cli globally 
````bash
$ npm install mkdird --global
````

__Usage__

````bash
$ mkdird run
````
__Help__

````bash
$ mkdird --help
````

````
Usage: mkdird <command> [options]

Commands:
  mkdird run             Run mkdird CLI
  mkdird docs            Open in browser mkdird documentation page
  mkdird specs           Open in browser mkdird specifications page
  mkdird home            Open in browser mkdird NPM home page
  mkdird issues          Open in browser mkdird issues page on GitHub
  mkdird author          Open in browser mkdird author page on GitHub

Options:
  -v, --version  Show version number   [boolean]
  -h, --help     Show help             [boolean]

````

__Annotation arguments in a command line__

Syntax | Argument type | Explanation |
------------ | ------------- | ------------- 
cmd \<arg> | Required | The agurment `arg` is required  |
cmd [arg] | Optional | The agurment `arg` is not required  |



__Specifications__<a name="specs"></a>

- Coming soon!

__Fork it!__

- Coming soon!

__Built with__
<details>

  <summary>Click to expand!</summary>

- [chalk](https://www.npmjs.com/package/chalk#readme)
- [inquirer](https://github.com/SBoudrias/Inquirer.js#readme)
- [open](https://github.com/sindresorhus/open/#readme)
- [yargs](https://yargs.js.org/)
- [update-check](https://www.npmjs.com/package/update-check)
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Visual Studio Code](https://code.visualstudio.com/)


</details>
<br>

__Versioning__

- we use [SemVer](http://semver.org/) for versioning

__NPM home page__

- [mkdird](https://www.npmjs.com/package/mkdird)

__Author__

- Thomas G. aka Drozerah - [GitHub](https://github.com/Drozerah)

__License__

- [MIT](https://github.com/Drozerah/mkdird-cli/blob/master/LICENSE) © Thomas G. aka Drozerah