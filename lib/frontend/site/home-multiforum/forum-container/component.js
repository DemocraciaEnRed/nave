import React, { Component } from 'react'
import CardsSlider from 'ext/lib/site/cards-slider/component'
import ForumCard from '../forum-card/component'
import t from 't-component'

export default ({ forum }) => (
  <div className='container forum-card-container'>
    <ForumCard forum={forum} />
    <div className='forum-slider-wrapper'>
      <h4 className='forum-slider-title'>
      {
        forum.extra.contentType === 'llamado' && t("homepage.forums.subtitle-llamado")
        ||
        forum.extra.contentType === 'propuestas' && t("homepage.forums.subtitle-propuestas")
        ||
        (forum.extra.contentType === 'ejes' || forum.extra.contentType === undefined) && t("homepage.forums.subtitle-ejes")
      }
      </h4>
      <CardsSlider forum={forum} />
    </div>
  </div>
)
