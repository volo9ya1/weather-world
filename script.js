const API_KEY = "a768be6a11bebe3aa2e0be24666a1c02"; 
let currentLang = localStorage.getItem('weather_app_lang') || 'ru';

// 🌐 СЛОВАРЬ ПЕРЕВОДОВ (RU, EN, UZ)
const i18n = {
  ru: {
    searchPlaceholder: "Введите город...",
    humidityLabel: "Влажность",
    windLabel: "Ветер",
    pressureLabel: "Давление",
    recTitle: "💡 Советы на сегодня",
    clothesTitle: "Что надеть?",
    walkTitle: "Идти ли гулять?",
    windUnit: "м/с",
    pressureUnit: "мм",
    conditions: {
      clear: "Ясно",
      clouds: "Облачно",
      rain: "Дождь",
      drizzle: "Морось",
      thunderstorm: "Гроза",
      snow: "Снег",
      mist: "Туман",
      fog: "Густой туман"
    },
    clothes: {
      hot: "Легкая майка, шорты и кепка. Не забудьте воду!",
      warm: "Футболка и легкая толстовка или джинсовка.",
      cool: "Теплая куртка, худи и закрытая обувь.",
      cold: "Зимний пуховик, шапка, шарф и перчатки!"
    },
    walk: {
      rain: "На улице дождь. Лучше остаться дома с чаем или взять зонт ☔",
      snow: "Отличное время для снежков и прогулки по парку ❄️",
      extremeHot: "Слишком жарко. Держитесь в тени и пейте больше воды 🌅",
      good: "Хорошая температура для прогулки или занятий спортом ☀️",
      normal: "Прекрасная погода для прогулок на свежем воздухе! 🚶‍♂️"
    }
  },
  en: {
    searchPlaceholder: "Enter city...",
    humidityLabel: "Humidity",
    windLabel: "Wind",
    pressureLabel: "Pressure",
    recTitle: "💡 Today's Tips",
    clothesTitle: "What to wear?",
    walkTitle: "Go for a walk?",
    windUnit: "m/s",
    pressureUnit: "mmHg",
    conditions: {
      clear: "Clear sky",
      clouds: "Clouds",
      rain: "Rain",
      drizzle: "Drizzle",
      thunderstorm: "Thunderstorm",
      snow: "Snow",
      mist: "Mist",
      fog: "Fog"
    },
    clothes: {
      hot: "Light t-shirt, shorts, and a cap. Don't forget water!",
      warm: "T-shirt and a light hoodie or denim jacket.",
      cool: "Warm jacket, hoodie, and closed shoes.",
      cold: "Winter coat, hat, scarf, and gloves!"
    },
    walk: {
      rain: "It's raining. Better stay inside with tea or bring an umbrella ☔",
      snow: "Great time for snowball fights and a park walk ❄️",
      extremeHot: "Too hot. Stay in the shade and drink plenty of water 🌅",
      good: "Great temperature for a walk or outdoor workout ☀️",
      normal: "Wonderful weather for a walk outdoors! 🚶‍♂️"
    }
  },
  uz: {
    searchPlaceholder: "Shaharni kiriting...",
    humidityLabel: "Namlik",
    windLabel: "Shamol",
    pressureLabel: "Bosim",
    recTitle: "💡 Bugungi maslahatlar",
    clothesTitle: "Nima kiyish kerak?",
    walkTitle: "Sayrga chiqish kerakmi?",
    windUnit: "m/s",
    pressureUnit: "mm Hg",
    conditions: {
      clear: "Ochiq havo",
      clouds: "Bulutli",
      rain: "Yomg'ir",
      drizzle: "Maydalab yog'adigan yomg'ir",
      thunderstorm: "Momaqaldiroq",
      snow: "Qor",
      mist: "Tuman",
      fog: "Qalin tuman"
    },
    clothes: {
      hot: "Yengil futbolka, shorti va kepka. Suv olishni unutmang!",
      warm: "Futbolka va yengil svetshot yoki djinsovka.",
      cool: "Issiq kurtka, xudi va yopiq poyabzal.",
      cold: "Qishki kurtka, qalpoq, sharf va qo'lqoplar!"
    },
    walk: {
      rain: "Tashqarida yomg'ir yog'moqda. Soyabon oling yoki uyda qoling ☔",
      snow: "Qor o'ynash va parkda sayr qilish uchun ajoyib vaqt ❄️",
      extremeHot: "Juda issiq. Soyada bo'ling va ko'proq suv iching 🌅",
      good: "Sayr qilish yoki sport bilan shug'ullanish uchun yaxshi havo ☀️",
      normal: "Taza havoda sayr qilish uchun ajoyib ob-havo! 🚶‍♂️"
    }
  }
};

