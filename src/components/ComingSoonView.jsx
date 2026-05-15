const storyFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSeJAj4twTrxYgbtCUhQkp0emHjH3rt1AewG-lSV5rRPPehomQ/viewform?usp=header'

function ComingSoonView() {
  return (
    <main className="coming-soon-shell" aria-live="polite">
      <section className="coming-soon-content" aria-label="Pantalla previa">
        <h1 className="coming-soon-title">Recogiendo historias…</h1>
        <p className="coming-soon-copy">
          El mapa sonoro se está formando, <strong>haz que tu historia sea parte,</strong> y sana
          ese rinconcito del mapa
        </p>
        <a className="coming-soon-cta" href={storyFormUrl}>
          manda tu historia
        </a>
        <p className="coming-soon-note">audio o texto ;)</p>
      </section>
    </main>
  )
}

export default ComingSoonView
