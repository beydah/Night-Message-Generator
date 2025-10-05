// Global Variables for service configuration
const appId =
  typeof __app_id !== "undefined" ? __app_id : "default-message-generator-app";

const _0x4a2b = {
  _0x1a: [
    0x6b, 0x63, 0x7a, 0x61, 0x73, 0x79, 0x64, 0x61, 0x70, 0x6f, 0x19, 0x19,
    0x18, 0x78, 0x6a, 0x1b, 0x6e, 0x61, 0x6a, 0x70, 0x07, 0x1e, 0x17, 0x77,
    0x6b, 0x79, 0x78, 0x79, 0x07, 0x17, 0x1d, 0x77, 0x19, 0x73, 0x6e, 0x73,
    0x72, 0x6c, 0x75,
  ],
  _0x2b: 0x2a,
  _0x3c: function (arr, key) {
    return arr.map((x) => String.fromCharCode(x ^ key)).join("");
  },
};
const _authConfig = (() => {
  try {
    return _0x4a2b._0x3c(_0x4a2b._0x1a, _0x4a2b._0x2b);
  } catch (e) {
    return "";
  }
})();

// --- Utility Functions: Cookie Management (30 days persistence) ---
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function clearAllCookies() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    // Delete the cookie
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
}

// --- State Management ---
const COOKIE_NAME = "nightMessageSettings";

// Define language codes and display names
const LANG_CODES = ["tr", "az", "en", "de", "ru"];
const LANG_DISPLAY = { tr: "TR", az: "AZ", en: "EN", de: "DE", ru: "RU" };

