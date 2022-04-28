const { spawn } = require('child_process')
const kill = require('tree-kill')
const path = require('path')
const os = require("os")
const deepmerge = require('deepmerge')
const { app } = require('electron')

const Commandante = function () {
  this.process = null
  this.cd = 'cd'
  this.clear = 'clear'
}

Commandante.prototype.log = function (type, message) {
  this.onLogs({
    type: type,
    message: message,
  })
}

Commandante.prototype.command = function (command, options = {}) {
  const defaultOptions = { env: process.env.PATH }
  const mergedOptions = deepmerge(defaultOptions, options)

  const args = ['-c', command]
  const com = this.sanitize(command)
  const parts = com.split(' ')

  const home = path.join(app.getPath('home'))
  let cwd = home
  if (parts[0] === this.cd) {
    if (!parts[1]) {
      cwd = home
    } else {
      cwd = path.resolve(process.cwd(), parts[1])
    }
    process.chdir(cwd)
  }

  if (parts[0] === this.clear) {
    this.onClear()
  }

  this.process = spawn('bash', ['-c', command], mergedOptions)

  this.process.stdout.on('data', (data) => {
    this.log('output', `${data}`)
  })

  this.process.stderr.on('data', (data) => {
    this.log('output', `${data}`)
  })

  this.process.on('error', (error) => {
    this.log('output', `error: ${error.message}`)
  })

  this.process.on('exit', (code, signal) => {
    if (code) this.log('output', `Process exit with code: ${code}`)
    if (signal) this.log('output', `Process killed with signal: ${signal}`)
    this.onExit()
    this.log('output', 'done')
  })

  const user = os.userInfo().username
  const folder = process.cwd().split('/').slice(-1)[0]
  this.log('prompt', user + ':' + folder + ' ' + args[1])
}

Commandante.prototype.kill = function () {
  if (this.process) {
    kill(this.process.pid, 'SIGTERM', function (err) {
      console.log('Killed process')
      if (err) {
        console.log(err)
      }
    })
  }
}

Commandante.prototype.sanitize = function (command) {
  return command.replace(/ +(?= )/g,'')
}

Commandante.prototype.onLogs = function () {}
Commandante.prototype.onClear = function () {}
Commandante.prototype.onExit = function () {}
Commandante.prototype.onError = function () {}

const commandante = new Commandante()

module.exports = commandante
