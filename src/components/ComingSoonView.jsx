function ComingSoonView({ message }) {
  return (
    <main className="coming-soon-shell">
      <section className="coming-soon-card" aria-live="polite">
        <p className="eyebrow">Mapa sonoro</p>
        <h1>Flores de Lavapiés</h1>
        <p className="coming-soon-message">{message}</p>
      </section>
    </main>
  )
}

export default ComingSoonView
