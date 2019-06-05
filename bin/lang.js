const {name, homepage} = require('../package.json')
/**
 * Exports
 */
module.exports = {
    cliName: name,
    cliURL: homepage,
    get Supports() {
      return `\nPlease consider supporting of ${this.cliName} CLI - If you found it useful give it a star on GitHub !\n> ${this.cliURL}`
    },
    get Acknowledgments() {
      return `\nThank you for using ${this.cliName} CLI !\n`
    },
    get Epilogue() {
      return `Thank you for using ${this.cliName} CLI !`
    },
    confirmation: `You are about to create a directory on your desktop\n  would you like to continue ?`,
    cancelation: `\n> ABORTED: directory creation was canceled !`,
    question: {
      projectName: `Enter your directory name`
    },
    ok: `\n> SUCCESS: your directory was created at:\n> userPath`,
    err: {
      ivalidChar: `\n> ERROR: \\/:*?"<>| characters are not allowed !`,
      minLength: `\n> ERROR: minimum name length is 1 caracter !`,
      maxLength: `\n> ERROR: maximum name length is MAX_LENGTH characters !`,
      deniedCreation: `\n> ABORTED: this directory name already exists on your desktop !`,
      mkdirFailed: `> ERROR: failed to write directory !`
    } 
  }