'use strict'

const { spawn } = require('child_process')

exports.runSpawn = function runSpawn ({ cwd }) {
  return (cmd, args) => {
    return new Promise((resolve, reject) => {
      const cli = spawn(cmd, args, { cwd, env: process.env, shell: true })
      cli.stdout.setEncoding('utf8')
      cli.stderr.setEncoding('utf8')

      let stdout = ''
      let stderr = ''
      cli.stdout.on('data', (data) => { stdout += data })
      cli.stderr.on('data', (data) => { stderr += data })
      cli.on('close', (code, signal) => {
        if (code === 0) {
          return resolve(stdout.trim())
        }
        reject(new Error(`${cmd} ${args.join(' ')} returned code ${code} and signal ${signal}\nSTDOUT: ${stdout}\nSTDERR: ${stderr}`))
      })
    })
  }
}
