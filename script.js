const API_KEY = "a768be6a11bebe3aa2e0be24666a1c02";
let currentLang = localStorage.getItem('weather_app_lang') || 'ru';

const i18n = {
  ru: {
    modalTitle: "ВЫБЕРИТЕ РЕЖИМ ИНТЕРФЕЙСА:",
    modalMobileTitle: "СМАРТФОН / ПЛАНШЕТ",
    modalMobileDesc: "Выберите этот режим, если хотите использовать сенсорный экран для управления",
    modalMobileBtn: "СЕНСОРНЫЙ",
    modalPcTitle: "ПК / TV BOX",
    modalPcDesc: "Выберите этот режим для работы на широком экране с клавиатурой и мышью",
    modalPcBtn: "ПК РЕЖИМ",
    searchPlaceholder: "Введите город...",
    humidityLabel: "Влажность",
    windLabel: "Ветер",
    pressureLabel: "Давление",
    uvLabel: "УФ-индекс",
    selectedCityLabel: "Выбранный город:",
    recTitle: "💡 Советы на сегодня",
    clothesTitle: "Что надеть?",
    walkTitle: "Идти ли гулять?",
    windUnit: "м/с",
    pressureUnit: "мм",
    conditions: {
      "clear": "Ясно", "clouds": "Облачно", "overcast clouds": "Пасмурно",
      "few clouds": "Малооблачно", "scattered clouds": "Переменная облачность",
      "broken clouds": "Облачно с прояснениями", "rain": "Дождь",
      "light rain": "Небольшой дождь", "moderate rain": "Умеренный дождь",
      "drizzle": "Морось", "thunderstorm": "Гроза", "snow": "Снег",
      "mist": "Туман", "fog": "Густой туман"
    },
    clothes: {
      hot: "Легкая майка, шорты и кепка. Не забудьте воду!",
      warm: "Футболка и легкая толстовка или джинсовка.",
      cool: "Теплая куртка, худи и закрытая обувь.",
      cold: "Зимний пуховик, шапка, шарф и перчатки!"
    },
    walk: {
      rain: "На улице дождь. Выпей горячий чай или возьми зонт ☔",
      snow: "Отличное время для снежков и прогулки по парку ❄️",
      extremeHot: "Слишком жарко. Держитесь в тени и пейте больше воды 🌅",
      good: "Хорошая температура для прогулки или занятий спортом ☀️",
      normal: "Прекрасная погода для прогулок на свежем воздухе! 🚶‍♂️"
    }
  },
  en: {
    modalTitle: "SELECT INTERFACE MODE:",
    modalMobileTitle: "SMARTPHONE / TABLET",
    modalMobileDesc: "Select this mode if you want to use touchscreen controls",
    modalMobileBtn: "TOUCH",
    modalPcTitle: "PC / TV BOX",
    modalPcDesc: "Select this mode for wide screens using keyboard and mouse",
    modalPcBtn: "PC MODE",
    searchPlaceholder: "Enter city...",
    humidityLabel: "Humidity", windLabel: "Wind", pressureLabel: "Pressure",
    uvLabel: "UV Index", selectedCityLabel: "Selected city:",
    recTitle: "💡 Today's Tips", clothesTitle: "What to wear?", walkTitle: "Go for a walk?",
    windUnit: "m/s", pressureUnit: "mmHg",
    conditions: {
      "clear": "Clear sky", "clouds": "Clouds", "overcast clouds": "Overcast clouds",
      "few clouds": "Few clouds", "scattered clouds": "Scattered clouds",
      "broken clouds": "Broken clouds", "rain": "Rain", "light rain": "Light rain",
      "moderate rain": "Moderate rain", "drizzle": "Drizzle", "thunderstorm": "Thunderstorm",
      "snow": "Snow", "mist": "Mist", "fog": "Fog"
    },
    clothes: {
      hot: "Light t-shirt, shorts, and a cap. Don't forget water!",
      warm: "T-shirt and a light hoodie or denim jacket.",
      cool: "Warm jacket, hoodie, and closed shoes.",
      cold: "Winter coat, hat, scarf, and gloves!"
    },
    walk: {
      rain: "It's raining. Drink hot tea inside or bring an umbrella ☔",
      snow: "Great time for snowball fights and a park walk ❄️",
      extremeHot: "Too hot. Stay in the shade and drink plenty of water 🌅",
      good: "Great temperature for a walk or outdoor workout ☀️",
      normal: "Wonderful weather for a walk outdoors! 🚶‍♂️"
    }
  },
  uz: {
    modalTitle: "INTERFEYS REJIMINI TANLANG:",
    modalMobileTitle: "SMARTFON / PLANSHET",
    modalMobileDesc: "Sensor ekrandan foydalanish uchun ushbu rejimni tanlang",
    modalMobileBtn: "SENSOR",
    modalPcTitle: "PK / TV BOX",
    modalPcDesc: "Katta ekran, klaviatura va sichqoncha uchun ushbu rejimni tanlang",
    modalPcBtn: "PK REJIM",
    searchPlaceholder: "Shaharni kiriting...",
    humidityLabel: "Namlik", windLabel: "Shamol", pressureLabel: "Bosim",
    uvLabel: "UV Indeksi", selectedCityLabel: "Tanlangan shahar:",
    recTitle: "💡 Bugungi maslahatlar", clothesTitle: "Nima kiyish kerak?", walkTitle: "Sayrga chiqish kerakmi?",
    windUnit: "m/s", pressureUnit: "mm Hg",
    conditions: {
      "clear": "Ochiq havo", "clouds": "Bulutli", "overcast clouds": "Juda bulutli",
      "few clouds": "Biroz bulutli", "scattered clouds": "O'rtacha bulutli",
      "broken clouds": "Qisman bulutli", "rain": "Yomg'ir", "light rain": "Yengil yomg'ir",
      "moderate rain": "O'rtacha yomg'ir", "drizzle": "Maydalab yog'adigan yomg'ir",
      "thunderstorm": "Momaqaldiroq", "snow": "Qor", "mist": "Tuman", "fog": "Qalin tuman"
    },
    clothes: {
      hot: "Yengil futbolka, shorti va kepka. Suv olishni unutmang!",
      warm: "Futbolka va yengil svetshot yoki djinsovka.",
      cool: "Issiq kurtka, xudi va yopiq poyabzal.",
      cold: "Qishki kurtka, qalpoq, sharf va qo'lqoplar!"
    },
    walk: {
      rain: "Tashqarida yomg'ir yog'moqda. Issiq choy iching yoki soyabon oling ☔",
      snow: "Qor o'ynash va parkda sayr qilish uchun ajoyib vaqt ❄️",
      extremeHot: "Juda issiq. Soyada bo'ling va ko'proq suv iching 🌅",
      good: "Sayr qilish yoki sport bilan shug'ullanish uchun yaxshi havo ☀️",
      normal: "Taza havoda sayr qilish uchun ajoyib ob-havo! 🚶‍♂️"
    }
  }
};

