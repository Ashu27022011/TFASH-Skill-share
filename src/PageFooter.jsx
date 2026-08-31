import './PageFooter.css'

function PageFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand-row">
          <img src="/logo.png" alt="Skill Sharing logo" className="site-footer__logo" />
          <a className="site-footer__brand" href="#home" aria-label="Skill Sharing home">
            <span>skill</span>
            <span>sharing<span className="brand-dot">.</span></span>
          </a>
        </div>

        <p className="site-footer__text">
          We, the architects of future from Pragathi Central School, are the builders of this website. This website is designed not only for gaining skill, but also to create new relations and memories which live with you. Use this website for the betterment of your valuable life in this competitive world.
        </p>

        <strong className="site-footer__name">@Skill sharing</strong>
      </div>
    </footer>
  )
}

export default PageFooter
