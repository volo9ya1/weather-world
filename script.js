const API_KEY = "a768be6a11bebe3aa2e0be24666a1c02";
let currentLang = localStorage.getItem('weather_app_lang') || 'ru';
let isCelsius = localStorage.getItem('weather_app_unit') !== 'false';
let currentWeatherData = null;
let tempChartInstance = null;

const i18n = {
  ru: {
    modalTitle: "ВЫБЕРИТЕ РЕЖИМ ИНТЕРФЕЙСА:",
    modalMobileTitle: "СМАРТФОН / ПЛАНШЕТ",
    modalMobileDesc: "Оптимизированный вертикальный интерфейс для сенсорных экранов",
    modalMobileBtn: "СЕНСОРНЫЙ",
    modalPcTitle: "ПК ",
    modalPcDesc: "Широкоформатный дэшборд со всеми расширенными виджетами",
    modalPcBtn: "ПК РЕЖИМ",
    searchPlaceholder: "Введите город или регион...",
    humidityLabel: "Влажность", windLabel: "Ветер", pressureLabel: "Давление",
    uvLabel: "УФ-индекс", selectedCityLabel: "Активная локация:",
    recTitle: "💡 Умный анализ дня", clothesTitle: "Что надеть?", walkTitle: "Идти ли гулять?",
    windUnit: "м/с", pressureUnit: "мм рт.ст.",
    feelsLikeText: "Ощущается как",
    prodTitle: "🧠 Индекс продуктивности",
    moonTitle: "🌙 Фаза луны",
    forecastTitle: "📅 Прогноз на 5 дней",
    chartTitle: "📈 Температурный тренд (24ч)",
    currencyTitle: "💳 Валюта:",
    langTitle: "🗣️ Язык:",
    chartLabel: "Температура",
    sunriseText: "До рассвета",
    sunsetText: "До заката",
    moonPhases: [
      "🌑 Новолуние", "🌒 Молодая луна", "🌓 Первая четверть", 
      "🌔 Растущая луна", "🌕 Полнолуние", "🌖 Убывающая луна", 
      "🌗 Последняя четверть", "🌘 Старая луна"
    ],
    conditions: {
      "clear": "Ясно", "clouds": "Облачно", "overcast clouds": "Пасмурно",
      "few clouds": "Малооблачно", "scattered clouds": "Переменная облачность",
      "broken clouds": "Облачно с прояснениями", "rain": "Дождь",
      "light rain": "Небольшой дождь", "moderate rain": "Умеренный дождь",
      "drizzle": "Морось", "thunderstorm": "Гроза", "snow": "Снег",
      "mist": "Туман", "fog": "Густой туман"
    },
    clothes: {
      hot: "Легкая майка, шорты и кепка. Обязательно возьмите воду!",
      warm: "Футболка и легкая толстовка или джинсовка.",
      cool: "Теплая куртка, худи и закрытая обувь.",
      cold: "Зимний пуховик, шапка, шарф и перчатки!"
    },
    walk: {
      rain: "На улице идет дождь. Уютно попейте горячий чай дома ☔",
      snow: "Отличное время для прогулки по заснеженному парку ❄️",
      extremeHot: "Слишком жарко. Лучше оставаться в тени 🌅",
      good: "Идеальная погода для прогулки или спорта на улице ☀️",
      normal: "Прекрасные условия для свежего воздуха! 🚶‍♂️"
    },
    prod: {
      low: "⚠️ Низкое давление: Возможна сонливость, пейте больше чистой воды.",
      highHumidity: "💧 Высокая влажность: Воздух тяжеловатый, чаще проветривайте помещение.",
      highPressure: "🧊 Высокое давление: Возможна быстрая утомляемость.",
      good: "⚡ Отличные атмосферные условия для максимальной продуктивности!"
    }
  },
  en: {
    modalTitle: "SELECT INTERFACE MODE:",
    modalMobileTitle: "SMARTPHONE / TABLET",
    modalMobileDesc: "Optimized vertical layout for touchscreens",
    modalMobileBtn: "TOUCH",
    modalPcTitle: "PC ",
    modalPcDesc: "Widescreen dashboard with extended widgets",
    modalPcBtn: "PC MODE",
    searchPlaceholder: "Enter city or region...",
    humidityLabel: "Humidity", windLabel: "Wind", pressureLabel: "Pressure",
    uvLabel: "UV Index", selectedCityLabel: "Active Location:",
    recTitle: "💡 Smart Daily Analysis", clothesTitle: "What to wear?", walkTitle: "Go for a walk?",
    windUnit: "m/s", pressureUnit: "mmHg",
    feelsLikeText: "Feels like",
    prodTitle: "🧠 Productivity Index",
    moonTitle: "🌙 Moon Phase",
    forecastTitle: "📅 5-Day Forecast",
    chartTitle: "📈 Temperature Trend (24h)",
    currencyTitle: "💳 Currency:",
    langTitle: "🗣️ Language:",
    chartLabel: "Temperature",
    sunriseText: "Until sunrise",
    sunsetText: "Until sunset",
    moonPhases: [
      "🌑 New Moon", "🌒 Waxing Crescent", "🌓 First Quarter", 
      "🌔 Waxing Gibbous", "🌕 Full Moon", "🌖 Waning Gibbous", 
      "🌗 Last Quarter", "🌘 Waning Crescent"
    ],
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
      rain: "It's raining. Enjoy hot tea inside ☔",
      snow: "Great time for a walk in the park ❄️",
      extremeHot: "Too hot. Stay in the shade 🌅",
      good: "Great temperature for a walk or outdoor activity ☀️",
      normal: "Wonderful weather for fresh air! 🚶‍♂️"
    },
    prod: {
      low: "⚠️ Low pressure: Drowsiness is possible, drink more pure water.",
      highHumidity: "💧 High humidity: The air is heavy, ventilate the room more often.",
      highPressure: "🧊 High pressure: Rapid fatigue is possible.",
      good: "⚡ Excellent atmospheric conditions for maximum productivity!"
    }
  },
  uz: {
    modalTitle: "INTERFEYS REJIMINI TANLANG:",
    modalMobileTitle: "SMARTFON / PLANSHET",
    modalMobileDesc: "Sensor ekranlar uchun moslashtirilgan interfeys",
    modalMobileBtn: "SENSOR",
    modalPcTitle: "PK ",
    modalPcDesc: "Keng ekranli barcha vidjetlarga ega boshqaruv paneli",
    modalPcBtn: "PK REJIM",
    searchPlaceholder: "Shahar yoki hududni kiriting...",
    humidityLabel: "Namlik", windLabel: "Shamol", pressureLabel: "Bosim",
    uvLabel: "UV Indeksi", selectedCityLabel: "Faol joylashuv:",
    recTitle: "💡 Aqlli kun tahlili", clothesTitle: "Nima kiyish kerak?", walkTitle: "Sayrga chiqish kerakmi?",
    windUnit: "m/s", pressureUnit: "mm sim. ust.",
    feelsLikeText: "Sezilishi",
    prodTitle: "🧠 Samaradorlik indeksi",
    moonTitle: "🌙 Oy fazasi",
    forecastTitle: "📅 5 kunlik prognoz",
    chartTitle: "📈 Harorat trendi (24s)",
    currencyTitle: "💳 Valyuta:",
    langTitle: "🗣️ Til:",
    chartLabel: "Harorat",
    sunriseText: "Tong otishigacha",
    sunsetText: "Quyosh botishigacha",
    moonPhases: [
      "🌑 Yangi oy", "🌒 O'sib boruvchi oy", "🌓 Birinchi chorak", 
      "🌔 Qavariq oy", "🌕 To'lin oy", "🌖 Kichiklashib boruvchi oy", 
      "🌗 Oxirgi chorak", "🌘 Eski oy"
    ],
    conditions: {
      "clear": "Ochiq havo", "clouds": "Bulutli", "overcast clouds": "Juda bulutli",
      "few clouds": "Biroz bulutli", "scattered clouds": "O'rtacha bulutli",
      "broken clouds": "Qisman bulutli", "rain": "Yomg'ir", "light rain": "Yengil yomg'ir",
      "moderate rain": "O'rtacha yomg'ir", "drizzle": "Mayda yomg'ir",
      "thunderstorm": "Momaqaldiroq", "snow": "Qor", "mist": "Tuman", "fog": "Qalin tuman"
    },
    clothes: {
      hot: "Yengil futbolka, shorti va kepka. Suv olishni unutmang!",
      warm: "Futbolka va yengil svetshot yoki djinsovka.",
      cool: "Issiq kurtka, xudi va yopiq poyabzal.",
      cold: "Qishki kurtka, qalpoq, sharf va qo'lqoplar!"
    },
    walk: {
      rain: "Tashqarida yomg'ir. Uyda issiq choy iching ☔",
      snow: "Parkda sayr qilish uchun ajoyib vaqt ❄️",
      extremeHot: "Juda issiq. Soyada bo'lish tavsiya etiladi 🌅",
      good: "Sayr qilish yoki sport uchun ajoyib havo ☀️",
      normal: "Taza havoda yurish uchun ajoyib sharoit! 🚶‍♂️"
    },
    prod: {
      low: "⚠️ Past bosim: Uyquchanlik bo'lishi mumkin, ko'proq toza suv iching.",
      highHumidity: "💧 Yuqori namlik: Havo og'irroq, xonani tez-tez shamollatib turing.",
      highPressure: "🧊 Yuqori bosim: Tez charchash kuzatilishi mumkin.",
      good: "⚡ Maksimal samaradorlik uchun ajoyib atmosfera sharoitlari!"
    }
  }
};

