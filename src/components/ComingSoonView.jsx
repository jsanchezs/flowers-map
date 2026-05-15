const storyFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSeJAj4twTrxYgbtCUhQkp0emHjH3rt1AewG-lSV5rRPPehomQ/viewform?usp=header'
const instagramUrl =
  'https://www.instagram.com/louromera?igsh=MXhjdHV3NGdhamR2cw%3D%3D&utm_source=qr'

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
        <p className="coming-soon-instagram">
          Sigue el proceso en mi instagram{' '}
          <a href={instagramUrl} rel="noreferrer">
            @louromera
          </a>
        </p>
      </section>
    </main>
  )
}

export default ComingSoonView
