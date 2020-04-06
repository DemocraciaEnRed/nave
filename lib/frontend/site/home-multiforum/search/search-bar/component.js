import React from 'react'
import t from 't-component'

const SearchBar = ({
  state,
  toggleAdvanceForm,
  handleChange,
  execSearch,
}) => (
  <div className='searchbar-container'>
    <div className='searchbar'>
      <input
        type="text"
        name="term"
        onFocus={toggleAdvanceForm.bind(this, true)}
        placeholder=""
        onChange={handleChange}
      />
      <button
        type="submit"
        onClick={execSearch}
      >
        <i className='icon-find' />
        {t("homepage.search.search-button")}
      </button>
    </div>
    <div

      className={`advancedsearch ${state.show ? 'show': 'hide'}`}
    >
      <div className='button-link'>
        <a href="" className="reiniciar">{t("homepage.search.reset")}</a>
      </div>
      <div>
        <legend>{t("homepage.search.search-by")}</legend>
        <label>
          <input
            name="kind"
            type="radio"
            value="eje,consultas"
            onChange={handleChange}
            checked={state.kind === 'eje,consultas'}
          />
            {t("homepage.search.filter.all-results")}
        </label>
        <label>
          <input
            name="kind"
            type="radio"
            value="eje"
            onChange={handleChange}
            checked={state.kind === 'eje'}
          />
            {t("homepage.search.filter.topics")}
        </label>
        <label>
          <input
            name="kind"
            type="radio"
            value="consultas"
            onChange={handleChange}
            checked={state.kind === 'consultas'}
          />
            {t("homepage.search.filter.forums")}
        </label>
      </div>
      <div className="form-group item-form">
        <legend>Autor</legend>
        <select className="form-control">
          <option value="" defaultValue>{t("homepage.search.filter.all-authors")}</option>
          {state.authors.map((author) =>
            <option key={author} value={author}>{author}</option>
          )}
        </select>
      </div>
      <div className="button-link form">
        <button
          className="btn btn-link"
          onClick={toggleAdvanceForm.bind(this, false)}
        >
          Cancelar
        </button>
        <button
          className="btn btn-success"
          onClick={execSearch}
        >
          Aplicar
        </button>
      </div>
    </div>
  </div>
)

export default SearchBar
