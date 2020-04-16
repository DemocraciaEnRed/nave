import React, { Component } from 'react'
import { Link } from 'react-router'
import t from 't-component'

export default class Cause extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let { topic } = this.props
    return (
        <div className="alert alert-warning text-center">
          <b>{topic.action.count}</b> {t("admin-stats.actions.cause.participants")}
        </div>
    )
  }
}
