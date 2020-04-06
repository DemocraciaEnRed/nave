var locale = require('locale')
var log = require('debug')('democracyos:l10n')
var config = require('lib/config')

locale.Locale.default = config.locale
var available = new locale.Locales(config.availableLocales)

function requestLocale (req) {
  if (!req.headers['accept-language']) return locale.Locale.default
  var loc = new locale.Locales(req.headers['accept-language'])
  return loc.best(available).toString()
}

function middleware (req, res, next) {
  var best

  if (config.enforceLocale) {
    best = locale.Locale.default
    log('Using application locale: %s', best)
  } else if (req.user && req.user.locale) {
    best = req.user.locale
    log('Using user configured locale: %s', best)
  } else {
    let langCookie = req.cookies.langCookie;
    if (langCookie !== undefined) {
      // la parseamos un poco para evitar que nos metan basura por la cookie
      try {
        let loc = new locale.Locales(langCookie)
        best = loc.best(available).toString()
        log('Lang cookie found with locale: %s', best)
      } catch (e) {
        best = locale.Locale.default
        res.clearCookie("langCookie");
        log('Strange lang cookie value, using default locale: %s', best)
      }
    } else {
      best = requestLocale(req)
      log('Inferring user locale from HTTP header accept-language "%s". Using locale: %s', req.headers['accept-language'], best)
    }
  }

  // sacamos esto sino son demasiados logs ya
  //log('Setting locale: %s', best)
  req.locale = best
  next()
}

module.exports = {
  requestLocale: requestLocale,
  middleware: middleware
}