let favorites = JSON.parse(localStorage.getItem('weather_favs')) || ['Ташкент', 'Москва', 'Лондон'];

function renderFavorites() {
  const bar = document.getElementById('favorites-bar');
  if (!bar) return;
  bar.innerHTML = '';
  favorites.forEach(city => {
    const chip = document.createElement('div');
    chip.className = 'fav-chip';
    chip.innerHTML = `📍 ${city}`;
    chip.onclick = () => fetchWeather(city);
    bar.appendChild(chip);
  });
}

function toggleFavorite(cityName) {
  const index = favorites.indexOf(cityName);
  if (index === -1) favorites.push(cityName);
  else favorites.splice(index, 1);
  localStorage.setItem('weather_favs', JSON.stringify(favorites));
  renderFavorites();
  updateStarButton(cityName);
}

function updateStarButton(cityName) {
  const btn = document.getElementById('fav-toggle-btn');
  if (!btn) return;
  btn.textContent = favorites.includes(cityName) ? '★' : '☆';
  btn.onclick = () => toggleFavorite(cityName);
}

function formatTemp(tempC) {
  if (isCelsius) {
    return tempC > 0 ? `+${Math.round(tempC)}°C` : `${Math.round(tempC)}°C`;
  } else {
    const tempF = (tempC * 9/5) + 32;
    return `${Math.round(tempF)}°F`;
  }
}