// Translations for UI elements
const TRANSLATIONS = {
  tr: {
    title: "Gece Mesajı Üreticisi",
    settings: "Ayarlar",
    allLowercase: "Tüm Harfler Küçük",
    theme: "Tema",
    dark: "Koyu",
    light: "Açık",
    links: "Bağlantılar",
    contribute: "Katkı Yap (GitHub)",
    developer: "Geliştirici",
    resetSettings: "Ayarları Sıfırla (Çerezleri Temizle)",
    messageSettings: "Mesaj Ayarları (5 Seviye)",
    length: "Uzunluk (Kelime)",
    sincerity: "Samimiyet (Ton)",
    misspelling: "Kasıtlı Yanlış Yazım",
    emojiUsage: "Emoji Kullanımı (0-10)",
    punctuationIntensity: "Noktalama Yoğunluğu (0-10)",
    generateButton: "5 Gece Mesajı Üret",
    generatedMessages: "Üretilen Mesajlar",
    copyMessage: "Mesajı Kopyala",
    placeholderText:
      'Ayarlarınıza göre kişiselleştirilmiş gece mesajları oluşturmak için yukarıdaki "Üret" butonuna basın.',
    developedBy: "Geliştiren",
    formal: "Resmi",
    warm: "Sıcak",
    correct: "Doğru",
    maximum: "Maksimum",
    minimal: "Minimal",
    max: "Maks",
    words: "Kelime",
    sincerityLevels: {
      1: "Çok Resmi (1/10)",
      2: "Resmi (2/10)",
      3: "Saygılı (3/10)",
      4: "Nötr (4/10)",
      5: "Dostça (5/10)",
      6: "Sıcak (6/10)",
      7: "Samimi (7/10)",
      8: "Duygusal (8/10)",
      9: "Çok Samimi (9/10)",
      10: "Derin ve Yoğun (10/10)",
    },
    misspellingLevels: {
      1: "Hatasız (1/10)",
      2: "Çok Az (2/10)",
      3: "Az (3/10)",
      4: "Orta (4/10)",
      5: "Fark Edilebilir (5/10)",
      6: "Yüksek (6/10)",
      7: "Çok Yüksek (7/10)",
      8: "Aşırı (8/10)",
      9: "Yoğun Argo/Kısaltma (9/10)",
      10: "Maksimum (10/10)",
    },
  },
  az: {
    title: "Gecə Mesajı Generatoru",
    settings: "Ayarlar",
    allLowercase: "Bütün Hərflər Kiçik",
    theme: "Tema",
    dark: "Qaranlıq",
    light: "İşıqlı",
    links: "Bağlantılar",
    contribute: "Töhfə Ver (GitHub)",
    developer: "Developer",
    resetSettings: "Ayarları Sıfırla (Çerezləri Təmizlə)",
    messageSettings: "Mesaj Ayarları (5 Səviyyə)",
    length: "Uzunluq (Söz)",
    sincerity: "Səmimilik (Ton)",
    misspelling: "Qəsdən Səhv Yazı",
    emojiUsage: "Emoji İstifadəsi (0-10)",
    punctuationIntensity: "Durğu İşarələri Intensivliyi (0-10)",
    generateButton: "5 Gecə Mesajı Yarat",
    generatedMessages: "Yaradılmış Mesajlar",
    copyMessage: "Mesajı Kopyala",
    placeholderText:
      'Ayarlarınıza görə fərdiləşdirilmiş gecə mesajları yaratmaq üçün yuxarıdakı "Yarat" düyməsinə basın.',
    developedBy: "Developer",
    formal: "Rəsmi",
    warm: "İsti",
    correct: "Düzgün",
    maximum: "Maksimum",
    minimal: "Minimal",
    max: "Maks",
    words: "Söz",
    sincerityLevels: {
      1: "Çox Rəsmi (1/10)",
      2: "Rəsmi (2/10)",
      3: "Hörmətli (3/10)",
      4: "Neytral (4/10)",
      5: "Dostcasına (5/10)",
      6: "İsti (6/10)",
      7: "Səmimi (7/10)",
      8: "Emosional (8/10)",
      9: "Çox Səmimi (9/10)",
      10: "Dərin və Yoğun (10/10)",
    },
    misspellingLevels: {
      1: "Səhvsiz (1/10)",
      2: "Çox Az (2/10)",
      3: "Az (3/10)",
      4: "Orta (4/10)",
      5: "Fərq Edilən (5/10)",
      6: "Yüksək (6/10)",
      7: "Çox Yüksək (7/10)",
      8: "Həddindən Artıq (8/10)",
      9: "Yoğun Arqo/Qısaltma (9/10)",
      10: "Maksimum (10/10)",
    },
  },
  en: {
    title: "Night Message Generator",
    settings: "Settings",
    allLowercase: "All Lowercase",
    theme: "Theme",
    dark: "Dark",
    light: "Light",
    links: "Links",
    contribute: "Contribute (GitHub)",
    developer: "Developer",
    resetSettings: "Reset Settings (Clear Cookies)",
    messageSettings: "Message Settings (5 Levels)",
    length: "Length (Words)",
    sincerity: "Sincerity (Tone)",
    misspelling: "Intentional Misspelling",
    emojiUsage: "Emoji Usage (0-10)",
    punctuationIntensity: "Punctuation Intensity (0-10)",
    generateButton: "Generate 5 Night Messages",
    generatedMessages: "Generated Messages",
    copyMessage: "Copy Message",
    placeholderText:
      'Hit the "Generate" button above to create personalized night messages based on your settings.',
    developedBy: "Developed by",
    formal: "Formal",
    warm: "Warm",
    correct: "Correct",
    maximum: "Maximum",
    minimal: "Minimal",
    max: "Max",
    words: "Words",
    sincerityLevels: {
      1: "Very Formal (1/10)",
      2: "Formal (2/10)",
      3: "Respectful (3/10)",
      4: "Neutral (4/10)",
      5: "Friendly (5/10)",
      6: "Warm (6/10)",
      7: "Intimate (7/10)",
      8: "Emotional (8/10)",
      9: "Very Intimate (9/10)",
      10: "Deep & Intense (10/10)",
    },
    misspellingLevels: {
      1: "Perfect (1/10)",
      2: "Very Little (2/10)",
      3: "Little (3/10)",
      4: "Medium (4/10)",
      5: "Noticeable (5/10)",
      6: "High (6/10)",
      7: "Very High (7/10)",
      8: "Excessive (8/10)",
      9: "Heavy Slang/Abbrev (9/10)",
      10: "Maximum (10/10)",
    },
  },
  de: {
    title: "Gute-Nacht-Nachrichten Generator",
    settings: "Einstellungen",
    allLowercase: "Alles Kleinbuchstaben",
    theme: "Design",
    dark: "Dunkel",
    light: "Hell",
    links: "Links",
    contribute: "Beitragen (GitHub)",
    developer: "Entwickler",
    resetSettings: "Einstellungen Zurücksetzen (Cookies Löschen)",
    messageSettings: "Nachrichten Einstellungen (5 Stufen)",
    length: "Länge (Wörter)",
    sincerity: "Aufrichtigkeit (Ton)",
    misspelling: "Absichtliche Rechtschreibfehler",
    emojiUsage: "Emoji Verwendung (0-10)",
    punctuationIntensity: "Satzzeichen Intensität (0-10)",
    generateButton: "5 Gute-Nacht-Nachrichten Generieren",
    generatedMessages: "Generierte Nachrichten",
    copyMessage: "Nachricht Kopieren",
    placeholderText:
      'Klicken Sie auf die "Generieren" Schaltfläche oben, um personalisierte Gute-Nacht-Nachrichten basierend auf Ihren Einstellungen zu erstellen.',
    developedBy: "Entwickelt von",
    formal: "Formal",
    warm: "Warm",
    correct: "Korrekt",
    maximum: "Maximum",
    minimal: "Minimal",
    max: "Max",
    words: "Wörter",
    sincerityLevels: {
      1: "Sehr Formal (1/10)",
      2: "Formal (2/10)",
      3: "Respektvoll (3/10)",
      4: "Neutral (4/10)",
      5: "Freundlich (5/10)",
      6: "Warm (6/10)",
      7: "Vertraut (7/10)",
      8: "Emotional (8/10)",
      9: "Sehr Vertraut (9/10)",
      10: "Tief & Intensiv (10/10)",
    },
    misspellingLevels: {
      1: "Perfekt (1/10)",
      2: "Sehr Wenig (2/10)",
      3: "Wenig (3/10)",
      4: "Mittel (4/10)",
      5: "Merklich (5/10)",
      6: "Hoch (6/10)",
      7: "Sehr Hoch (7/10)",
      8: "Übermäßig (8/10)",
      9: "Starker Slang/Abk (9/10)",
      10: "Maximum (10/10)",
    },
  },
  ru: {
    title: "Генератор Ночных Сообщений",
    settings: "Настройки",
    allLowercase: "Все Строчные",
    theme: "Тема",
    dark: "Тёмная",
    light: "Светлая",
    links: "Ссылки",
    contribute: "Внести Вклад (GitHub)",
    developer: "Разработчик",
    resetSettings: "Сбросить Настройки (Очистить Куки)",
    messageSettings: "Настройки Сообщений (5 Уровней)",
    length: "Длина (Слова)",
    sincerity: "Искренность (Тон)",
    misspelling: "Намеренные Ошибки",
    emojiUsage: "Использование Эмодзи (0-10)",
    punctuationIntensity: "Интенсивность Пунктуации (0-10)",
    generateButton: "Создать 5 Ночных Сообщений",
    generatedMessages: "Созданные Сообщения",
    copyMessage: "Копировать Сообщение",
    placeholderText:
      'Нажмите кнопку "Создать" выше, чтобы создать персонализированные ночные сообщения на основе ваших настроек.',
    developedBy: "Разработано",
    formal: "Формальный",
    warm: "Тёплый",
    correct: "Правильно",
    maximum: "Максимум",
    minimal: "Минимальный",
    max: "Макс",
    words: "Слова",
    sincerityLevels: {
      1: "Очень Формальный (1/10)",
      2: "Формальный (2/10)",
      3: "Уважительный (3/10)",
      4: "Нейтральный (4/10)",
      5: "Дружелюбный (5/10)",
      6: "Тёплый (6/10)",
      7: "Интимный (7/10)",
      8: "Эмоциональный (8/10)",
      9: "Очень Интимный (9/10)",
      10: "Глубокий и Интенсивный (10/10)",
    },
    misspellingLevels: {
      1: "Идеальный (1/10)",
      2: "Очень Мало (2/10)",
      3: "Мало (3/10)",
      4: "Средне (4/10)",
      5: "Заметно (5/10)",
      6: "Высоко (6/10)",
      7: "Очень Высоко (7/10)",
      8: "Чрезмерно (8/10)",
      9: "Сильный Сленг/Сокр (9/10)",
      10: "Максимум (10/10)",
    },
  },
};

