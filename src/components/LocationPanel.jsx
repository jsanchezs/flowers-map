function LocationPanel({ point, onClose, children }) {
  return (
    <aside className={`location-panel${point ? ' is-open' : ''}`} aria-live="polite">
      {point ? (
        <>
          <div className="panel-handle" aria-hidden="true" />

          <div className="panel-header">
            <div>
              <p className="panel-label">Punto sonoro</p>
              <h2>{point.title}</h2>
            </div>

            <button type="button" className="close-button" onClick={onClose}>
              Cerrar
            </button>
          </div>

          {point.description ? <p className="panel-description">{point.description}</p> : null}

          {children}
        </>
      ) : (
        <div className="panel-empty">
          <p>Selecciona un pin para escuchar una pieza.</p>
        </div>
      )}
    </aside>
  )
}

export default LocationPanel
