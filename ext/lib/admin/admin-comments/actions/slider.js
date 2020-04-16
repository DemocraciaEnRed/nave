import React, { Component } from 'react'
import { Link } from 'react-router'
import t from 't-component'

export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [
        t("proposal-result.very-against"),
        t("proposal-result.middle-high-against"),
        t("proposal-result.middle-against"),
        t("proposal-result.little-against"),
        t("proposal-result.middle-support"),
        t("proposal-result.little-support"),
        t("proposal-result.middle-high-support"),
        t("proposal-result.very-support")
      ]
    }
  }

  render() {
    let { topic } = this.props
    let { options } = this.state
    return (
      <div className="general-stats-container">
        <div
          className="alert alert-warning text-center"
          dangerouslySetInnerHTML={{ __html: t("admin-stats.actions.generic.participants", {count: topic.action.count}) }}>
        </div>
        <table className="table table-condensed">
          <thead>
            <tr>
              <th colSpan="3" className="bg-primary">{t("admin-stats.actions.generic.action-type")} {t("admin-topics-form.action.slider")}</th>
            </tr>
            <tr>
              <th className="bg-light">{t("admin-stats.actions.generic.option")}</th>
              <th className="bg-light text-center">Votos</th>
              <th className="bg-light text-center">Porc.</th>
            </tr>
          </thead>
          <tbody>
            {
              options.map( (option, i) =>
            <tr>
              <td>
                {option}
                </td>
              <td className="bg-light text-center">
                {topic.action.results[i].votes}
              </td>
              <td className="bg-light text-center">
                {topic.action.results[i].percentage} %
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