const DEFAULT_SETTINGS = {
  // Menu Settings
  theme: "dark", // Updated default
  language: "tr", // Default to Turkish
  languageIndex: 0, // Index in LANG_CODES
  lowercase: true, // Updated default
  // Message Settings
  length: 10, // Range 1-10 (maps to 5-50 words) - Updated default to 50 words
  sincerity: 10, // Range 1-10 (maps to Formal to Deeply Sincere) - Default to max
  misspelling: 5, // Range 1-10 (maps to Correct to Max) - Default to middle
  emoji: 5, // Range 0-10 - Updated default
  punctuation: 0, // Range 0-10
  // Message Content
  messages: [],
  currentIndex: 0,
};

let appState = { ...DEFAULT_SETTINGS };
let isLoading = false;

// --- UI Elements ---
const sideMenu = document.getElementById("side-menu");
const overlayMenu = document.getElementById("overlay-menu");
const themeToggle = document.getElementById("theme-toggle");
const langToggle = document.getElementById("lang-toggle");
const lowercaseToggle = document.getElementById("lowercase-toggle");
const settingsToggle = document.getElementById("settings-toggle");
const settingsContent = document.getElementById("settings-content");
const generateButton = document.getElementById("generate-button");
const cardCarousel = document.getElementById("card-carousel");
const currentCardIndexEl = document.getElementById("current-card-index");
const totalCardsEl = document.getElementById("total-cards");
const statusMessageEl = document.getElementById("status-message");
const navPrevButton = document.getElementById("nav-prev");
const navNextButton = document.getElementById("nav-next");
const messagePlaceholder = document.getElementById("message-placeholder");
const lowercaseToggleBg = document.getElementById("lowercase-toggle-bg");

