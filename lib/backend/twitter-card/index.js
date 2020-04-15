var resolve = require('path').resolve
var express = require('express')
var app = module.exports = express()
var striptags = require('striptags')
var log = require('debug')('democracyos:twitter-card')
var api = require('lib/backend/db-api')
var config = require('lib/config')
const translations = require('lib/backend/translations')

app.get('/topic/:id', function (req, res, next) {
  log('Twitter Request /topic/%s', req.params.id)
  api.topic.get(req.params.id, function (err, topicDoc) {
    if (err) return _handleError(err, req, res)
    log('Serving Twitter topic %s', topicDoc.id)
    res.render(resolve(__dirname, 'topic.jade'), { topic: topicDoc, config: config, strip: striptags, translations: translations[req.locale] })
  })
})

app.get('*', function (req, res, next) {
  log('Twitter Request generic page')
  res.render(resolve(__dirname, 'generic.jade'), { config: config, translations: translations[req.locale] })
})

function _handleError (err, req, res) {
  console.log(err)
  res.status(500).send()
}
