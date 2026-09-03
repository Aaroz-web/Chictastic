const form = document.getElementById('tripForm');
const result = document.getElementById('result');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    budget: document.getElementById('budget').value,
    duration: document.getElementById('duration').value,
    weather: document.getElementById('weather').value,
    company: document.getElementById('company').value,
    interests: [...document.querySelectorAll('.chips input:checked')].map(i => i.value)
  };

  const savedTrips = JSON.parse(localStorage.getItem('noclueTrips') || '[]');
  savedTrips.push({ ...data, createdAt: new Date().toISOString() });
  localStorage.setItem('noclueTrips', JSON.stringify(savedTrips));

  const interests = data.interests.length ? data.interests.join(', ') : 'Ei määritelty';
  result.style.display = 'block';
  result.innerHTML = `<strong>Toiveet lukittu ✓</strong><br>Budjetti ${data.budget} · ${data.duration} · ${data.weather} · ${data.company}<br>Kiinnostukset: ${interests}<br><br><strong>🤫 Kohde pysyy salaisena.</strong> Olemme tallentaneet matkatoiveesi tähän selaimeen. Seuraava vaihe on yhdistää lomake oikeaan tilaus- ja yhteydenottokanavaan.`;
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Smooth reveal for sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.step-card,.about-grid>div,.competitor-row>div').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});
