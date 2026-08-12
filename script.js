// Основной скрипт для Weather by Kirill

const API_KEY = 'a768be6a11bebe3aa2e0be24666a1c02'; // Используй свой ключ OpenWeatherMap или аналогичный
let currentUnit = 'metric';
let currentLang = 'ru';
let selectedCityName = 'Tashkent';

// Переводы интерфейса (i18n)
const translations = {
  ru: {
    modalTitle: 'ВЫБЕРИТЕ РЕЖИМ ИНТЕРФЕЙСА:',
    modalMobileTitle: 'СМАРТФОН / ПЛАНШЕТ',
    modalMobileDesc: 'Оптимизированный вертикальный интерфейс для сенсорных экранов',
    modalMobileBtn: 'СЕНСОРНЫЙ',
    modalPcTitle: 'ПК',
    modalPcDesc: 'Широкоформатный дэшборд со всеми расширенными виджетами',
    modalPcBtn: 'ПК РЕЖИМ',
    humidityLabel: 'Влажность',
    windLabel: 'Ветер',
    pressureLabel: 'Давление',
    uvLabel: 'УФ-индекс',
    currencyTitle: '💳 Валюта:',
    langTitle: '🗣️ Язык:',
    selectedCityLabel: 'Активная локация:',
    recTitle: '💡 Умный анализ дня',
    prodTitle: '🧠 Индекс продуктивности',
    clothesTitle: 'Что надеть?',
    walkTitle: 'Идти ли гулять?',
    moonTitle: '🌙 Фаза луны',
    sunCountdownTitle: '⏳ До заката/рассвета',
    chartTitle: '📈 Температурный тренд (24ч)',
    forecastTitle: '📅 Прогноз на 5 дней'
  },
  en: {
    modalTitle: 'SELECT INTERFACE MODE:',
    modalMobileTitle: 'SMARTPHONE / TABLET',
    modalMobileDesc: 'Optimized vertical interface for touchscreens',
    modalMobileBtn: 'TOUCH',
    modalPcTitle: 'PC',
    modalPcDesc: 'Widescreen dashboard with all advanced widgets',
    modalPcBtn: 'PC MODE',
    humidityLabel: 'Humidity',
    windLabel: 'Wind',
    pressureLabel: 'Pressure',
    uvLabel: 'UV Index',
    currencyTitle: '💳 Currency:',
    langTitle: '🗣️ Language:',
    selectedCityLabel: 'Active Location:',
    recTitle: '💡 Smart Day Analysis',
    prodTitle: '🧠 Productivity Index',
    clothesTitle: 'What to wear?',
    walkTitle: 'Should you go for a walk?',
    moonTitle: '🌙 Moon Phase',
    sunCountdownTitle: '⏳ To Sunset/Sunrise',
    chartTitle: '📈 Temperature Trend (24h)',
    forecastTitle: '📅 5-Day Forecast'
  },
  uz: {
    modalTitle: 'INTERFEYS REJIMINI TANLANG:',
    modalMobileTitle: 'SMARTFON / PLANSHET',
    modalMobileDesc: 'Sensorli ekranlar uchun optimallashtirilgan vertikal interfeys',
    modalMobileBtn: 'SENSOR',
    modalPcTitle: 'PK',
    modalPcDesc: 'Barcha kengaytirilgan vidjetlarga ega keng formatli boshqaruv paneli',
    modalPcBtn: 'PK REJIMI',
    humidityLabel: 'Namlik',
    windLabel: ' Shamol',
    pressureLabel: 'Bosim',
    uvLabel: 'UV indeks',
    currencyTitle: '💳 Valyuta:',
    langTitle: '🗣️ Til:',
    selectedCityLabel: 'Faol manzil:',
    recTitle: '💡 Kunlik aqlli tahlil',
    prodTitle: '🧠 Mahsuldorlik indeksi',
    clothesTitle: 'Nima kiyish kerak?',
    walkTitle: 'Sayrga chiqish kerakmi?',
    moonTitle: '🌙 Oy fazasi',
    sunCountdownTitle: '⏳ Quyosh botishi/chiqishigacha',
    chartTitle: '📈 Harorat trendi (24 soat)',
    forecastTitle: '📅 5 kunlik prognoz'
  }
};

