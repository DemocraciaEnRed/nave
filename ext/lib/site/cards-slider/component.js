import React, { Component } from 'react'
import Flickity from 'flickity'
import topicStore from 'lib/frontend/stores/topic-store/topic-store'
import TopicCard from './topic-card/component'
import t from 't-component'

export default class Carrusel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topics: null
    }
    this.flkty = null
  }

  componentDidMount () {
    topicStore.findAll({ forum: this.props.forum.id })
      .then((res) => {
        let topics = res[0]
        if (this.props.topic !== undefined) {
          topics = [...topics].filter((topic) => topic.id !== this.props.topic.id)
        }
        if (topics.length > 0) {
          // Cuidado!! este sorting parece que en chrome no anda
          topics = topics.sort((t1, t2) => {
            // si empieza con números (opcional espacio al frente)
            const reg=/^ ?\d+/
            const regMatch1=reg.exec(t1.mediaTitle)
            const regMatch2=reg.exec(t2.mediaTitle)
            if (regMatch1 && regMatch1.length && regMatch2 && regMatch2.length){
              try{
                return parseInt(regMatch1[0]) > parseInt(regMatch2[0])
              }catch(e){
                return t1.createdAt > t2.createdAt
              }
            }else
              return t1.createdAt > t2.createdAt
          })

          // código de sort original
          /*// ordenamos topics por abiertos y cerrados, y por fechas de cierre
          // mismo sort utilizado en home-forum
          topics = topics.sort((a,b) => {
            // si uno está abierto y el otro cerrado, ordenar por abierto
            if (a.closed && !b.closed)
              return 1
            if (!a.closed && b.closed)
              return -1
            //// si los dos están abiertos o los dos cerrados
            // si los dos tienen fecha de cierre, ordenar por eso
            if (a.closingAt && b.closingAt)
              if (a.closed && b.closed)
                return new Date(a.closingAt) < new Date(b.closingAt) ? 1 : -1
              if (!a.closed && !b.closed)
                return new Date(a.closingAt) > new Date(b.closingAt) ? 1 : -1
            // si alguno tiene fecha de cierre, poner último
            if (a.closingAt)
              return 1
            if (b.closingAt)
              return -1
            // finalmente, si nada de lo anterior se cumple, ordenar por fecha de publicación
            return new Date(a.publishedAt) < new Date(b.publishedAt) ? 1 : -1
          })*/

          this.setState({
            topics: topics
          })
        }
      })
      .catch((err) => console.error(err))
  }

  componentDidUpdate () {
    if (this.flkty) this.flkty.destroy()
    const options = {
      cellAlign: 'center',
      draggable: false,
      // friction: 0.2,
      contain: false,
      // que vuelva a empezar al final
      wrapAround: false,
      // los puntitos de abajo que marcan la página
      pageDots: false,
      groupCells: window.matchMedia('(min-width: 1024px)').matches ? 2 : 1
    }
    this.flkty = new Flickity(this.refs.carrusel, options)
  }

  componentWillUnmount () {
    if (this.flkty) this.flkty.destroy()
  }

  render () {
    if (!this.props.forum || !this.state.topics) return null
    return (
      <div className="fondo-titulo">
        {this.props.topic &&
          <h2 className='title'>{t("homepage.forums-participate")}</h2>
        }
        <div className='topics-container' ref='carrusel'>
          {this.state.topics && this.state.topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic}/>
          ))}
        </div>
      </div>
    )
  }
}
