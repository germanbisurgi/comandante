const { spawn } = require('child_process')
const kill = require('tree-kill')
const path = require('path')
const os = require("os")
const { app } = require('electron')

const Commandante = function () {
  this.child = null
}

Commandante.prototype.log = function (message) {
  this.onLogs(message + '\n\n')
}

Commandante.prototype.command = function (command) {
  const args = ['-c', command]
  const com = this.sanitize(args[1])
  const parts = com.split(' ')
  console.log('parts', parts)

  const home = path.join(app.getPath('home'))
  let cwd = home
  if (parts[0] === 'cd') {
    if (!parts[1]) {
      cwd = home
    } else {
      cwd = path.resolve(process.cwd(), parts[1])
    }
    process.chdir(cwd)
  }

  this.child = spawn('bash', ['-c', command])

  this.child.stdout.on('data', (data) => {
    this.log(`${data}`)
  })

  this.child.stderr.on('data', (data) => {
    this.log(`${data}`)
  })

  this.child.on('error', (error) => {
    this.log(`error: ${error.message}`)
  })

  this.child.on('exit', (code, signal) => {
    if (code) this.log(`Process exit with code: ${code}`)
    if (signal) this.log(`Process killed with signal: ${signal}`)
    this.onExit()
  })

  const user = os.userInfo().username
  const folder = process.cwd().split('/').slice(-1)[0]
  this.log(user + ':' + folder + ' ' + args[1])
}

Commandante.prototype.kill = function () {
  if (this.child) {
    kill(this.child.pid, 'SIGTERM', function (err) {
      console.log('Killed process', err)
    })
  }
}

Commandante.prototype.sanitize = function (command) {
  return command.replace(/ +(?= )/g,'')
}

Commandante.prototype.onLogs = function () {}
Commandante.prototype.onExit = function () {}
Commandante.prototype.onError = function () {}

const commandante = new Commandante()

module.exports = commandante