// Выбор режима интерфейса (Мобильный / ПК)
function selectMode(mode) {
  const container = document.getElementById('app-container');
  const modal = document.getElementById('mode-modal');
  
  if (mode === 'mobile') {
    container.classList.remove('mode-pc');
    container.classList.add('mode-mobile');
  } else {
    container.classList.remove('mode-mobile');
    container.classList.add('mode-pc');
  }
  
  modal.style.display = 'none';
  localStorage.setItem('weather_mode', mode);
}

// Переключение языка
document.getElementById('lang-select').addEventListener('change', (e) => {
  currentLang = e.target.value;
  updateLanguageTexts();
  fetchWeatherData(selectedCityName);
});

function updateLanguageTexts() {
  const t = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });
}

// Переключение единиц измерения (°C / °F)
document.getElementById('unit-toggle').addEventListener('click', () => {
  currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
  fetchWeatherData(selectedCityName);
});

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('weather_mode');
  if (savedMode) {
    selectMode(savedMode);
  }
  
  // Загрузка погоды для города по умолчанию
  fetchWeatherData(selectedCityName);
});

// Заглушка функции получения данных погоды (интеграция с API)
async function fetchWeatherData(city) {
  selectedCityName = city;
  
  // Здесь происходит запрос к погодному API (например, OpenWeatherMap)
  // Для демонстрации заполняем базовые поля заглушками
  document.getElementById('city-name').textContent = city;
  document.getElementById('bottom-city-name').textContent = city;
  document.getElementById('weather-desc').textContent = currentLang === 'ru' ? 'Ясно' : 'Clear';
  document.getElementById('temp-value').textContent = currentUnit === 'metric' ? '22°C' : '72°F';
  document.getElementById('feels-like').textContent = (currentLang === 'ru' ? 'Ощущается как ' : 'Feels like ') + (currentUnit === 'metric' ? '24°C' : '75°F');
  
  document.getElementById('humidity').textContent = '45%';
  document.getElementById('wind-speed').textContent = currentUnit === 'metric' ? '3.5 м/с' : '8 mph';
  document.getElementById('pressure').textContent = '1013 гПа';
  document.getElementById('uv-index').textContent = '4 (Умеренный)';
  
  document.getElementById('country-currency').textContent = 'USD ($)';
  document.getElementById('country-language').textContent = 'Uzbek, Russian';
  
  document.getElementById('productivity-text').textContent = currentLang === 'ru' ? 'Отличные условия для работы и учебы!' : 'Great conditions for work and study!';
  document.getElementById('rec-clothes').textContent = currentLang === 'ru' ? 'Легкая куртка или футболка будет в самый раз.' : 'A light jacket or t-shirt will be just fine.';
  document.getElementById('rec-walk').textContent = currentLang === 'ru' ? 'Идеальная погода для прогулки на свежем воздухе.' : 'Perfect weather for an outdoor walk.';
  
  document.getElementById('moon-phase').textContent = currentLang === 'ru' ? 'Растущая луна' : 'Waxing Crescent';
  document.getElementById('sun-countdown').textContent = '6 ч 20 мин';
  
  renderTemperatureChart();
  renderForecast();
}

// Рендер графика температур через Chart.js
let tempChartInstance = null;
function renderTemperatureChart() {
  const ctx = document.getElementById('tempChart').getContext('2d');
  
  if (tempChartInstance) {
    tempChartInstance.destroy();
  }
  
  tempChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
      datasets: [{
        label: 'Температура',
        data: [15, 14, 13, 18, 22, 24, 20, 17],
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });
}

// Генерация прогноза на 5 дней
function renderForecast() {
  const forecastGrid = document.getElementById('forecast-grid');
  forecastGrid.innerHTML = '';
  
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'];
  days.forEach((day, index) => {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
      <span>${day}</span>
      <strong>${20 + index}°</strong>
      <span style="font-size: 0.75rem; color: #94a3b8;">Солнечно</span>
    `;
    forecastGrid.appendChild(card);
  });
}
