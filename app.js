const previewContainer = document.getElementById('preview-container');

// Template 1: Modern Bold (Dark Header, Grid Gallery)
const templateModern = (config) => `
  <div class="tpl-modern">
    <nav style="position: ${config.sticky ? 'sticky' : 'relative'}; background: #222; color: white; padding: 1rem;">
      <h1>LOGO</h1>
    </nav>
    <header style="padding: 100px 20px; text-align: center; background: #007bff; color: white;">
      <h2>${config.headline}</h2>
      ${config.showCTA ? '<button>Get Started</button>' : ''}
    </header>
    <section class="gallery" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 20px;">
      <div style="background: #ccc; height: 200px;"></div>
      <div style="background: #ccc; height: 200px;"></div>
      <div style="background: #ccc; height: 200px;"></div>
    </section>
    <footer style="padding: 20px; border-top: 1px solid #eee;">
      ${config.showSocials ? '<span>Twitter | GitHub</span>' : ''}
    </footer>
  </div>
`;

// Template 2: Minimalist Light (Centered, Masonry-style Gallery)
const templateMinimal = (config) => `
  <div class="tpl-minimal" style="font-family: serif; text-align: center;">
    <nav style="padding: 2rem; border-bottom: 1px solid #000;">
      <span>MENU</span>
    </nav>
    <header style="padding: 80px 10px;">
      <h2 style="font-style: italic;">${config.headline}</h2>
      ${config.showCTA ? '<a href="#">Learn More</a>' : ''}
    </header>
    <section class="gallery" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 40px; padding: 50px;">
       <div style="width: 200px; height: 300px; background: #eee;"></div>
       <div style="width: 200px; height: 250px; background: #ddd;"></div>
    </section>
    <footer>
      <p>© 2026 Minimalist Brand</p>
      ${config.showSocials ? '<div>Connect with us</div>' : ''}
    </footer>
  </div>
`;