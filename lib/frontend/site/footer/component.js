import React, { Component } from 'react'
import { Link } from 'react-router'
import t from 't-component'
import config from 'lib/config'

export default class Footer extends Component {

  render () {
    return (
      <footer className='ext-footer'>
        <div className='footer container'>
          <div className='institutional'>
            <div className='logo gob'>
              <a href='/'>
                <img src={config.logoFooter} />
              </a>
            </div>
            <p className='text-muted small'>
              {t("footer.license-pre")} <a href='https://www.gnu.org/licenses/gpl-3.0-standalone.html'>GNU General Public License v3.0</a>
            </p>
          </div>
            <nav className='menu'>
              <Link to='/ayuda/como-funciona'>{ t('help.how-it-works.title') }</Link>
              <Link to='/ayuda/acerca'>{ t('help.about.title') }</Link>
              <Link to='/ayuda/acerca'>{ t('help.contact.title') }</Link>
            </nav>
            <nav className='menu'>
              <Link to='/ayuda/terminos-y-condiciones'>{ t('help.tos.title') }</Link>
              <Link to='/ayuda/privacidad'>{ t('help.pp.title') }</Link>
            </nav>
        </div>
      </footer>
    )
  }
}
