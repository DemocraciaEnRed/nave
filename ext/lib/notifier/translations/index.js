const translationsNotifier = require('democracyos-notifier/lib/translations')
const translations = require('lib/backend/translations')
const config = require('lib/config')
const {protocol, host} = config
const homeUrl = `${protocol}://${host}`

const tNotifier = translationsNotifier.t
const ts = translations

let t, overrides;

t = ts.es
overrides = {
  'templates.email.greeting': 'Hola {userName},',
  'templates.email.signature': `${t["common.app-name"]} - ${t["homepage.presentation.slogan"]}`,

  'templates.welcome-email.subject': 'Bienvenido a ' + t["common.app-name"],
  'templates.welcome-email.body': `Iniciaste el proceso de registro para participar en <a href="${homeUrl}">${t["common.app-name"]}</a>.<br><br>Para finalizarlo, hacé click <a href=\"{validateUrl}\">click aquí.</a>`,
  'templates.welcome-email.ps': 'En caso de no haberte registrado, por favor ignorá este correo.  ',

  'templates.comment-reply.subject': `¡Contestaron tu comentario en ${t["common.app-name"]}!`,
  'templates.comment-reply.body': 'Tienes una nueva respuesta a tu comentario.',
  'templates.comment-reply.body2': 'Por favor <a href=\"{url}\">cliquea aquí</a> para verla.',

  'templates.topic-published.subject': 'Nuevo tema publicado',
  'templates.topic-published.body': 'Un nuevo tema fue publicado:',
  'templates.topic-published.body2': 'Por favor <a href=\"{url}\">cliquea aquí</a> para verlo.'
}
Object.assign(tNotifier.es, overrides)

t = ts.pt
overrides = {
  'templates.welcome-email.subject': `Bem-vindo(a) a ${t["common.app-name"]}!`,
  'templates.email.signature': `${t["common.app-name"]} - ${t["homepage.presentation.slogan"]}`,
}
Object.assign(tNotifier.pt, overrides)
