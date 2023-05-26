#!/usr/bin/env node
'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            },
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const prompts_1 = __importDefault(require('prompts'))
const fs = __importStar(require('node:fs/promises'))
const path_1 = __importDefault(require('path'))
// const mkdir = promisify(fs.mkdir)
;(0, prompts_1.default)([
  {
    type: 'text',
    name: 'projectName',
    message: 'What is the project name?',
  },
])
  .then(async (response) => {
    const { projectName } = response
    const currentDir = process.cwd()
    const projectDir = path_1.default.resolve(currentDir, projectName)
    //TODO: check if folder extists
    await fs.mkdir(projectDir, { recursive: true })
    await fs.mkdir(path_1.default.join(projectDir, 'src'), { recursive: true })
    await fs.writeFile(path_1.default.join(projectDir, 'src', 'index.ts'), '')
    const dotConfigFiles = await fs.readdir(
      path_1.default.resolve(__dirname, 'template', 'dotFileConfigs')
    )
    for (const file of dotConfigFiles) {
      await fs.copyFile(
        path_1.default.join(__dirname, 'template', 'dotFileConfigs', file),
        path_1.default.join(projectDir, file)
      )
      await fs.rename(
        path_1.default.join(projectDir, file),
        path_1.default.join(projectDir, `.${file}`)
      )
    }
    const configFiles = await fs.readdir(
      path_1.default.resolve(__dirname, 'template', 'configs')
    )
    for (const file of configFiles) {
      await fs.copyFile(
        path_1.default.join(__dirname, 'template', 'configs', file),
        path_1.default.join(projectDir, file)
      )
    }
  })
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error))
//# sourceMappingURL=index.js.map