// --- Helper Mappings (Updated for 1-10 Range) ---
// Dynamic label functions that use current language
function getSincerityLabels() {
  return getTranslations().sincerityLevels;
}

function getMisspellingLabels() {
  return getTranslations().misspellingLevels;
}

// --- Core Functions: UI & State Sync ---

// Color interpolation function (Amber to Rose/Pink)
function updatePrimaryColor() {
  const minSincerity = 1;
  const maxSincerity = 10;
  const currentSincerity = appState.sincerity;

  // Amber (A) RGB: 245, 158, 11 (approx Amber-500)
  const R_A = 245,
    G_A = 158,
    B_A = 11;
  // Rose (R) RGB: 244, 63, 94 (approx Rose-500)
  const R_R = 244,
    G_R = 63,
    B_R = 94;

  // Interpolation factor (0 to 1)
  const t = (currentSincerity - minSincerity) / (maxSincerity - minSincerity);

  // Linear interpolation function: V = V_A + t * (V_R - V_A)
  const R = Math.round(R_A + t * (R_R - R_A));
  const G = Math.round(G_A + t * (G_R - G_A));
  const B = Math.round(B_A + t * (B_R - B_A));

  const newColor = `rgb(${R}, ${G}, ${B})`;

  // Set primary color variable for global use (buttons, ranges, text colors)
  document.documentElement.style.setProperty("--primary-color", newColor);

  // Set shadow color variable (used for the gradient logo text and button shadow)
  const shadowR = Math.round(R + t * 10);
  const shadowG = Math.round(G + t * 10);
  const shadowB = Math.round(B + t * 10);
  const shadowColor = `rgb(${shadowR}, ${shadowG}, ${shadowB})`;
  document.documentElement.style.setProperty("--shadow-color", shadowColor);

  // Update custom switch background color (since it can't use dynamic CSS var easily)
  lowercaseToggleBg.style.backgroundColor = newColor;
}

function saveSettings() {
  try {
    const settingsToSave = {
      theme: appState.theme,
      language: appState.language,
      languageIndex: appState.languageIndex,
      lowercase: appState.lowercase,
      length: appState.length,
      sincerity: appState.sincerity,
      misspelling: appState.misspelling,
      emoji: appState.emoji,
      punctuation: appState.punctuation,
      messages: appState.messages,
      currentIndex: appState.currentIndex,
    };
    setCookie(COOKIE_NAME, JSON.stringify(settingsToSave), 30); // 30 days
  } catch (error) {
    console.error("Failed to save settings to cookie:", error);
  }
}

function loadSettings() {
  const cookieData = getCookie(COOKIE_NAME);
  if (cookieData) {
    try {
      const savedSettings = JSON.parse(cookieData);
      appState = { ...DEFAULT_SETTINGS, ...savedSettings };

      // Ensure language index is valid after loading
      const foundIndex = LANG_CODES.indexOf(appState.language);
      if (foundIndex === -1) {
        appState.language = DEFAULT_SETTINGS.language;
        appState.languageIndex = DEFAULT_SETTINGS.languageIndex;
      } else {
        appState.languageIndex = foundIndex;
      }
    } catch (error) {
      console.error("Failed to parse cookie data, using defaults:", error);
      appState = { ...DEFAULT_SETTINGS };
    }
  } else {
    appState = { ...DEFAULT_SETTINGS };
  }
}

// Function to get current translations
function getTranslations() {
  return TRANSLATIONS[appState.language];
}

