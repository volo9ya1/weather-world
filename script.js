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
    modalPcTitle: "ПК / TV BOX",
    modalPcDesc: "Широкоформатный дэшборд со всеми расширенными виджетами",
    modalPcBtn: "ПК РЕЖИМ",
    searchPlaceholder: "Введите город или регион...",
    humidityLabel: "Влажность", windLabel: "Ветер", pressureLabel: "Давление",
    uvLabel: "УФ-индекс", selectedCityLabel: "Активная локация:",
    recTitle: "💡 Умный анализ дня", clothesTitle: "Что надеть?", walkTitle: "Идти ли гулять?",
    windUnit: "м/с", pressureUnit: "мм рт.ст.",
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
    }
  },
  en: {
    modalTitle: "SELECT INTERFACE MODE:",
    modalMobileTitle: "SMARTPHONE / TABLET",
    modalMobileDesc: "Optimized vertical layout for touchscreens",
    modalMobileBtn: "TOUCH",
    modalPcTitle: "PC / TV BOX",
    modalPcDesc: "Widescreen dashboard with extended widgets",
    modalPcBtn: "PC MODE",
    searchPlaceholder: "Enter city or region...",
    humidityLabel: "Humidity", windLabel: "Wind", pressureLabel: "Pressure",
    uvLabel: "UV Index", selectedCityLabel: "Active Location:",
    recTitle: "💡 Smart Daily Analysis", clothesTitle: "What to wear?", walkTitle: "Go for a walk?",
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
      rain: "It's raining. Enjoy hot tea inside ☔",
      snow: "Great time for a walk in the park ❄️",
      extremeHot: "Too hot. Stay in the shade 🌅",
      good: "Great temperature for a walk or outdoor activity ☀️",
      normal: "Wonderful weather for fresh air! 🚶‍♂️"
    }
  },
  uz: {
    modalTitle: "INTERFEYS REJIMINI TANLANG:",
    modalMobileTitle: "SMARTFON / PLANSHET",
    modalMobileDesc: "Sensor ekranlar uchun moslashtirilgan interfeys",
    modalMobileBtn: "SENSOR",
    modalPcTitle: "PK / TV BOX",
    modalPcDesc: "Keng ekranli barcha vidjetlarga ega boshqaruv paneli",
    modalPcBtn: "PK REJIM",
    searchPlaceholder: "Shahar yoki hududni kiriting...",
    humidityLabel: "Namlik", windLabel: "Shamol", pressureLabel: "Bosim",
    uvLabel: "UV Indeksi", selectedCityLabel: "Faol joylashuv:",
    recTitle: "💡 Aqlli kun tahlili", clothesTitle: "Nima kiyish kerak?", walkTitle: "Sayrga chiqish kerakmi?",
    windUnit: "m/s", pressureUnit: "mm sim. ust.",
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
    }
  }
};

// Избранные города
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

// Конвертация температур
function formatTemp(tempC) {
  if (isCelsius) {
    return tempC > 0 ? `+${Math.round(tempC)}°C` : `${Math.round(tempC)}°C`;
  } else {
    const tempF = (tempC * 9/5) + 32;
    return `${Math.round(tempF)}°F`;
  }
}

// Переключатель единиц
document.getElementById('unit-toggle').addEventListener('click', () => {
  isCelsius = !isCelsius;
  localStorage.setItem('weather_app_unit', isCelsius);
  if (currentWeatherData) processWeatherData(currentWeatherData);
});

// Автокомплит поиска городов
const cityInput = document.getElementById('city-input');
const autocompleteList = document.getElementById('autocomplete-list');
let searchTimeout = null;

