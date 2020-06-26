import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Link } from 'react-router'
import Jump from 'jump.js'
import userConnector from 'lib/frontend/site/connectors/user'
import config from 'lib/config'
import Footer from 'lib/frontend/site/footer/component'
import forumStore from 'ext/lib/stores/forum-store/forum-store'
import ForumContainer from './forum-container/component'
import ForumCard from './forum-card/component'
import t from 't-component'

class HomeMultiForum extends Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 0,
      activeFilter: 'byDate',
      forums: []
    }
  }

  componentDidMount () {
    const {
      activeFilter
    } = this.state;

    forumStore
      .filterBy(activeFilter)
      .then((forums) => {
        this.setState({
          forums,
          // las páginas son de a 3 (definido en ext/lib/api/filter.js), entonces si devuelve 3, tal vez hay más
          showMore: forums.length === 3
        })
      })
      .catch(console.error)
  }

  handleClick = (name) => {
    const { page } = this.state;

    forumStore
      .filterBy(name)
      .then((forums) => {
        this.setState({
          page,
          forums,
          activeFilter: name
        })
      })
      .catch(console.error)
  }

  handleMoreClick = () => {
    const {
      page,
      activeFilter
    } = this.state;

    forumStore
      .filterBy(activeFilter, page + 1)
      .then((forums) => {
        this.setState({
          page: this.state.page + 1,
          forums: [...this.state.forums, ...forums],
          showMore: forums.length === 3
        });
      })
      .catch(console.error)
  }

  handleButtonClick = () => {
    Jump('#consultas')
    // const consultasNode = ReactDOM.findDOMNode(this.refs.consultas)
    // window.scrollTo(0, consultasNode.offsetTop)
  }

  render () {
    if (this.props.user.state.pending) return null

    const {
      showMore,
      activeFilter,
      forums
    } = this.state

    return (
      <div className='ext-site-home-multiforum'>
        <section
          className='cover jumbotron'
          style={{
            backgroundImage: `url('${config.backgroundHome}')`
          }}>
          <div className='jumbotron_body'>
            <div className='container'>
              <img
                src={`/lib/frontend/site/home-multiforum/logo-header-white-${t.lang()}.png`}
                alt="Logo"
                width="270px"
              />
              <p className='lead highlight'>
                {t('homepage.presentation.slogan')}
              </p>
              <button
                className='btn btn-primary'
                onClick={this.handleButtonClick}
              >
                {t('homepage.banner-button')}
              </button>
            </div>
          </div>
        </section>
        <div className='lead-paragraph'>
          <div dangerouslySetInnerHTML={{
            __html: t("homepage.presentation.site-description", {platform: t("common.app-name")})
          }} />
          <br />
          <p className="bold">
            {t("homepage.presentation.steps-instructions")}
          </p>
        </div>
        <div className='section-icons col-md-10 offset-md-1'>
          <div className='row'>
            <div className='section-icon col-md-4'>
              <img
                className='icon'
                src={config.iconoHomeInformate}
                alt={t("homepage.presentation.step1.title")}
              />
              <div className='text'>
                <h5>{t("homepage.presentation.step1.title")}</h5> {t("homepage.presentation.step1.text")}
              </div>
            </div>
            <div className='section-icon col-md-4'>
             <img
                className='icon'
                src={config.iconoHomeParticipa}
                alt={t("homepage.presentation.step2.title")}
              />
              <div className='text'>
                <h5>{t("homepage.presentation.step2.title")}</h5> {t("homepage.presentation.step2.text")}
              </div>
            </div>
            <div className='section-icon col-md-4'>
             <img
                className='icon'
                src={config.iconoHomeComparti}
                alt={t("homepage.presentation.step3.title")}
              />
              <div className='text'>
                <h5>{t("homepage.presentation.step3.title")}</h5> {t("homepage.presentation.step3.text")}
              </div>
            </div>
          </div>
        </div>

        <div className='lead-paragraph last col-md-4 offset-md-4 col-xs-12'>
          <i className='icon-arrow-down' onClick={this.handleButtonClick} />
        </div>

        <div className='container forums-list' id='consultas'>
          {!!forums.length && forums.map((forum, key) => (
            <ForumContainer forum={forum} key={forum.id} />
          ))}
          {!!forums.length && showMore &&
            <div className='row content-center'>
              <button className="btn btn-active show-more" onClick={this.handleMoreClick}>
                {t("homepage.forums.load-more")}
              </button>
            </div>
          }
        </div>
        <Footer />
      </div>
    )
  }
}

export default userConnector(HomeMultiForum)