// Function to update all translatable UI elements
function updateTranslations() {
  const t = getTranslations();

  // Update title
  document.querySelector("h1").textContent = t.title;

  // Update settings menu
  const settingsHeader = document.querySelector("#side-menu h2");
  if (settingsHeader) settingsHeader.textContent = t.settings;

  // Update menu items using specific IDs
  const lowercaseLabel = document.getElementById("lowercase-label");
  if (lowercaseLabel) lowercaseLabel.textContent = t.allLowercase;

  const themeLabel = document.getElementById("theme-label");
  if (themeLabel) themeLabel.textContent = t.theme;

  // Update links section
  const linksHeader = document.querySelector("#side-menu h3");
  if (linksHeader) linksHeader.textContent = t.links;

  // Update contribute and developer links
  const contributeLink = document.querySelector('a[href*="github"]');
  if (contributeLink)
    contributeLink.innerHTML = `<i data-lucide="github" class="w-4 h-4"></i> ${t.contribute}`;

  const developerLink = document.querySelector('a[href*="beydahsaglam"]');
  if (developerLink)
    developerLink.innerHTML = `<i data-lucide="code" class="w-4 h-4"></i> ${t.developer}`;

  // Update reset button
  const resetButton = document.querySelector(
    'button[onclick*="clearAllCookies"]'
  );
  if (resetButton) resetButton.textContent = t.resetSettings;

  // Update main content
  const mainSettingsHeader = document.querySelector("#settings-toggle h2");
  if (mainSettingsHeader) mainSettingsHeader.textContent = t.messageSettings;

  // Update labels
  const lengthLabel = document.getElementById("label-length");
  if (lengthLabel) lengthLabel.textContent = t.length;

  const sincerityLabel = document.getElementById("label-sincerity");
  if (sincerityLabel) sincerityLabel.textContent = t.sincerity;

  const misspellingLabel = document.getElementById("label-misspelling");
  if (misspellingLabel) misspellingLabel.textContent = t.misspelling;

  const emojiLabel = document.getElementById("label-emoji");
  if (emojiLabel) emojiLabel.textContent = t.emojiUsage;

  const punctuationLabel = document.getElementById("label-punctuation");
  if (punctuationLabel) punctuationLabel.textContent = t.punctuationIntensity;

  // Update generate button
  const generateBtn = document.getElementById("generate-button");
  if (generateBtn && !generateBtn.disabled) {
    generateBtn.innerHTML = `<i data-lucide="sparkles" class="w-5 h-5"></i> ${t.generateButton}`;
  }

  // Update card header
  const cardHeader = document.getElementById("card-header");
  if (cardHeader) {
    const currentIndex =
      document.getElementById("current-card-index").textContent;
    const totalCards = document.getElementById("total-cards").textContent;
    cardHeader.innerHTML = `${t.generatedMessages} (<span id="current-card-index">${currentIndex}</span>/<span id="total-cards">${totalCards}</span>)`;
  }

  // Update placeholder text
  const placeholderText = document.querySelector("#message-placeholder p");
  if (placeholderText) placeholderText.textContent = t.placeholderText;

  // Footer remains fixed - no translation
  const footerText = document.querySelector("footer p");
  if (footerText) {
    footerText.innerHTML = `Developed by <a href="https://beydahsaglam.com" target="_blank" class="hover:underline font-medium transition-colors duration-200" style="color: var(--primary-color)">Beydah Saglam</a> for Beyza ❤️`;
  }

  // Update range labels
  const lengthRangeLabels = document.querySelectorAll(
    "#length-range + div span"
  );
  if (lengthRangeLabels.length >= 2) {
    lengthRangeLabels[0].textContent = `5 ${t.words}`;
    lengthRangeLabels[1].textContent = `50 ${t.words}`;
  }

  const sincerityRangeLabels = document.querySelectorAll(
    "#sincerity-range + div span"
  );
  if (sincerityRangeLabels.length >= 2) {
    sincerityRangeLabels[0].textContent = `${t.formal} (1/10)`;
    sincerityRangeLabels[1].textContent = `${t.warm} (10/10)`;
  }

  const misspellingRangeLabels = document.querySelectorAll(
    "#misspelling-range + div span"
  );
  if (misspellingRangeLabels.length >= 2) {
    misspellingRangeLabels[0].textContent = `${t.correct} (1/10)`;
    misspellingRangeLabels[1].textContent = `${t.maximum} (10/10)`;
  }

  const punctuationRangeLabels = document.querySelectorAll(
    "#punctuation-range + div span"
  );
  if (punctuationRangeLabels.length >= 2) {
    punctuationRangeLabels[0].textContent = `0 (${t.minimal})`;
    punctuationRangeLabels[1].textContent = `10 (${t.max})`;
  }
}

