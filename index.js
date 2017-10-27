#!/usr/bin/env node
const inquirer = require('inquirer')
const got = require('got')
const qs = require('qs')

module.exports = async function start() {
  const { url } = await inquirer.prompt([{
    name: 'url',
    message: 'Get me the url',
  }])

  const { shorturl } = await inquirer.prompt([{
    name: 'shorturl',
    message: 'Tell me short url (optional)',
  }])

  const params = { format: 'json', url }

  if (shorturl) {
    params.shorturl = shorturl
  }

  const response = await got(`https://is.gd/create.php?${qs.stringify(params)}`)

  console.log(response.body.shorturl) // eslint-disable-line
}
