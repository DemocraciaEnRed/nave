const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const t = require('t-component')
const config = require('lib/config')
const translations = require('lib/backend/translations')

const app = module.exports = express()

/**
 * Set `views` directory for module
 */

app.set('views', __dirname)

/**
 * Set `view engine` to `jade`.
 */

app.set('view engine', 'jade')

/**
 * middleware for favicon
 */

app.use(favicon(path.join(__dirname, '/assets/favicon.ico')))

/*
 * Register Models and Launch Mongoose
 */

require('lib/backend/models')(app)

/**
 * Set `app` configure settings
 */

require('lib/backend/setup')(app)

/*
 * PassportJS Auth Strategies and Routes
 */

require('lib/backend/auth')(app)

/*
 * Register routes aliases
 */

require('lib/backend/ext/routes')
require('lib/boot/routes')

/*
 * Load /ext folder
 */

app.use(require('lib/backend/ext'))

/*
 * Twitter card routes
 */

app.use('/twitter-card', require('lib/backend/twitter-card'))

/*
 * Facebook card routes
 */

app.use('/facebook-card', require('lib/backend/facebook-card'))

/*
 * Load v2 api endpoints
 */

app.use('/api/v2', require('lib/backend/api-v2/boot'))

/*
 * Load api endpoints
 */

app.use('/api', require('lib/backend/api/boot'))

/**
 * Load localization dictionaries to translation application
 */

translations.help(t)

/**
 * Init `t-component` component with parameter locale
 */

t.lang(config.locale)

/**
 * Load Styleguide
 */
if (config.env !== 'production') {
  app.use(require('lib/frontend/styleguide'))
}

/**
 * Front End Pages
 */

app.use(require('lib/frontend/settings/boot'))
app.use(require('lib/frontend/admin/boot'))
app.use(require('lib/frontend/site/boot'))
app.use(require('lib/frontend/404'))