document.getElementById('unit-toggle').addEventListener('click', () => {
  isCelsius = !isCelsius;
  localStorage.setItem('weather_app_unit', isCelsius);
  if (currentWeatherData) processWeatherData(currentWeatherData);
});

const popularCities = [
  { name: "Ташкент", country: "UZ", lat: 41.2995, lon: 69.2401 },
  { name: "Москва", country: "RU", lat: 55.7558, lon: 37.6173 },
  { name: "Санкт-Петербург", country: "RU", lat: 59.9343, lon: 30.3351 },
  { name: "Лондон", country: "GB", lat: 51.5074, lon: -0.1278 },
  { name: "New York", country: "US", lat: 40.7128, lon: -74.0060 },
  { name: "Дубай", country: "AE", lat: 25.2048, lon: 55.2708 },
  { name: "Стамбул", country: "TR", lat: 41.0082, lon: 28.9784 },
  { name: "Самарканд", country: "UZ", lat: 39.6542, lon: 66.9597 },
  { name: "Бухара", country: "UZ", lat: 39.7747, lon: 64.4286 }
];

const cityInput = document.getElementById('city-input');
const autocompleteList = document.getElementById('autocomplete-list');

cityInput.addEventListener('input', (e) => {
  const val = e.target.value.trim().toLowerCase();
  autocompleteList.innerHTML = '';
  if (!val) { autocompleteList.style.display = 'none'; return; }
  const filtered = popularCities.filter(city => city.name.toLowerCase().includes(val));
  if (filtered.length === 0) { autocompleteList.style.display = 'none'; return; }
  filtered.forEach(item => {
    const div = document.createElement('div');
    div.className = 'autocomplete-item';
    div.textContent = `${item.name} (${item.country})`;
    div.onclick = () => {
      cityInput.value = item.name;
      autocompleteList.style.display = 'none';
      fetchWeatherByCoords(item.lat, item.lon);
    };
    autocompleteList.appendChild(div);
  });
  autocompleteList.style.display = 'block';
});

document.addEventListener('click', (e) => {
  if (e.target !== cityInput && e.target !== autocompleteList) {
    autocompleteList.style.display = 'none';
  }
});

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
  if (modal) modal.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('mode-modal');
  if (modal) modal.style.display = 'flex';
  renderFavorites();
  getUserLocation();
});