let currentWeatherData = null;

// Переключение режимов приложения
function setDeviceMode(mode) {
  const container = document.getElementById('app-container');
  if (!container) return;

  if (mode === 'pc') {
    container.classList.remove('mode-mobile');
    container.classList.add('mode-pc');
  } else {
    container.classList.remove('mode-pc');
    container.classList.add('mode-mobile');
  }
}

function selectMode(mode) {
  setDeviceMode(mode);
  const modal = document.getElementById('mode-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// При старте ВСЕГДА вылезает окно
window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('mode-modal');
  if (modal) {
    modal.style.display = 'flex';
  }
});

// Холст (Canvas) для 4K Экранов
const canvas = document.getElementById('weather-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [], animationFrameId = null, currentEffect = 'none';

function resizeCanvas() {
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  if (ctx) ctx.scale(dpr, dpr);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor(type) {
    this.type = type;
    this.reset(true);
  }

  reset(initial = false) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.x = Math.random() * width;
    this.y = initial ? Math.random() * height : -20;

    if (this.type === 'rain') {
      this.length = Math.random() * 25 + 15;
      this.speed = Math.random() * 12 + 18;
      this.opacity = Math.random() * 0.4 + 0.3;
    } else if (this.type === 'snow') {
      this.radius = Math.random() * 3.5 + 1;
      this.speed = Math.random() * 1.8 + 0.8;
      this.velX = Math.random() * 1 - 0.5;
    } else if (this.type === 'stars') {
      this.radius = Math.random() * 1.8 + 0.5;
      this.alpha = Math.random();
      this.alphaSpeed = Math.random() * 0.015 + 0.003;
    }
  }

  update() {
    const height = window.innerHeight;

    if (this.type === 'rain') {
      this.y += this.speed;
      if (this.y > height + 20) this.reset();
    } else if (this.type === 'snow') {
      this.y += this.speed;
      this.x += this.velX;
      if (this.y > height + 10) this.reset();
    } else if (this.type === 'stars') {
      this.alpha += this.alphaSpeed;
      if (this.alpha > 1 || this.alpha < 0) this.alphaSpeed = -this.alphaSpeed;
    }
  }

  draw() {
    if (!ctx) return;
    ctx.beginPath();
    if (this.type === 'rain') {
      ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
      ctx.lineWidth = 1.5;
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.length);
      ctx.stroke();
    } else if (this.type === 'snow') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
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
  if (!canvas || currentEffect === effectType) return;
  currentEffect = effectType;
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  
  particles = [];
  const is4K = window.innerWidth >= 2560;
  let count = 0;
  
  if (effectType === 'rain') count = is4K ? 350 : 180;
  else if (effectType === 'snow') count = is4K ? 250 : 120;
  else if (effectType === 'stars') count = is4K ? 450 : 250;

  for (let i = 0; i < count; i++) {
    particles.push(new Particle(effectType));
  }

  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animationFrameId = requestAnimationFrame(animate);
  }

  if (effectType !== 'none') animate();
}

