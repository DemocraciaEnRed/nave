import React, { Component } from 'react'
import { Link } from 'react-router'
import t from 't-component'

export default class Vote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: {
        'positive' : t("admin-stats.actions.vote.positive"),
        'neutral' : t("admin-stats.actions.vote.neutral"),
        'negative' : t("admin-stats.actions.vote.negative"),

      }
    }
  }


  render() {
    let { topic } = this.props
    let { options } = this.state
    return (
      <div className="general-stats-container">
         <div
          className="alert alert-warning text-center"
          dangerouslySetInnerHTML={{__html: t("admin-stats.actions.generic.participants", {count: topic.action.count})}}>
         </div>
          <table className="table table-condensed">
            <thead>
                 <tr>
              <th colSpan="3" className="bg-primary">{t("admin-stats.actions.generic.action-type")} {t("admin-topics-form.action.vote")}</th>
            </tr>
            <tr>
              <th className="bg-light">{t("admin-stats.actions.generic.option")}</th>
              <th className="bg-light text-center">Votos</th>
              <th className="bg-light text-center">Porc.</th>
            </tr>
            </thead>
            <tbody>
              {
              topic.action.results.map((option, i) =>
                <tr>
                  <td>
                    {options[option.value]}
                  </td>
                  <td className="bg-light text-center">
                    {option.votes}
                  </td>
                  <td className="bg-light text-center">
                    {option.percentage} %
              </td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
    )
  }
}