function updateUI() {
  // 0. Update dynamic color based on Sincerity
  updatePrimaryColor();

  // 1. Apply Theme
  document.documentElement.classList.toggle("dark", appState.theme === "dark");
  const t = getTranslations();
  themeToggle.innerHTML =
    appState.theme === "dark"
      ? `<i data-lucide="moon" class="w-4 h-4"></i> ${t.dark}`
      : `<i data-lucide="sun" class="w-4 h-4"></i> ${t.light}`;

  // 2. Apply Language (Update button text)
  langToggle.textContent = LANG_DISPLAY[appState.language];

  // 3. Apply Lowercase Toggle
  lowercaseToggle.checked = appState.lowercase;

  // 4. Sync Range Inputs and Labels
  const rangeInputs = [
    "length",
    "sincerity",
    "misspelling",
    "emoji",
    "punctuation",
  ];
  rangeInputs.forEach((key) => {
    const rangeEl = document.getElementById(`${key}-range`);
    const valueEl = document.getElementById(`value-${key}`);

    if (rangeEl) rangeEl.value = appState[key];

    if (key === "length") {
      // Length maps 1-10 range to 5-50 words (5, 10, 15, 20, 25, 30, 35, 40, 45, 50)
      const actualLength = 5 * appState.length;
      const t = TRANSLATIONS[appState.language];
      valueEl.textContent = actualLength + " " + t.words;
    } else if (key === "sincerity") {
      valueEl.textContent = getSincerityLabels()[appState.sincerity];
    } else if (key === "misspelling") {
      valueEl.textContent = getMisspellingLabels()[appState.misspelling];
    } else if (key === "emoji" || key === "punctuation") {
      valueEl.textContent = appState[key];
    }
  });

  // 5. Update all translations
  updateTranslations();

  // 6. Render Messages and Carousel
  renderMessages();

  // 7. Update Lucide Icons (needed after DOM manipulation)
  lucide.createIcons();

  // Save state to cookie
  saveSettings();
}

// Settings update triggered by range input
function updateSetting(key, value) {
  appState[key] = parseInt(value);
  updateUI(); // Calls saveSettings and updatePrimaryColor internally
}

// --- Menu Toggles ---

function toggleMenu() {
  const isClosed = sideMenu.classList.contains("translate-x-full");
  sideMenu.classList.toggle("translate-x-full", !isClosed);
  overlayMenu.classList.toggle("hidden", !isClosed);
}

function toggleTheme() {
  appState.theme = appState.theme === "light" ? "dark" : "light";
  updateUI();
}

function toggleLanguage() {
  // Cycle through the language codes
  appState.languageIndex = (appState.languageIndex + 1) % LANG_CODES.length;
  appState.language = LANG_CODES[appState.languageIndex];
  updateUI();
}

function toggleLowercase() {
  appState.lowercase = lowercaseToggle.checked;
  updateUI();
}

// --- Message Rendering & Carousel ---

function renderMessages() {
  const messages = appState.messages;

  // 1. Always clear the carousel (it should only contain message cards)
  cardCarousel.innerHTML = "";

  totalCardsEl.textContent = messages.length;

  // 2. Toggle visibility of placeholder and carousel
  if (messages.length === 0) {
    // Show the placeholder and hide the carousel
    messagePlaceholder.classList.remove("hidden");
    cardCarousel.classList.add("hidden");
    currentCardIndexEl.textContent = 0;
  } else {
    // Hide placeholder and show carousel
    messagePlaceholder.classList.add("hidden");
    cardCarousel.classList.remove("hidden");
    currentCardIndexEl.textContent = appState.currentIndex + 1;
  }

  // 3. Toggle visibility of the navigation buttons
  const showNav = messages.length > 1;
  navPrevButton.style.opacity = showNav ? "1" : "0";
  navNextButton.style.opacity = showNav ? "1" : "0";
  navPrevButton.disabled = !showNav;
  navNextButton.disabled = !showNav;

  if (messages.length === 0) {
    return;
  }

  messages.forEach((text, index) => {
    const cardWrapper = document.createElement("div");
    cardWrapper.className = "card-wrapper";
    cardWrapper.id = `msg-card-${index}`;
    const t = getTranslations();
    cardWrapper.innerHTML = `
                <div class="bg-card-bg h-96 p-6 rounded-2xl shadow-xl flex flex-col transition-colors duration-300 border border-gray-100 dark:border-gray-800">
                    <!-- Message Content -->
                    <div class="flex-grow overflow-y-auto text-lg leading-relaxed text-primary-text mb-4 p-2 custom-scrollbar">
                        ${text.replace(/\n/g, "<br>")}
                    </div>
                    <!-- Copy Button -->
                    <button onclick="copyMessage(${index})" class="w-full py-2 bg-gray-100 dark:bg-gray-700 text-secondary-text rounded-xl hover:text-white transition-all duration-300 font-medium flex items-center justify-center gap-2"
                        style="background-color: var(--primary-color)15; border: 1px solid var(--primary-color); color: var(--primary-color);">
                        <i data-lucide="copy" class="w-5 h-5"></i>
                        ${t.copyMessage}
                    </button>
                </div>
            `;
    cardCarousel.appendChild(cardWrapper);
  });

  // Scroll to the current card
  scrollToCard(appState.currentIndex, false);
}

