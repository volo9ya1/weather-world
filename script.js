// ==========================================================================
// 🔑 КОНФИГУРАЦИЯ API
// Вставьте ваш API-ключ OpenWeatherMap при наличии. Если оставить пустым —
// запустится встроенный ДЕМО-режим с генерацией условий.
// ==========================================================================
const API_KEY = ""; 

// 🌧️ CANVAS ЭФФЕКТЫ
const canvas = document.getElementById('weather-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrameId = null;
let currentEffect = 'none';

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor(type) {
    this.type = type;
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    
    if (this.type === 'rain') {
      this.length = Math.random() * 20 + 10;
      this.speed = Math.random() * 10 + 15;
      this.opacity = Math.random() * 0.5 + 0.3;
    } else if (this.type === 'snow') {
      this.radius = Math.random() * 4 + 1;
      this.speed = Math.random() * 2 + 1;
      this.velX = Math.random() * 1 - 0.5;
    } else if (this.type === 'stars') {
      this.radius = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random();
      this.alphaSpeed = Math.random() * 0.02 + 0.005;
    }
  }

  update() {
    if (this.type === 'rain') {
      this.y += this.speed;
      if (this.y > canvas.height) {
        this.y = -this.length;
        this.x = Math.random() * canvas.width;
      }
    } else if (this.type === 'snow') {
      this.y += this.speed;
      this.x += this.velX;
      if (this.y > canvas.height) {
        this.y = -this.radius;
        this.x = Math.random() * canvas.width;
      }
    } else if (this.type === 'stars') {
      this.alpha += this.alphaSpeed;
      if (this.alpha > 1 || this.alpha < 0) {
        this.alphaSpeed = -this.alphaSpeed;
      }
    }
  }

  draw() {
    ctx.beginPath();
    if (this.type === 'rain') {
      ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
      ctx.lineWidth = 1.5;
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.length);
      ctx.stroke();
    } else if (this.type === 'snow') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'stars') {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(this.alpha)})`;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function startWeatherAnimation(effectType) {
  if (currentEffect === effectType) return;
  currentEffect = effectType;

  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  particles = [];

  let count = 0;
  if (effectType === 'rain') count = 150;
  if (effectType === 'snow') count = 100;
  if (effectType === 'stars') count = 200;

  for (let i = 0; i < count; i++) {
    particles.push(new Particle(effectType));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animationFrameId = requestAnimationFrame(animate);
  }

  if (effectType !== 'none') animate();
}

// ==========================================================================
// 📍 ГЕОЛОКАЦИЯ И ДАННЫЕ
// ==========================================================================
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        fetchWeather('Ташкент');
      }
    );
  } else {
    fetchWeather('Ташкент');
  }
}

async function fetchWeatherByCoords(lat, lon) {
  if (!API_KEY) {
    useMockData('Ташкент');
    return;
  }

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${API_KEY}`);
    if (!res.ok) throw new Error('Не удалось определить данные');
    const data = await res.json();

    updateUI({
      city: data.name,
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      wind: data.wind.speed,
      pressure: Math.round(data.main.pressure * 0.750063),
      condition: data.weather[0].main.toLowerCase(),
      description: data.weather[0].description,
      isNight: isNightTime(data.sys.sunrise, data.sys.sunset)
    });
  } catch (err) {
    useMockData('Ташкент');
  }
}

async function fetchWeather(city) {
  if (!API_KEY) {
    useMockData(city);
    return;
  }

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=ru&appid=${API_KEY}`);
    if (!res.ok) throw new Error('Город не найден');
    const data = await res.json();

    updateUI({
      city: data.name,
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      wind: data.wind.speed,
      pressure: Math.round(data.main.pressure * 0.750063),
      condition: data.weather[0].main.toLowerCase(),
      description: data.weather[0].description,
      isNight: isNightTime(data.sys.sunrise, data.sys.sunset)
    });
  } catch (err) {
    alert(err.message);
  }
}

function isNightTime(sunrise, sunset) {
  const now = Math.floor(Date.now() / 1000);
  return now < sunrise || now > sunset;
}

function updateUI(weather) {
  document.getElementById('city-name').textContent = weather.city;
  document.getElementById('temp-value').textContent = weather.temp > 0 ? `+${weather.temp}` : weather.temp;
  document.getElementById('weather-desc').textContent = weather.description;
  document.getElementById('humidity').textContent = `${weather.humidity}%`;
  document.getElementById('wind-speed').textContent = `${weather.wind} м/с`;
  document.getElementById('pressure').textContent = `${weather.pressure} мм`;

  applyThemeAndEffects(weather.condition, weather.isNight);
  generateRecommendations(weather.temp, weather.condition);
}

function applyThemeAndEffects(condition, isNight) {
  document.body.className = '';

  if (isNight) {
    document.body.classList.add('theme-night');
    startWeatherAnimation('stars');
    return;
  }

  if (condition.includes('rain') || condition.includes('drizzle')) {
    document.body.classList.add('theme-rainy');
    startWeatherAnimation('rain');
  } else if (condition.includes('snow')) {
    document.body.classList.add('theme-snowy');
    startWeatherAnimation('snow');
  } else if (condition.includes('cloud')) {
    document.body.classList.add('theme-cloudy');
    startWeatherAnimation('none');
  } else {
    document.body.classList.add('theme-sunny');
    startWeatherAnimation('none');
  }
}

function generateRecommendations(temp, condition) {
  const clothesElem = document.getElementById('rec-clothes');
  const walkElem = document.getElementById('rec-walk');

  if (temp >= 25) {
    clothesElem.textContent = "Легкая майка, шорты и кепка. Не забудьте воду!";
  } else if (temp >= 15) {
    clothesElem.textContent = "Футболка и легкая толстовка или джинсовка.";
  } else if (temp >= 5) {
    clothesElem.textContent = "Теплая куртка, худи и закрытая обувь.";
  } else {
    clothesElem.textContent = "Зимний пуховик, шапка, шарф и перчатки!";
  }

  if (condition.includes('rain')) {
    walkElem.textContent = "Лучше остаться дома с чаем или взять крепкий зонт ☔";
  } else if (condition.includes('snow')) {
    walkElem.textContent = "Отличное время для снежков и прогулки по парку ❄️";
  } else if (temp > 30) {
    walkElem.textContent = "Слишком жарко. Прогулку лучше отложить на вечер 🌅";
  } else {
    walkElem.textContent = "Прекрасная погода для прогулок на свежем воздухе! 🚶‍♂️";
  }
}

function useMockData(cityName) {
  const mocks = {
    'дождь': { city: 'Лондон', temp: 14, humidity: 88, wind: 6.5, pressure: 748, condition: 'rain', description: 'Небольшой дождь', isNight: false },
    'снег': { city: 'Москва', temp: -5, humidity: 90, wind: 3.1, pressure: 755, condition: 'snow', description: 'Снегопад', isNight: false },
    'ночь': { city: 'Токио', temp: 18, humidity: 60, wind: 2.0, pressure: 760, condition: 'clear', description: 'Ясная ночь', isNight: true },
    'default': { city: cityName || 'Ташкент', temp: 28, humidity: 32, wind: 4.0, pressure: 752, condition: 'clear', description: 'Солнечно и ясно', isNight: false }
  };

  const key = cityName.toLowerCase();
  const data = mocks[key] || mocks['default'];
  updateUI(data);
}

// Обработчики событий
document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value.trim();
  if (city) fetchWeather(city);
});

document.getElementById('city-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = document.getElementById('city-input').value.trim();
    if (city) fetchWeather(city);
  }
});

// Старт
getUserLocation();