async function fetchUVIndex(lat, lon) {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=uv_index`);
    if (!res.ok) return 0;
    const data = await res.json();
    return Math.round(data.current.uv_index || 0);
  } catch (err) { return 0; }
}

function updateCornerCityPhoto(cityName) {
  const photoElem = document.getElementById('city-photo-corner');
  if (!photoElem) return;

  const imageUrl = `https://loremflickr.com/600/400/${encodeURIComponent(cityName)},city/all`;
  
  const img = new Image();
  img.src = imageUrl;
  img.onload = () => {
    photoElem.style.backgroundImage = `url('${imageUrl}')`;
  };
  img.onerror = () => {
    photoElem.style.backgroundImage = 'none';
  };
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      () => fetchWeather('Ташкент')
    );
  } else fetchWeather('Ташкент');
}

async function fetchWeatherByCoords(lat, lon) {
  try {
    const apiLang = currentLang === 'uz' ? 'en' : currentLang;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${apiLang}&appid=${API_KEY}`);
    const data = await res.json();
    processWeatherData(data);
  } catch (err) { fetchWeather('Ташкент'); }
}

async function fetchWeather(city) {
  try {
    const apiLang = currentLang === 'uz' ? 'en' : currentLang;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=${apiLang}&appid=${API_KEY}`);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    processWeatherData(data);
  } catch (err) { console.error(err); }
}

async function processWeatherData(data) {
  currentWeatherData = data;
  const uvIndex = await fetchUVIndex(data.coord.lat, data.coord.lon);
  
  updateCornerCityPhoto(data.name);

  updateUI({
    city: data.name,
    temp: Math.round(data.main.temp),
    humidity: data.main.humidity,
    wind: data.wind.speed,
    pressure: Math.round(data.main.pressure * 0.750063),
    uv: uvIndex,
    condition: data.weather[0].main.toLowerCase(),
    description: data.weather[0].description.toLowerCase(),
    isNight: (Math.floor(Date.now() / 1000) < data.sys.sunrise || Math.floor(Date.now() / 1000) > data.sys.sunset)
  });
}

function updateStaticTranslations() {
  const t = i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t && t[key]) el.textContent = t[key];
  });
  const searchInput = document.getElementById('city-input');
  if (searchInput && t) searchInput.placeholder = t.searchPlaceholder;
}

function updateUI(weather) {
  updateStaticTranslations();
  const t = i18n[currentLang];
  
  const translatedDesc = (t.conditions && t.conditions[weather.description]) || 
                         (t.conditions && t.conditions[weather.condition]) || weather.description;

  document.getElementById('city-name').textContent = weather.city;
  document.getElementById('bottom-city-name').textContent = weather.city;
  document.getElementById('temp-value').textContent = weather.temp > 0 ? `+${weather.temp}°C` : `${weather.temp}°C`;
  document.getElementById('weather-desc').textContent = translatedDesc;
  document.getElementById('humidity').textContent = `${weather.humidity}%`;
  document.getElementById('wind-speed').textContent = `${weather.wind} ${t.windUnit}`;
  document.getElementById('pressure').textContent = `${weather.pressure} ${t.pressureUnit}`;

  let uvStatus = "Низкий";
  if (weather.uv >= 3 && weather.uv <= 5) uvStatus = "Умеренный";
  else if (weather.uv >= 6 && weather.uv <= 7) uvStatus = "Высокий 🧴";
  else if (weather.uv >= 8) uvStatus = "Опасный 🕶️";
  document.getElementById('uv-index').textContent = `${weather.uv} (${uvStatus})`;

  if (weather.isNight) {
    if (weather.condition.includes('rain')) startWeatherAnimation('rain');
    else if (weather.condition.includes('snow')) startWeatherAnimation('snow');
    else startWeatherAnimation('stars');
  } else {
    if (weather.condition.includes('rain')) startWeatherAnimation('rain');
    else if (weather.condition.includes('snow')) startWeatherAnimation('snow');
    else startWeatherAnimation('none');
  }

  const clothesElem = document.getElementById('rec-clothes');
  if (clothesElem) {
    if (weather.temp >= 25) clothesElem.textContent = t.clothes.hot;
    else if (weather.temp >= 15) clothesElem.textContent = t.clothes.warm;
    else if (weather.temp >= 5) clothesElem.textContent = t.clothes.cool;
    else clothesElem.textContent = t.clothes.cold;
  }

  const walkElem = document.getElementById('rec-walk');
  if (walkElem) {
    if (weather.condition.includes('rain')) walkElem.textContent = t.walk.rain;
    else if (weather.condition.includes('snow')) walkElem.textContent = t.walk.snow;
    else if (weather.temp >= 40) walkElem.textContent = t.walk.extremeHot;
    else if (weather.temp >= 22) walkElem.textContent = t.walk.good;
    else walkElem.textContent = t.walk.normal;
  }
}

document.getElementById('lang-select').value = currentLang;
document.getElementById('lang-select').addEventListener('change', (e) => {
  currentLang = e.target.value;
  localStorage.setItem('weather_app_lang', currentLang);
  if (currentWeatherData) processWeatherData(currentWeatherData);
  else getUserLocation();
});

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

getUserLocation();
