#!/usr/bin/env node
const inquirer = require('inquirer')
const got = require('got')
const qs = require('qs')

module.exports = async function start(params = {}) {
  const { url } = params || await inquirer.prompt([{
    name: 'url',
    message: 'Get me the url',
  }])

  const { shorturl } = params || await inquirer.prompt([{
    name: 'shorturl',
    message: 'Tell me short url (optional)',
  }])

  const props = { format: 'json', url }

  if (shorturl) {
    props.shorturl = shorturl
  }

  const response = await got(`https://is.gd/create.php?${qs.stringify(props)}`)
  const body = JSON.parse(response.body)

  if (params) {
    return body
  }

  return console.log(body) // eslint-disable-line
}