cityInput.addEventListener('input', (e) => {
  const val = e.target.value.trim();
  clearTimeout(searchTimeout);
  if (!val || val.length < 2) {
    autocompleteList.style.display = 'none';
    return;
  }
  searchTimeout = setTimeout(async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(val)}&limit=5&appid=${API_KEY}`);
      const cities = await res.json();
      autocompleteList.innerHTML = '';
      if (cities.length === 0) {
        autocompleteList.style.display = 'none';
        return;
      }
      cities.forEach(item => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        const st = item.state ? `, ${item.state}` : '';
        div.textContent = `${item.name}${st} (${item.country})`;
        div.onclick = () => {
          cityInput.value = item.name;
          autocompleteList.style.display = 'none';
          fetchWeatherByCoords(item.lat, item.lon);
        };
        autocompleteList.appendChild(div);
      });
      autocompleteList.style.display = 'block';
    } catch (err) { console.error(err); }
  }, 300);
});

document.addEventListener('click', (e) => {
  if (e.target !== cityInput && e.target !== autocompleteList) {
    autocompleteList.style.display = 'none';
  }
});

// Режимы экрана
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

// REST COUNTRIES API (Валюта и Язык)
async function fetchCountryInfo(countryCode) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    const data = await res.json();
    const country = data[0];
    const currencies = country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'Неизвестно';
    const languages = country.languages ? Object.values(country.languages).join(', ') : 'Неизвестно';
    document.getElementById('country-currency').textContent = currencies;
    document.getElementById('country-language').textContent = languages;
  } catch (err) {
    document.getElementById('country-currency').textContent = 'Нет данных';
    document.getElementById('country-language').textContent = 'Нет данных';
  }
}

// Индекс продуктивности
function calculateProductivity(pressureMmHg, humidity) {
  if (pressureMmHg < 740) return "⚠️ Низкое давление: Возможна сонливость, пейте больше чистой воды.";
  if (humidity > 85) return "💧 Высокая влажность: Воздух тяжеловатый, чаще проветривайте помещение.";
  if (pressureMmHg > 775) return "🧊 Высокое давление: Возможна быстрая утомляемость.";
  return "⚡ Отличные атмосферные условия для максимальной продуктивности!";
}

// Обратный отсчет до заката/рассвета
function getSunCountdown(sunrise, sunset) {
  const now = Math.floor(Date.now() / 1000);
  let target, name;
  if (now < sunrise) {
    target = sunrise; name = "рассвета";
  } else if (now < sunset) {
    target = sunset; name = "заката";
  } else {
    target = sunrise + 86400; name = "рассвета";
  }
  const diff = target - now;
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  return `До ${name}: ${h}ч. ${m}мин.`;
}

// Фаза луны (простой расчет)
function getMoonPhase() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let c = 0, e = 0, jd = 0, b = 0;
  if (month < 3) { year--; month += 12; }
  ++month;
  c = 365.25 * year;
  e = 30.6 * month;
  jd = c + e + day - 694039.0;
  jd /= 29.53058867;
  b = parseInt(jd);
  jd -= b;
  const phase = Math.round(jd * 8);
  const phases = ["🌑 Новолуние", "🌒 Молодая луна", "🌓 Первая четверть", "🌔 Растущая луна", "🌕 Полнолуние", "🌖 Убывающая луна", "🌗 Последняя четверть", "🌘 Старая луна"];
  return phases[phase % 8];
}

// График температур (Chart.js)
function renderTemperatureChart(forecastList) {
  const ctx = document.getElementById('tempChart').getContext('2d');
  const labels = forecastList.slice(0, 8).map(item => item.dt_txt.slice(11, 16));
  const temps = forecastList.slice(0, 8).map(item => isCelsius ? item.main.temp : (item.main.temp * 9/5) + 32);

  if (tempChartInstance) tempChartInstance.destroy();

  tempChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: isCelsius ? 'Температура (°C)' : 'Температура (°F)',
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

// 5-дневный прогноз
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

// УФ-индекс
async function fetchUVIndex(lat, lon) {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=uv_index`);
    const data = await res.json();
    return Math.round(data.current.uv_index || 0);
  } catch (err) { return 0; }
}

// Уголок фото города
function updateCornerCityPhoto(cityName) {
  const elem = document.getElementById('city-photo-corner');
  if (!elem) return;
  const url = `https://loremflickr.com/600/400/${encodeURIComponent(cityName)},city/all`;
  const img = new Image();
  img.src = url;
  img.onload = () => { elem.style.backgroundImage = `url('${url}')`; };
  img.onerror = () => { elem.style.backgroundImage = 'none'; };
}

// Получение локации пользователя
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
  document.getElementById('feels-like').textContent = `Ощущается как ${formatTemp(w.feelsLike)}`;
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

// Смена языка
document.getElementById('lang-select').value = currentLang;
document.getElementById('lang-select').addEventListener('change', (e) => {
  currentLang = e.target.value;
  localStorage.setItem('weather_app_lang', currentLang);
  if (currentWeatherData) processWeatherData(currentWeatherData);
  else getUserLocation();
});

// Кнопка поиска
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