const countriesDB = {
  "UZ": { currency: "Узбекский сум (UZS)", languages: "Узбекский" },
  "RU": { currency: "Российский рубль (RUB)", languages: "Русский" },
  "US": { currency: "Доллар США (USD)", languages: "Английский" },
  "GB": { currency: "Британский фунт (GBP)", languages: "Английский" },
  "KZ": { currency: "Казахский тенге (KZT)", languages: "Казахский, Русский" },
  "TR": { currency: "Турецкая лира (TRY)", languages: "Турецкий" },
  "DE": { currency: "Евро (EUR)", languages: "Немецкий" },
  "FR": { currency: "Евро (EUR)", languages: "Французский" },
  "AE": { currency: "Дирхам ОАЭ (AED)", languages: "Арабский" }
};

function fetchCountryInfo(countryCode) {
  const info = countriesDB[countryCode] || { currency: "Местная валюта", languages: "Государственный" };
  document.getElementById('country-currency').textContent = info.currency;
  document.getElementById('country-language').textContent = info.languages;
}

function calculateProductivity(pressureMmHg, humidity) {
  const t = i18n[currentLang].prod;
  if (pressureMmHg < 740) return t.low;
  if (humidity > 85) return t.highHumidity;
  if (pressureMmHg > 775) return t.highPressure;
  return t.good;
}

function getSunCountdown(sunrise, sunset) {
  const now = Math.floor(Date.now() / 1000);
  let target, name;
  const t = i18n[currentLang];
  if (now < sunrise) {
    target = sunrise; name = t.sunriseText;
  } else if (now < sunset) {
    target = sunset; name = t.sunsetText;
  } else {
    target = sunrise + 86400; name = t.sunriseText;
  }
  const diff = target - now;
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  return `${name}: ${h}ч. ${m}мин.`;
}

function getMoonPhase() {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 3) { year--; month += 12; }
  ++month;
  let c = 365.25 * year;
  let e = 30.6 * month;
  let jd = c + e + day - 694039.0;
  jd /= 29.53058867;
  let b = parseInt(jd);
  jd -= b;
  let phase = Math.round(jd * 8);
  const phases = i18n[currentLang].moonPhases;
  return phases[phase % 8];
}

function renderTemperatureChart(forecastList) {
  const ctx = document.getElementById('tempChart').getContext('2d');
  const labels = forecastList.slice(0, 8).map(item => item.dt_txt.slice(11, 16));
  const temps = forecastList.slice(0, 8).map(item => isCelsius ? item.main.temp : (item.main.temp * 9/5) + 32);
  const t = i18n[currentLang];

  if (tempChartInstance) tempChartInstance.destroy();

  tempChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${t.chartLabel} (${isCelsius ? '°C' : '°F'})`,
        data: temps,
        borderColor: '#4facfe',
        backgroundColor: 'rgba(79, 172, 254, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: 'rgba(255,255,255,0.7)', font: { size: 10 } }, grid: { display: false } },
        y: { ticks: { color: 'rgba(255,255,255,0.7)', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });
}

async function fetch5DayForecast(lat, lon) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    const data = await res.json();
    const daily = data.list.filter((_, idx) => idx % 8 === 0);
    const grid = document.getElementById('forecast-grid');
    if (!grid) return;
    grid.innerHTML = '';
    daily.slice(0, 5).forEach(day => {
      const dateStr = new Date(day.dt * 1000).toLocaleDateString(currentLang, { weekday: 'short' });
      const tempFormatted = formatTemp(day.main.temp);
      const icon = day.weather[0].main.toLowerCase().includes('rain') ? '🌧️' : 
                   day.weather[0].main.toLowerCase().includes('snow') ? '❄️' : '☀️';
      grid.innerHTML += `
        <div class="forecast-card">
          <div class="day">${dateStr}</div>
          <div class="icon">${icon}</div>
          <div class="temp">${tempFormatted}</div>
        </div>
      `;
    });
    renderTemperatureChart(data.list);
  } catch (err) { console.error(err); }
}

async function fetchUVIndex(lat, lon) {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=uv_index`);
    const data = await res.json();
    return Math.round(data.current.uv_index || 0);
  } catch (err) { return 0; }
}

