function render() {
  const config = {
    template: document.getElementById('template-select').value,
    sticky: document.getElementById('toggle-sticky').checked,
    showCTA: document.getElementById('toggle-cta').checked,
    showSocials: document.getElementById('toggle-socials').checked,
    headline: document.getElementById('input-headline').value
  };

  if (config.template === 'modern') {
    previewContainer.innerHTML = templateModern(config);
  } else {
    previewContainer.innerHTML = templateMinimal(config);
  }
}

// Add event listeners to all inputs
document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', render);
});

// Initial render
render();

function generateConfig() {
    const config = { /* ... same as above ... */ };
    console.log("Generated JSON:", JSON.stringify(config, null, 2));
    alert("Check console for JSON output!");
}