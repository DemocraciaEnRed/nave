import React from 'react'
import moment from 'moment'
import t from 't-component'

const ResultSearch = ({ results, term }) => (
  <div className="results-search">
    <h5>{t("homepage.search.results.title")}</h5>
    <hr />
    <p>{t("homepage.search.results.subtitle", {count: results.length, term: term})}</p>
    {results.map((result) => {
      const isForum = !result.action

      if (isForum) {
        return (
          <div key={result.id}>
            <Consulta
              title={result.title}
              summary={result.summary}
              img={result.coverUrl}
              createdAt={result.createdAt}
              url={`/${result.name}`}
            />
            <hr />
          </div>
        )
      }

      return (
        <div key={result.id}>
          <Eje
            url={`/${result.forum.name}/consulta/${result.id}`}
            urlForum={`/${result.forum.name}`}
            mediaTitle={result.mediaTitle}
            summary={result.summary}
            img={result.coverUrl}
            createdAt={result.createdAt}
            closingAt={result.closingAt}
          />
          <hr />
        </div>
      )
    })}
  </div>
)

const Consulta = ({ title, summary, img, createdAt, url }) => (
  <div className="container-consulta">
    <div className="first-column">
      <h5>Consulta</h5>
      <p className="dates">
        <b>{t("homepage.search.results.published-at")} </b>
        {moment(createdAt).format('LL')}
      </p>
    </div>
    <div className="second-column">
      <img src={img} width="150" height="150" />
    </div>
    <div className="third-column">
      <h5>{title}</h5>
      <p className="summary">{summary}</p>
      <a href={url}>{t("homepage.search.results.view-topics")}</a>
    </div>
  </div>
)

const Eje = ({ url, urlForum, mediaTitle, summary, img, createdAt, closingAt }) => (
  <div className="container-eje">
    <div className="first-column">
      <h5>{t("common.topic-singular")}</h5>
      <a href={urlForum}>{t("homepage.search.results.goto-forum")}</a>
      <p className="dates">
        <b>{t("homepage.search.results.published-at")} </b>
        {moment(createdAt).format('LL')}
      </p>
      <p className="dates">
        <b>{t("homepage.search.results.close-at")} </b>
        {moment(closingAt).format('LL')}
      </p>
    </div>
    <div className="second-column">
      <img src={img} width="150" height="150" />
    </div>
    <div className="third-column">
      <h5>{mediaTitle}</h5>
      <p className="summary">{summary}</p>
      <a href={url}>{t("homepage.search.results.vote-topic")}</a>
    </div>
  </div>
)

export default ResultSearch