function updateCornerCityPhoto(cityName) {
  const elem = document.getElementById('city-photo-corner');
  if (!elem) return;
  const url = `https://loremflickr.com/600/400/${encodeURIComponent(cityName)},city/all`;
  const img = new Image();
  img.src = url;
  img.onload = () => { elem.style.backgroundImage = `url('${url}')`; };
  img.onerror = () => { elem.style.backgroundImage = 'none'; };
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      () => fetchWeather('Ташкент')
    );
  } else fetchWeather('Ташкент');
}

async function fetchWeatherByCoords(lat, lon) {
  try {
    const langParam = currentLang === 'uz' ? 'en' : currentLang;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${langParam}&appid=${API_KEY}`);
    const data = await res.json();
    processWeatherData(data);
  } catch (err) { fetchWeather('Ташкент'); }
}

async function fetchWeather(city) {
  try {
    const langParam = currentLang === 'uz' ? 'en' : currentLang;
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=${langParam}&appid=${API_KEY}`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    processWeatherData(data);
  } catch (err) { console.error(err); }
}

async function processWeatherData(data) {
  currentWeatherData = data;
  const uv = await fetchUVIndex(data.coord.lat, data.coord.lon);
  
  updateCornerCityPhoto(data.name);
  updateStarButton(data.name);
  fetch5DayForecast(data.coord.lat, data.coord.lon);
  fetchCountryInfo(data.sys.country);

  const pressureMmHg = Math.round(data.main.pressure * 0.750063);

  updateUI({
    city: data.name,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    pressure: pressureMmHg,
    uv: uv,
    condition: data.weather[0].main.toLowerCase(),
    description: data.weather[0].description.toLowerCase(),
    productivity: calculateProductivity(pressureMmHg, data.main.humidity),
    sunCountdown: getSunCountdown(data.sys.sunrise, data.sys.sunset),
    moonPhase: getMoonPhase()
  });
}

function updateStaticTranslations() {
  const t = i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t && t[key]) el.textContent = t[key];
  });
  if (cityInput && t) cityInput.placeholder = t.searchPlaceholder;
}

function updateUI(w) {
  updateStaticTranslations();
  const t = i18n[currentLang];
  const desc = (t.conditions && t.conditions[w.description]) || (t.conditions && t.conditions[w.condition]) || w.description;

  document.getElementById('city-name').textContent = w.city;
  document.getElementById('bottom-city-name').textContent = w.city;
  document.getElementById('temp-value').textContent = formatTemp(w.temp);
  document.getElementById('feels-like').textContent = `${t.feelsLikeText} ${formatTemp(w.feelsLike)}`;
  document.getElementById('weather-desc').textContent = desc;
  document.getElementById('humidity').textContent = `${w.humidity}%`;
  document.getElementById('wind-speed').textContent = `${w.wind} ${t.windUnit}`;
  document.getElementById('pressure').textContent = `${w.pressure} ${t.pressureUnit}`;
  
  let uvStatus = "Низкий";
  if (w.uv >= 3 && w.uv <= 5) uvStatus = "Умеренный";
  else if (w.uv >= 6 && w.uv <= 7) uvStatus = "Высокий 🧴";
  else if (w.uv >= 8) uvStatus = "Опасный 🕶️";
  document.getElementById('uv-index').textContent = `${w.uv} (${uvStatus})`;

  document.getElementById('productivity-text').textContent = w.productivity;
  document.getElementById('moon-phase').textContent = w.moonPhase;
  document.getElementById('sun-countdown').textContent = w.sunCountdown;

  const clothesElem = document.getElementById('rec-clothes');
  if (clothesElem) {
    if (w.temp >= 25) clothesElem.textContent = t.clothes.hot;
    else if (w.temp >= 15) clothesElem.textContent = t.clothes.warm;
    else if (w.temp >= 5) clothesElem.textContent = t.clothes.cool;
    else clothesElem.textContent = t.clothes.cold;
  }

  const walkElem = document.getElementById('rec-walk');
  if (walkElem) {
    if (w.condition.includes('rain')) walkElem.textContent = t.walk.rain;
    else if (w.condition.includes('snow')) walkElem.textContent = t.walk.snow;
    else if (w.temp >= 22) walkElem.textContent = t.walk.good;
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
  const c = cityInput.value.trim();
  if (c) { autocompleteList.style.display = 'none'; fetchWeather(c); }
});

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const c = cityInput.value.trim();
    if (c) { autocompleteList.style.display = 'none'; fetchWeather(c); }
  }
});
