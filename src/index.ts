#!/usr/bin/env node

import prompts from 'prompts'
import * as fs from 'node:fs/promises'
import path from 'path'
// import PackageJson from '@npmcli/package-json'

type InputType = {
  projectName: string
}

prompts([
  {
    type: 'text',
    name: 'projectName',
    message: 'What is the project name?',
  },
])
  .then(async (response: InputType) => {
    const { projectName } = response
    const currentDir = process.cwd()
    const projectDir = path.resolve(currentDir, projectName)

    //TODO: check if folder extists

    await fs.mkdir(projectDir, { recursive: true })
    await fs.mkdir(path.join(projectDir, 'src'), { recursive: true })
    await fs.writeFile(path.join(projectDir, 'src', 'index.ts'), '')
    await fs.copyFile(
      path.join(__dirname, 'template', 'src', 'package.json'),
      path.join(projectDir, 'package.json')
    )
    const dotConfigFiles = await fs.readdir(
      path.resolve(__dirname, 'template', 'dotFileConfigs')
    )

    for (const file of dotConfigFiles) {
      await fs.copyFile(
        path.join(__dirname, 'template', 'dotFileConfigs', file),
        path.join(projectDir, file)
      )
      await fs.rename(
        path.join(projectDir, file),
        path.join(projectDir, `.${file}`)
      )
    }

    const configFiles = await fs.readdir(
      path.resolve(__dirname, 'template', 'configs')
    )

    for (const file of configFiles) {
      await fs.copyFile(
        path.join(__dirname, 'template', 'configs', file),
        path.join(projectDir, file)
      )
    }

    // const pkgJson = new PackageJson('./')
    // await pkgJson.save()
  })
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error))
