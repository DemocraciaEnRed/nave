import React, { Component } from 'react'
import { Link } from 'react-router'
import bus from 'bus'
import isAbsoluteUrl from 'is-absolute-url'
import config from 'lib/config'
import userConnector from 'lib/frontend/site/connectors/user'
import UserBadge from './user-badge/component'
import AnonUser from './anon-user/component'
import request from 'lib/frontend/request/request'
import Cookies from 'universal-cookie'
import t from 't-component'

const cookies = new Cookies();

class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userForm: null,
      showToggleSidebar: null,
      showSidebar: null
    }
  }

  componentWillMount () {
    bus.on('user-form:load', this.onLoadUserForm)
    bus.on('sidebar:enable', this.showToggleSidebarChange)
    bus.on('sidebar:show', this.showSidebarChange)
  }

  componentWillUnmount () {
    bus.off('user-form:load', this.onLoadUserForm)
    bus.off('sidebar:enable', this.showToggleSidebarChange)
    bus.off('sidebar:show', this.showSidebarChange)
  }

  onLoadUserForm = (formName) => {
    this.setState({
      userForm: formName
    })
  }

  showToggleSidebarChange = (bool) => {
    this.setState({
      showToggleSidebar: bool
    })
  }

  showSidebarChange = (bool) => {
    this.setState({
      showSidebar: bool
    })
  }

  handleToggleSidebar = (evt) => {
    evt.preventDefault()
    bus.emit('sidebar:show', !this.state.showSidebar)
  }

  handleChangeLang = (lang) => {
    const currLang = cookies.get('langCookie')
    if (currLang === lang) return

    cookies.set('langCookie', lang, { path: '/' });
    window.location.reload(false)
  }

  handleChangeLangES = () => this.handleChangeLang('es')
  handleChangeLangPT = () => this.handleChangeLang('pt')

  render () {
    const classes = ['header ext-header']

    if (config.headerContrast) classes.push('with-contrast')

    return (
      <header className={classes.join(' ')}>
        <div className='container header-items-wrapper'>
          {
            this.state.showToggleSidebar &&
            (
              <button
                id='toggleButton'
                onClick={this.handleToggleSidebar}>
                <span className='icon-menu' />
              </button>
            )
          }

          <Logo />

          <div className='header-items'>
            <div className='header-item org-link'>
              <Link
                to='/ayuda/como-funciona'
                className='header-link hidden-md-down'>
                <span>{t('header.help-link')}</span>
              </Link>
            </div>

            {/* Sacamos el ícono momentáneamente
            this.props.user.state.fulfilled && (
              <div className='header-item notifications-link'>
                <Link
                  to='/notificaciones'
                  className='header-link'>
                  <span className='icon-bell' />
                </Link>
              </div>
            )*/}

            {this.props.user.state.fulfilled && (
              <UserBadge />
            )}

            {this.props.user.state.rejected && (
              <AnonUser form={this.state.userForm} />
            )}

            {this.props.user.state.rejected && (
              <div className='header-item langs'>
                <span
                  onClick={this.handleChangeLangES}
                  className='header-link hidden-md-down'>
                  <u>ES</u>
                </span>
                <span className='lang-separator'>/</span>
                <span
                  onClick={this.handleChangeLangPT}
                  className='header-link hidden-md-down'>
                  <u>PT</u>
                </span>
              </div>
            )}

          </div>
        </div>
      </header>
    )
  }
}

const Logo = () => {
  const isAbsolute = isAbsoluteUrl(config.homeLink)

  const Element = isAbsolute ? React.DOM.a : Link

  const props = {
    className: 'logo',
    [isAbsolute ? 'href' : 'to']: config.homeLink,
    rel: isAbsolute ? 'noopener nofollow' : null
  }

  return (
    <Element {...props}>
      <img className='logo-desktop' src={config.logo} />
      <img className='logo-mobile' src={config.logoMobile} />
    </Element>
  )
}

export default userConnector(Header)