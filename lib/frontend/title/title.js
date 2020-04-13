/**
 * Module dependencies.
 */

import o from 'component-dom'
import config from 'lib/config/config'
import t from 't-component'

/**
 * Change head's title or restore with
 * one from config `organizationName`
 *
 * @param {String} str
 * @api public
 */

export default function title (str) {
  var title = t("common.app-name") + (str ? ' - ' + str : '')
  o('head title').html(title)
}
