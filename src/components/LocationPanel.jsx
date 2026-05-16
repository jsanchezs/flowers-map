function LocationPanel({ point, onClose, children }) {
  return (
    <aside className={`location-panel${point ? ' is-open' : ''}`} aria-live="polite">
      {point ? (
        <>
          <div className="panel-header">
            <div>
              <p className="panel-label">cicatriz</p>
              <h2>“{point.title}”</h2>
            </div>

            <button type="button" className="close-button" onClick={onClose}>
              cerrar
            </button>
          </div>

          <p className="panel-description">{point.description}</p>
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
