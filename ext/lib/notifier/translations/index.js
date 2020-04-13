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

  'templates.welcome-email.subject': 'Bienvenido a ' + config.organizationName,
  'templates.welcome-email.body': `Iniciaste el proceso de registro para participar en <a href="${homeUrl}">${config.organizationName}</a>.<br><br>Para finalizarlo, hacé click <a href=\"{validateUrl}\">click aquí.</a>`,
  'templates.welcome-email.ps': 'En caso de no haberte registrado, por favor ignorá este correo.  ',

  'templates.comment-reply.subject': `¡Contestaron tu comentario en ${config.organizationName}!`,
  'templates.comment-reply.body': 'Tienes una nueva respuesta a tu comentario.',
  'templates.comment-reply.body2': 'Por favor <a href=\"{url}\">cliquea aquí</a> para verla.',

  'templates.topic-published.subject': 'Nuevo tema publicado',
  'templates.topic-published.body': 'Un nuevo tema fue publicado:',
  'templates.topic-published.body2': 'Por favor <a href=\"{url}\">cliquea aquí</a> para verlo.'
}
console.log(overrides['templates.email.signature'])
Object.assign(tNotifier.es, overrides)

t = ts.pt
overrides = {
  'templates.email.signature': `${t["common.app-name"]} - ${t["homepage.presentation.slogan"]}`,
}
console.log(overrides['templates.email.signature'])
Object.assign(tNotifier.pt, overrides)