let currentWeatherData = null;

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
      () => {
        fetchWeather('Ташкент');
      }
    );
  } else {
    fetchWeather('Ташкент');
  }
}

async function fetchWeatherByCoords(lat, lon) {
  try {
    const apiLang = currentLang === 'uz' ? 'en' : currentLang;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${apiLang}&appid=${API_KEY}`);
    if (!res.ok) throw new Error('Error');
    const data = await res.json();
    processWeatherData(data);
  } catch (err) {
    fetchWeather('Ташкент');
  }
}

async function fetchWeather(city) {
  try {
    const apiLang = currentLang === 'uz' ? 'en' : currentLang;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=${apiLang}&appid=${API_KEY}`);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    processWeatherData(data);
  } catch (err) {
    console.error(err);
  }
}

function processWeatherData(data) {
  currentWeatherData = data;
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
}

function isNightTime(sunrise, sunset) {
  const now = Math.floor(Date.now() / 1000);
  return now < sunrise || now > sunset;
}

function updateStaticTranslations() {
  const t = i18n[currentLang];
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  const searchInput = document.getElementById('city-input');
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;
}

function updateUI(weather) {
  updateStaticTranslations();

  const t = i18n[currentLang];
  const translatedDesc = t.conditions[weather.condition] || weather.description;

  document.getElementById('city-name').textContent = weather.city;
  document.getElementById('temp-value').textContent = weather.temp > 0 ? `+${weather.temp}` : weather.temp;
  document.getElementById('weather-desc').textContent = translatedDesc;
  document.getElementById('humidity').textContent = `${weather.humidity}%`;
  document.getElementById('wind-speed').textContent = `${weather.wind} ${t.windUnit}`;
  document.getElementById('pressure').textContent = `${weather.pressure} ${t.pressureUnit}`;

  applyThemeAndEffects(weather.condition, weather.isNight);
  generateRecommendations(weather.temp, weather.condition);
}

function applyThemeAndEffects(condition, isNight) {
  document.body.className = '';

  if (isNight) {
    document.body.classList.add('theme-night');
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) {
      startWeatherAnimation('rain');
    } else if (condition.includes('snow')) {
      startWeatherAnimation('snow');
    } else {
      startWeatherAnimation('stars');
    }
    return;
  }

  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) {
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
  const t = i18n[currentLang];
  const clothesElem = document.getElementById('rec-clothes');
  const walkElem = document.getElementById('rec-walk');

  if (temp >= 25) {
    clothesElem.textContent = t.clothes.hot;
  } else if (temp >= 15) {
    clothesElem.textContent = t.clothes.warm;
  } else if (temp >= 5) {
    clothesElem.textContent = t.clothes.cool;
  } else {
    clothesElem.textContent = t.clothes.cold;
  }

  const isRainy = condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunder');
  const isSnowy = condition.includes('snow');

  if (isRainy) {
    walkElem.textContent = t.walk.rain;
  } else if (isSnowy) {
    walkElem.textContent = t.walk.snow;
  } else if (temp >= 40) {
    walkElem.textContent = t.walk.extremeHot;
  } else if (temp >= 22) {
    walkElem.textContent = t.walk.good;
  } else {
    walkElem.textContent = t.walk.normal;
  }
}

// События переключения языка (без повторного запроса к API)
const langSelect = document.getElementById('lang-select');
if (langSelect) {
  langSelect.value = currentLang;

  langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('weather_app_lang', currentLang);
    
    if (currentWeatherData) {
      processWeatherData(currentWeatherData);
    } else {
      getUserLocation();
    }
  });
}

// Поиск
const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) fetchWeather(city);
  });
}

const cityInput = document.getElementById('city-input');
if (cityInput) {
  cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const city = cityInput.value.trim();
      if (city) fetchWeather(city);
    }
  });
}

// Старт
getUserLocation();