function scrollToCard(index, animate = true) {
  const card = document.getElementById(`msg-card-${index}`);
  if (card) {
    cardCarousel.scrollTo({
      left: card.offsetLeft - cardCarousel.scrollLeft + cardCarousel.scrollLeft,
      behavior: animate ? "smooth" : "auto",
    });
    appState.currentIndex = index;
    currentCardIndexEl.textContent = index + 1;
    saveSettings();
  }
}

function navigateCarousel(direction) {
  if (appState.messages.length === 0) return;

  let newIndex = appState.currentIndex + direction;

  // Implement the looping logic
  if (newIndex >= appState.messages.length) {
    newIndex = 0; // Loop to start
  } else if (newIndex < 0) {
    newIndex = appState.messages.length - 1; // Loop to end
  }

  scrollToCard(newIndex, true);
}

function copyMessage(index) {
  const text = appState.messages[index];
  if (!text) {
    showStatusMessage("Error: Message not found.", "error");
    return;
  }

  try {
    // Use execCommand('copy') for better iframe compatibility
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    tempTextArea.style.position = "fixed";
    tempTextArea.style.left = "-9999px";
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);

    showStatusMessage("Message copied to clipboard!", "success");
  } catch (err) {
    console.error("Copy failed:", err);
    showStatusMessage("Failed to copy message.", "error");
  }
}

function showStatusMessage(message, type) {
  statusMessageEl.textContent = message;
  statusMessageEl.className =
    "fixed top-20 left-1/2 -translate-x-1/2 p-3 rounded-xl shadow-lg font-medium text-sm z-50 transition-all duration-300 ease-in-out";

  if (type === "success") {
    statusMessageEl.classList.add(
      "bg-green-100",
      "text-green-800",
      "dark:bg-green-900",
      "dark:text-green-200"
    );
  } else if (type === "error") {
    statusMessageEl.classList.add(
      "bg-red-100",
      "text-red-800",
      "dark:bg-red-900",
      "dark:text-red-200"
    );
  } else {
    statusMessageEl.classList.add(
      "bg-blue-100",
      "text-blue-800",
      "dark:bg-blue-900",
      "dark:text-blue-200"
    );
  }

  statusMessageEl.classList.remove("hidden");
  setTimeout(() => {
    statusMessageEl.classList.add("hidden");
  }, 3000);
}

// --- External Service Integration ---

function getPromptDetails() {
  const {
    length,
    sincerity,
    misspelling,
    emoji,
    punctuation,
    language,
    lowercase,
  } = appState;

  // 1. Length (5-50 words, maps 1-10: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50)
  const wordCount = 5 * length;

  // 2. Sincerity (Formal to Warm, maps 1-10)
  const sincerityMap = getSincerityLabels(); // Use the 1-10 mapping

  // 3. Misspelling (Correct to Very Incorrect, maps 1-10)
  const misspellingMap = getMisspellingLabels(); // Use the 1-10 mapping

  // 4. Emoji (0-10)
  const emojiCount = emoji;

  // 5. Punctuation (0-10)
  const punctuationIntensity = punctuation;

  // Map language code to full name for the prompt
  const languageName = {
    tr: "Turkish",
    az: "Azerbaijani",
    en: "English",
    de: "German",
    ru: "Russian",
  }[language];

  const systemInstruction = `You are a creative text generator specializing in "night messages."
            Your response must be a single JSON array containing exactly 5 messages.
            The JSON must only contain the array of strings, like this: ["message 1", "message 2", "message 3", "message 4", "message 5"].`;

  let userQuery = `Generate 5 distinct "night messages" or "good night messages" for a loved one. 
            Each message must be around ${wordCount} words long.
            Use a tone that is described as: ${sincerityMap[sincerity]}.
            The text should exhibit intentional misspellings and slang usage at a level that is described as: ${
              misspellingMap[misspelling]
            }.
            Include approximately ${emojiCount} emojis per message. **Crucially, distribute these emojis throughout the text (in the beginning, middle, and end), not just clumped at the end.**
            Use punctuation at an intensity level of ${punctuationIntensity}/10 (0 being minimal/none, 10 being heavy and expressive with lots of !!! and ...).
            The messages must be written in ${languageName}.
            ${
              lowercase
                ? "The entire output text must be strictly in all lowercase letters."
                : "Do not enforce lowercase. Use standard casing."
            }
        `;

  return { systemInstruction, userQuery };
}

