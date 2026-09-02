const form = document.getElementById('tripForm');
const result = document.getElementById('result');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const budget = document.getElementById('budget').value;
  const duration = document.getElementById('duration').value;
  const weather = document.getElementById('weather').value;
  const company = document.getElementById('company').value;
  const interests = [...document.querySelectorAll('.chips input:checked')].map(i => i.value);

  result.style.display = 'block';
  result.innerHTML = `<strong>Toiveet lukittu ✓</strong><br>Budjetti ${budget} · ${duration} · ${weather} · ${company}${interests.length ? ` · ${interests.join(', ')}` : ''}<br><br>🤫 Kohde on nyt salainen. Tämä on demo – oikeassa NoClue-matkassa seuraavaksi alkaisi kohteen valinta.`;
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
