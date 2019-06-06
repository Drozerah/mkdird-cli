#!/usr/bin/env node

'use strict'

/**
 * Node modules
 */
const path = require('path')
const fs = require('fs')
const os = require('os')
const async = require('async')
const events = require('events')

/**
 * NPM Dependencies
 */
const {green, blue, red, yellow} = require('chalk')
const inquirer = require('inquirer')
const commands = require('yargs')
const open = require('open')
const check = require('update-check')

/**
 * Modules
 */
const _lib = require('./lib.js')
const msg = require('./lang.js')
const {name, description, author, bugs, homepage, version} = require('../package.json')

/**
 * Config
 */
// locate OS desktop
const osDesktopPath = path.join(os.homedir(), 'Desktop')
// forbidden characters
const toReject = ['<', '>', ':', '"', '\\', '/', '|', '?', '*']
// set user input minimum length
const MIN_LENGTH = 1
// set OS path max length
const MAX_PATH = 248
// set maximum available length
const MAX_LENGTH = MAX_PATH - (osDesktopPath.length + path.sep.length)
// is supporting msg
const isSupportingMsg = true


/**
 * initialize some variables
 */
// create an object of EventEmitter class by using above reference
const event = new events.EventEmitter()


/**
 * Running mkdird-cli
 */
const run = () => {
  async.series([

    callback => {

        /**
         * Step 1: NPM package version checking
         */

        // get the current package version from package.json
        const pkg = { name: name, version: version }

        // Print Acknowledgments in any case
        console.log(blue(msg.Acknowledgments)) // msg

        // checking is resolved
        const checkUpdate = (update) => {

          if (update) { // new version is available

            console.log(yellow(`${name}@${update.latest} is now available !\n> Run 'npm install -g ${name}'\n`))

            callback(false, true) // we go to step: 2

          } else { // package version is up to date

            callback(false, false) // we go to step: 2

          }
        }

        // checking is rejected
        const logError = ({message}) => { // something went wrong into the silence !

          // console.error(message)
          callback(false, undefined) // we go to step: 2
        }

        /**
         * Do the checking
         */
        check(pkg).then(checkUpdate, logError)

    },
    callback => {

        /**
         * Step 2: ask for user choice to continue
         */
        inquirer
          .prompt([ // prompt the user
            { name: 'type',
              type: 'list',
              message : msg.confirmation, // prompt msg
              choices: ['yes','no']
            }
          ])
        /**
         * Step 2.1: get the user choice
         */ 
        .then( userChoice => {

            const choice = Object.values(userChoice)[0]

            switch (true) {
                case choice  == 'no':  // user choice is 'no'

                  console.log(green(msg.cancelation)) // cancelation msg

                  callback(true, choice) // passing error + value to results
           
                // abort leave the cli
                return process.exit()
            
                default: // user choice is 'yes' (default case)

                  callback(false, choice) // passing choice to results

                return
            }
            
        })    
      },
      callback => {
        /**
         * Step 3: ask the user directory name to create
         */
        inquirer
          .prompt([{ name: msg.question.projectName, validate: input => { // prompt the user

                // check if user input is well formatted 
                switch (true) {

                  case input.length < MIN_LENGTH: // check min length

                    console.log(red(msg.err.minLength)) // error msg

                  return false // ask the question back again
        
                  case input.length > MAX_LENGTH: // check max length

                    console.log(red(msg.err.maxLength.replace('MAX_LENGTH', MAX_LENGTH))) // error msg

                  return false // ask the question back again
        
                  case _lib.isReject(input, toReject) === true: // check forbidden characters

                    console.log(red(msg.err.ivalidChar)) // error msg

                  return false // ask the question back again
        
                  default: // user input is well formatted (default case)

                  return true // user input is valid
                }

              }
            }
          ])
        /**
         * step 3.1: working with user directory name
         */
        .then( answer => {
      
          // reference validated user input 
          const userInput = Object.values(answer)[0]

          // create user full path
          const userPath = osDesktopPath + path.sep + userInput
      
          // check if full path already exists 
          fs.access(userPath, fs.constants.F_OK, err => {

            switch (true) {

              case err === null: // path already exists
                
                console.log(red(msg.err.deniedCreation)) // aborted msg

                callback(true, msg.err.deniedCreation) // passing error
              
              // leave the CLI
              return process.exit()

              case err && err.code === 'ENOENT': // path is new
                              
                /**
                 * full path make directory
                 */
                fs.mkdir(userPath, error => {

                  if (error) { // error

                      console.log(msg.err.mkdirFailed, error) // failed msg

                      callback(true, error) // passing error

                      // leave the CLI
                      return process.exit()

                  } else { // no error
                 
                    callback(false, userPath) // passing userInput to result

                    return // Done ! we leave the CLI
                  }

                })          
            }
          })
        })
      }
    ],
    (err, results) => {

      if(!err){

        /**
         * Raising Success event when user path (directory) is well created
         */
        event.emit('Success', results)

        /**
         * prompt supporting msg if any
         */
        if (isSupportingMsg) console.log(blue(msg.Supports))

      } else {

        /**
         * handle error
         */
        // console.log(red("ERROR: " + err))
      }
    }
  )
}

commands
.scriptName(name)
.usage(`\n${description}`)
.usage(`\nUsage: ${name} <command> [options]`)
.showHelpOnFail(true) // default action show help menu
.demandCommand(1, '') // at least 1 command required
.command(['run'],  `Run ${name} CLI`, {}, _ => {
  /**
   * Run mkdird-cli
   */
  run()
})
.command(['docs'], `Open in browser ${name} documentation page`, {}, _ => {
  open(homepage + '#readme')
})
.command(['specs'], `Open in browser ${name} specifications page`, {}, _ => {
  open(homepage + '#specs')
})
.command(['home'], `Open in browser ${name} NPM home page`, {}, _ => {
  open('https://www.npmjs.com/package/mkdird')    
})
.command(['issues'], `Open in browser ${name} issues page on GitHub`, {}, _ => {
  open(`${bugs.url}`)    
})
.command(['author'], `Open in browser ${name} author page on GitHub`, {}, _ => {
  open(`${author.url}`)
})
.alias('v', 'version')
.alias('h', 'help')
.epilogue(`${msg.Epilogue}`)
.locale('en')
.argv

// Subscribe for Success (event listener)
event.on('Success', results  => {
  
  // console.log('\nDEBUG: ' + results)

  /**
   * Print success message with results data
   */
  console.log(green(msg.ok.replace('userPath', results[2])))

})
