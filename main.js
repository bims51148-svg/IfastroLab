let angle = 0;

function drawSolarSystem() {
  const c = document.getElementById("solar");
  if (!c) return;
  const ctx = c.getContext("2d");

  const size = Math.min(window.innerWidth * 0.9, 500);
  c.width = size;
  c.height = size;
  const center = size / 2;
  const orbitRadius = size * 0.28;
  const sunRadius = size * 0.07;
  const earthRadius = size * 0.024;

  ctx.clearRect(0, 0, c.width, c.height);

  ctx.beginPath();
  ctx.arc(center, center, sunRadius, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(center, center, orbitRadius, 0, Math.PI * 2);
  ctx.strokeStyle = "white";
  ctx.stroke();

  const earthX = center + orbitRadius * Math.cos(angle);
  const earthY = center + orbitRadius * Math.sin(angle);

  ctx.beginPath();
  ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
  ctx.fillStyle = "lightblue";
  ctx.fill();

  angle += 0.01;
  requestAnimationFrame(drawSolarSystem);
}

window.showSolar = function () {
  document.getElementById("content").innerHTML = `
    <h2>🪐 Simulasi Tata Surya</h2>
    <p>Simulasi orbit sederhana untuk memahami gerak Bumi mengelilingi Matahari.</p>
    <canvas id="solar"></canvas>
  `;
  drawSolarSystem();
};

function getMoonPhaseText() {
  const phases = [
    "🌑 Bulan Baru",
    "🌒 Sabit Awal",
    "🌓 Kuartal Awal",
    "🌔 Cembung Awal",
    "🌕 Bulan Purnama",
    "🌖 Cembung Akhir",
    "🌗 Kuartal Akhir",
    "🌘 Sabit Akhir"
  ];
  return phases[Math.floor(Math.random() * phases.length)];
}

window.showMoon = function () {
  const phase = getMoonPhaseText();
  document.getElementById("content").innerHTML = `
    <h2>🌙 Fase Bulan</h2>
    <p>Menampilkan fase Bulan berdasarkan perhitungan sederhana.</p>
    <div class="moon-img" id="moonImg"></div>
    <h3>${phase}</h3>
  `;
  document.getElementById("moonImg").style.background = "url('https://i.ibb.co/4VJTP0F/moon.png')";
  document.getElementById("moonImg").style.backgroundSize = "cover";
};

window.showQibla = function () {
  document.getElementById("content").innerHTML = `
    <h2>🧭 Arah Kiblat</h2>
    <p>Menggunakan kompas perangkat untuk menampilkan arah Ka'bah.</p>
    <h3 id="qibla">Memuat arah kiblat...</h3>
  `;
  const latKabah = 21.4225;
  const lonKabah = 39.8262;
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const y = Math.sin(lonKabah - lon);
    const x = Math.cos(lat) * Math.tan(latKabah) - Math.sin(lat) * Math.cos(lonKabah - lon);
    let bearing = Math.atan2(y, x) * (180 / Math.PI);
    bearing = (bearing + 360) % 360;
    document.getElementById("qibla").textContent =
      `Arah Kiblat dari lokasimu: ${bearing.toFixed(2)}°`;
  });
};

window.showSun = function () {
  document.getElementById("content").innerHTML = `
    <h2>☀️ Posisi Matahari</h2>
    <p>Menghitung posisi Matahari berdasarkan waktu saat ini.</p>
    <h3 id="sunPos">Mengambil data...</h3>
  `;
  const now = new Date();
  const h = now.getHours();
  const altitude = Math.abs(Math.sin(h / 24 * Math.PI)) * 70;
  const azimuth = (h * 15) % 360;
  document.getElementById("sunPos").textContent =
    `Ketinggian: ${altitude.toFixed(2)}° | Arah (Azimuth): ${azimuth.toFixed(2)}°`;
};

window.showCalendar = function () {
  const date = new Date().toLocaleDateString("id-ID");
  document.getElementById("content").innerHTML = `
    <h2>📅 Kalender Astronomi</h2>
    <p>Tanggal hari ini berdasarkan kalender Masehi.</p>
    <h3>${date}</h3>
  `;
};
