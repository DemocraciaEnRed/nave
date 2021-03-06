import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import t from 't-component'
import Footer from 'lib/frontend/site/footer/component'
import Sidebar from 'ext/lib/site/help/sidebar/component'
import MarkdownGuide from 'lib/frontend/site/help/md-guide/component'
import {articlesES, articlesPT} from './articles'
import Stats from './stats/component'
import config from 'lib/config'

export default class HelpLayout extends PureComponent {
  articles = [
    {
      title: t('help.how-it-works.title'),
      Content: () => <Content content={config.locale == 'es' ? articlesES.como : articlesPT.como} />,
      slug: 'como-funciona',
      path: '/ayuda/como-funciona'
    },
    {
      title: t('help.about.title'),
      Content: () => <Content content={config.locale == 'es' ? articlesES.acerca : articlesPT.acerca} />,
      slug: 'acerca',
      path: '/ayuda/acerca'
    },
        {
      title: t('help.stats.title'),
      Content: Stats,
      slug: 'estadisticas',
      path: '/ayuda/estadisticas'
    },
    {
      title: t('help.tos.title'),
      Content: () => <Content content={config.locale == 'es' ? articlesES.tos : articlesPT.tos} />,
      slug: 'terminos-y-condiciones',
      path: '/ayuda/terminos-y-condiciones'
    },
    {
      title: t('help.pp.title'),
      Content: () => <Content content={config.locale == 'es' ? articlesES.pp : articlesPT.pp} />,
      slug: 'privacidad',
      path: '/ayuda/privacidad'
    },
    {
      title: t('help.markdown.title'),
      Content: MarkdownGuide,
      slug: 'markdown',
      path: '/ayuda/markdown'
    }
  ]

  render () {
    console.log(articlesPT);
    const article = this.props.params.article || this.articles[0].slug
    const active = this.articles.find((art) => art.slug === article)

    return (
      <div>
        <div className='help-container container'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <Link to='/'>Consultas</Link>
            </li>
            <li className='breadcrumb-item active'>
              <Link to='/ayuda'>{t("help.title")}</Link>
            </li>
            <li className='breadcrumb-item active'>
              <span>{active.title}</span>
            </li>
          </ol>
          <section>
            <div className='row'>
              <aside className='col-md-4'>
                <Sidebar
                  activeSlug={active.slug}
                  articles={this.articles} />
              </aside>
              <article className='help-content col-md-8'>
                <active.Content />
              </article>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    )
  }
}

const Content = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
)