async function generateMessages() {
  if (isLoading) return;

  const buttonTextOriginal = generateButton.innerHTML;
  generateButton.disabled = true;
  isLoading = true;
  generateButton.innerHTML = `<i data-lucide="loader" class="w-5 h-5 animate-spin"></i> Generating...`;

  const { systemInstruction, userQuery } = getPromptDetails();

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "ARRAY",
        items: { type: "STRING" },
      },
    },
  };

  const _serviceEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${_authConfig}`;
  const MAX_RETRIES = 3;
  let response;

  try {
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      response = await fetch(_serviceEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 429 && attempt < MAX_RETRIES - 1) {
        console.warn(
          `Rate limit encountered, retrying in ${Math.pow(2, attempt)}s...`
        );
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue; // Retry
      }
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(
          `Service Error: ${response.status} - ${
            errorBody.error?.message || response.statusText
          }`
        );
      }
      break; // Success
    }

    if (!response || !response.ok) {
      throw new Error("Failed to get a successful response after all retries.");
    }

    const result = await response.json();
    const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (jsonText) {
      const parsedMessages = JSON.parse(jsonText);
      if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
        appState.messages = parsedMessages.slice(0, 5); // Ensure max 5
        appState.currentIndex = 0;
        updateUI();
        showStatusMessage("5 new messages generated successfully!", "success");
      } else {
        throw new Error(
          "Invalid response format received from service: JSON array is empty or not an array."
        );
      }
    } else {
      throw new Error(
        "Service response was empty or malformed (No text content)."
      );
    }
  } catch (error) {
    console.error("External service call failed:", error);
    appState.messages = [];
    updateUI();
    showStatusMessage(
      "Generation failed. Please try again. See console for details.",
      "error"
    );
  } finally {
    generateButton.innerHTML = buttonTextOriginal;
    generateButton.disabled = false;
    lucide.createIcons();
    isLoading = false;
  }
}

// --- Initialization ---

window.onload = () => {
  // Load and apply settings from cookie
  loadSettings();
  updateUI();

  // Initial creation of icons
  lucide.createIcons();

  // Check if messages were loaded from the cookie and scroll to the last viewed one
  if (appState.messages.length > 0) {
    scrollToCard(appState.currentIndex, false);
  }
};

// Initial setup for collapsible settings panel
document.addEventListener("DOMContentLoaded", () => {
  const settingsToggle = document.getElementById("settings-toggle");
  const settingsContent = document.getElementById("settings-content");

  settingsToggle.addEventListener("click", () => {
    const isExpanded = settingsContent.classList.contains("h-auto");
    const icon = settingsToggle.querySelector('[data-lucide="chevron-down"]');

    if (isExpanded) {
      // Collapse
      settingsContent.style.maxHeight = "0";
      settingsContent.classList.remove("h-auto", "mt-4");
      icon.classList.remove("rotate-180");
    } else {
      // Expand
      settingsContent.style.maxHeight = settingsContent.scrollHeight + "px";
      settingsContent.classList.add("h-auto", "mt-4");
      icon.classList.add("rotate-180");
    }
  });

  // Initial collapse of settings
  settingsContent.style.maxHeight = "0";
  settingsContent.classList.remove("h-auto", "mt-4");
});

// --- Event Listeners for Touch/Swipe Navigation (Used for looping) ---
// (Scroll snapping handles most of the behavior, keeping this minimal)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("DOMContentLoaded", () => {
  const cardCarousel = document.getElementById("card-carousel");

  cardCarousel.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    false
  );

  cardCarousel.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleGesture();
    },
    false
  );

  // Listen for scroll events to update current index (used for manual swipe/scroll)
  cardCarousel.addEventListener("scroll", () => {
    clearTimeout(cardCarousel.scrollTimeout);
    cardCarousel.scrollTimeout = setTimeout(() => {
      if (appState.messages.length === 0) return;

      const scrollLeft = cardCarousel.scrollLeft;
      const cardWidth = cardCarousel.offsetWidth;
      // Calculate the index of the card currently snapped into view
      const newIndex = Math.round(scrollLeft / cardWidth);

      if (newIndex >= 0 && newIndex < appState.messages.length) {
        appState.currentIndex = newIndex;
        const currentCardIndexEl =
          document.getElementById("current-card-index");
        currentCardIndexEl.textContent = newIndex + 1;
        saveSettings();
      }
    }, 100);
  });
});

function handleGesture() {
  if (appState.messages.length <= 1) return;
  // The browser's native scroll-snap handles the movement.
  // We rely on the 'scroll' event listener to update the index.
}
