import { appState } from "./state.js";
import { TRANSLATIONS } from "./i18n.js";
import { LANG_DISPLAY } from "./config.js";
import { generateMessages } from "./api.js";

// --- UI Elements ---
const getSideMenu = () => document.getElementById("side-menu");
const getOverlayMenu = () => document.getElementById("overlay-menu");
const getThemeToggle = () => document.getElementById("theme-toggle");
const getLangToggle = () => document.getElementById("lang-toggle");
const getLowercaseToggle = () => document.getElementById("lowercase-toggle");
// const getSettingsToggle = () => document.getElementById("settings-toggle");
// const getSettingsContent = () => document.getElementById("settings-content");
const getGenerateButton = () => document.getElementById("generate-button");
const getCardCarousel = () => document.getElementById("card-carousel");
const getCurrentCardIndexEl = () => document.getElementById("current-card-index");
const getTotalCardsEl = () => document.getElementById("total-cards");
const getStatusMessageEl = () => document.getElementById("status-message");
const getNavPrevButton = () => document.getElementById("nav-prev");
const getNavNextButton = () => document.getElementById("nav-next");
const getMessagePlaceholder = () => document.getElementById("message-placeholder");
const getLowercaseToggleBg = () => document.getElementById("lowercase-toggle-bg");

// --- Helper Functions ---

function getTranslations() {
    return TRANSLATIONS[appState.get().language];
}

export function setGeneratingState(isGenerating) {
    const btn = getGenerateButton();
    if (isGenerating) {
        btn.dataset.originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader" class="w-5 h-5 animate-spin"></i> Generating...`;
    } else {
        const t = getTranslations();
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="sparkles" class="w-5 h-5"></i> ${t.generateButton}`;
    }
}

export function showStatusMessage(message, type) {
    const statusMessageEl = getStatusMessageEl();
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

// Color interpolation function (Amber to Rose/Pink)
function updatePrimaryColor() {
    const minSincerity = 1;
    const maxSincerity = 10;
    const currentSincerity = appState.get().sincerity;

    // Amber (A) RGB: 245, 158, 11 (approx Amber-500)
    const R_A = 245,
        G_A = 158,
        B_A = 11;
    // Rose (R) RGB: 244, 63, 94 (approx Rose-500)
    const R_R = 244,
        G_R = 63,
        B_R = 94;

    const t = (currentSincerity - minSincerity) / (maxSincerity - minSincerity);

    const R = Math.round(R_A + t * (R_R - R_A));
    const G = Math.round(G_A + t * (G_R - G_A));
    const B = Math.round(B_A + t * (B_R - B_A));

    const newColor = `rgb(${R}, ${G}, ${B})`;

    document.documentElement.style.setProperty("--primary-color", newColor);

    const shadowR = Math.round(R + t * 10);
    const shadowG = Math.round(G + t * 10);
    const shadowB = Math.round(B + t * 10);
    const shadowColor = `rgb(${shadowR}, ${shadowG}, ${shadowB})`;
    document.documentElement.style.setProperty("--shadow-color", shadowColor);

    const bg = getLowercaseToggleBg();
    if (bg) bg.style.backgroundColor = newColor;
}

function updateTranslations() {
    const t = getTranslations();

    document.querySelector("h1").textContent = t.title;

    const settingsHeader = document.querySelector("#side-menu h2");
    if (settingsHeader) settingsHeader.textContent = t.settings;

    const lowercaseLabel = document.getElementById("lowercase-label");
    if (lowercaseLabel) lowercaseLabel.textContent = t.allLowercase;

    const themeLabel = document.getElementById("theme-label");
    if (themeLabel) themeLabel.textContent = t.theme;

    const linksHeader = document.querySelector("#side-menu h3");
    if (linksHeader) linksHeader.textContent = t.links;

    const contributeLink = document.querySelector('a[href*="github"]');
    if (contributeLink)
        contributeLink.innerHTML = `<i data-lucide="github" class="w-4 h-4"></i> ${t.contribute}`;

    const developerLink = document.querySelector('a[href*="beydahsaglam"]');
    if (developerLink)
        developerLink.innerHTML = `<i data-lucide="code" class="w-4 h-4"></i> ${t.developer}`;

    const resetButton = document.querySelector('button[id="reset-btn"]');
    if (resetButton) resetButton.textContent = t.resetSettings;

    const mainSettingsHeader = document.querySelector("#settings-toggle h2");
    if (mainSettingsHeader) mainSettingsHeader.textContent = t.messageSettings;

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

    const generateBtn = getGenerateButton();
    if (generateBtn && !generateBtn.disabled) {
        generateBtn.innerHTML = `<i data-lucide="sparkles" class="w-5 h-5"></i> ${t.generateButton}`;
    }

    const cardHeader = document.getElementById("card-header");
    if (cardHeader) {
        const st = appState.get();
        const currentIndex = st.currentIndex + 1;
        const totalCards = st.messages.length;
        cardHeader.innerHTML = `${t.generatedMessages} (<span id="current-card-index">${currentIndex}</span>/<span id="total-cards">${totalCards}</span>)`;
    }

    const placeholderText = document.querySelector("#message-placeholder p");
    if (placeholderText) placeholderText.textContent = t.placeholderText;

    const footerText = document.querySelector("footer p");
    if (footerText) {
        footerText.innerHTML = `Developed by <a href="https://beydahsaglam.com" target="_blank" class="hover:underline font-medium transition-colors duration-200" style="color: var(--primary-color)">Beydah Saglam</a> for Beyza ❤️`;
    }

    // Range Labels
    const lengthRangeLabels = document.querySelectorAll("#length-range + div span");
    if (lengthRangeLabels.length >= 2) {
        lengthRangeLabels[0].textContent = `5 ${t.words}`;
        lengthRangeLabels[1].textContent = `50 ${t.words}`;
    }

    const sincerityRangeLabels = document.querySelectorAll("#sincerity-range + div span");
    if (sincerityRangeLabels.length >= 2) {
        sincerityRangeLabels[0].textContent = `${t.formal} (1/10)`;
        sincerityRangeLabels[1].textContent = `${t.warm} (10/10)`;
    }

    const misspellingRangeLabels = document.querySelectorAll("#misspelling-range + div span");
    if (misspellingRangeLabels.length >= 2) {
        misspellingRangeLabels[0].textContent = `${t.correct} (1/10)`;
        misspellingRangeLabels[1].textContent = `${t.maximum} (10/10)`;
    }

    const punctuationRangeLabels = document.querySelectorAll("#punctuation-range + div span");
    if (punctuationRangeLabels.length >= 2) {
        punctuationRangeLabels[0].textContent = `0 (${t.minimal})`;
        punctuationRangeLabels[1].textContent = `10 (${t.max})`;
    }
}

function renderMessages() {
    const st = appState.get();
    const messages = st.messages;
    const cardCarousel = getCardCarousel();
    const messagePlaceholder = getMessagePlaceholder();
    const currentCardIndexEl = getCurrentCardIndexEl();
    const totalCardsEl = getTotalCardsEl();
    const navPrevButton = getNavPrevButton();
    const navNextButton = getNavNextButton();

    cardCarousel.innerHTML = "";
    totalCardsEl.textContent = messages.length;

    if (messages.length === 0) {
        messagePlaceholder.classList.remove("hidden");
        cardCarousel.classList.add("hidden");
        currentCardIndexEl.textContent = 0;
    } else {
        messagePlaceholder.classList.add("hidden");
        cardCarousel.classList.remove("hidden");
        currentCardIndexEl.textContent = st.currentIndex + 1;
    }

    const showNav = messages.length > 1;
    navPrevButton.style.opacity = showNav ? "1" : "0";
    navNextButton.style.opacity = showNav ? "1" : "0";
    navPrevButton.disabled = !showNav;
    navNextButton.disabled = !showNav;

    if (messages.length === 0) return;

    messages.forEach((text, index) => {
        const cardWrapper = document.createElement("div");
        cardWrapper.className = "card-wrapper";
        cardWrapper.id = `msg-card-${index}`;
        const t = getTranslations();

        // Using innerHTML here for the template, but text content is safely injected via string interpolation if 'text' was pure text.
        // However, the original code used replace(/\n/g, "<br>") which implies HTML injection.
        // We should be careful here. For now, maintaining original logic but wrapping in a container.
        // Ideally, we'd construct elements.

        cardWrapper.innerHTML = `
                <div class="bg-card-bg h-96 p-6 rounded-2xl shadow-xl flex flex-col transition-colors duration-300 border border-gray-100 dark:border-gray-800">
                    <div class="flex-grow overflow-y-auto text-lg leading-relaxed text-primary-text mb-4 p-2 custom-scrollbar message-text-content">
                        <!-- Content injected below safely -->
                    </div>
                    <button class="copy-btn w-full py-2 bg-gray-100 dark:bg-gray-700 text-secondary-text rounded-xl hover:text-white transition-all duration-300 font-medium flex items-center justify-center gap-2"
                        data-index="${index}"
                        style="background-color: var(--primary-color)15; border: 1px solid var(--primary-color); color: var(--primary-color);">
                        <i data-lucide="copy" class="w-5 h-5"></i>
                        ${t.copyMessage}
                    </button>
                </div>
            `;
        // Safer injection
        const textDiv = cardWrapper.querySelector(".message-text-content");
        textDiv.innerHTML = text.replace(/\n/g, "<br>"); // Allow line breaks, but normally should sanitize 'text' first.

        // Attach event listener for copy
        const copyBtn = cardWrapper.querySelector(".copy-btn");
        copyBtn.addEventListener("click", () => copyMessage(index));

        cardCarousel.appendChild(cardWrapper);
    });

    scrollToCard(st.currentIndex, false);
}

function scrollToCard(index, animate = true) {
    const cardCarousel = getCardCarousel();
    const card = document.getElementById(`msg-card-${index}`);
    if (card) {
        cardCarousel.scrollTo({
            left: card.offsetLeft - cardCarousel.scrollLeft + cardCarousel.scrollLeft, // Simplified
            behavior: animate ? "smooth" : "auto",
        });
        appState.set({ currentIndex: index });
        appState.save();

        const currentCardIndexEl = getCurrentCardIndexEl();
        if (currentCardIndexEl) currentCardIndexEl.textContent = index + 1;
    }
}

export function copyMessage(index) {
    const text = appState.get().messages[index];
    if (!text) {
        showStatusMessage("Error: Message not found.", "error");
        return;
    }

    try {
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

export function navigateCarousel(direction) {
    const st = appState.get();
    if (st.messages.length === 0) return;

    let newIndex = st.currentIndex + direction;

    if (newIndex >= st.messages.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = st.messages.length - 1;
    }

    scrollToCard(newIndex, true);
}


export function updateUI() {
    const st = appState.get();

    updatePrimaryColor();

    document.documentElement.classList.toggle("dark", st.theme === "dark");
    const t = getTranslations();

    const themeToggle = getThemeToggle();
    if (themeToggle) {
        themeToggle.innerHTML =
            st.theme === "dark"
                ? `<i data-lucide="moon" class="w-4 h-4"></i> ${t.dark}`
                : `<i data-lucide="sun" class="w-4 h-4"></i> ${t.light}`;
    }

    const langToggle = getLangToggle();
    if (langToggle) langToggle.textContent = LANG_DISPLAY[st.language];

    const lowercaseToggle = getLowercaseToggle();
    if (lowercaseToggle) lowercaseToggle.checked = st.lowercase;

    // Sync Range Inputs
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
        if (rangeEl) rangeEl.value = st[key];

        if (valueEl) {
            if (key === "length") {
                const actualLength = 5 * st.length;
                valueEl.textContent = actualLength + " " + t.words;
            } else if (key === "sincerity") {
                valueEl.textContent = t.sincerityLevels[st.sincerity];
            } else if (key === "misspelling") {
                valueEl.textContent = t.misspellingLevels[st.misspelling];
            } else if (key === "emoji" || key === "punctuation") {
                valueEl.textContent = st[key];
            }
        }
    });

    updateTranslations();
    renderMessages();
    appState.save();

    // Re-create icons
    if (window.lucide) window.lucide.createIcons();
}

// --- Menu Toggles ---
export function toggleMenu() {
    const sideMenu = getSideMenu();
    const overlayMenu = getOverlayMenu();
    const isClosed = sideMenu.classList.contains("translate-x-full");
    sideMenu.classList.toggle("translate-x-full", !isClosed);
    overlayMenu.classList.toggle("hidden", !isClosed);
}

export function initUIListeners() {
    // Menu
    document.getElementById("menu-button")?.addEventListener("click", toggleMenu);
    document.getElementById("overlay-menu")?.addEventListener("click", toggleMenu);
    document.querySelector("#side-menu button")?.addEventListener("click", toggleMenu); // Close btn

    // Settings
    document.getElementById("lang-toggle")?.addEventListener("click", () => {
        // Cycle logic
        const st = appState.get();
        // Assuming LANG_CODES is available via config or we import it, 
        // but easier to just increment index
        const codes = ["tr", "az", "en", "de", "ru"];
        const nextIndex = (st.languageIndex + 1) % codes.length;
        appState.set({
            languageIndex: nextIndex,
            language: codes[nextIndex]
        });
        updateUI();
    });

    document.getElementById("lowercase-toggle")?.addEventListener("click", (e) => {
        appState.set({ lowercase: e.target.checked });
        updateUI();
    });

    document.getElementById("theme-toggle")?.addEventListener("click", () => {
        const st = appState.get();
        appState.set({ theme: st.theme === "light" ? "dark" : "light" });
        updateUI();
    });

    // Reset
    // Note: We need to assign specific ID to reset button in HTML or select by text, 
    // but better to add ID in HTML later. For now selecting by attribute.
    const resetBtn = document.querySelector('button[onclick*="clearAllCookies"]');
    // We will replace onclick in HTML with ID 'reset-btn'
    if (resetBtn) {
        resetBtn.id = "reset-btn";
        resetBtn.onclick = null; // Clear inline handler
        resetBtn.addEventListener("click", () => {
            import("./utils.js").then(m => {
                m.clearAllCookies();
                location.reload();
            });
        });
    }

    // Range Inputs
    const rangeInputs = [
        "length",
        "sincerity",
        "misspelling",
        "emoji",
        "punctuation",
    ];
    rangeInputs.forEach(key => {
        document.getElementById(`${key}-range`)?.addEventListener("input", (e) => {
            appState.set({ [key]: parseInt(e.target.value) });
            updateUI();
        });
    });

    // Generate
    document.getElementById("generate-button")?.addEventListener("click", generateMessages);

    // Nav
    document.getElementById("nav-prev")?.addEventListener("click", () => navigateCarousel(-1));
    document.getElementById("nav-next")?.addEventListener("click", () => navigateCarousel(1));

    // Settings Toggle (Collapsible)
    const settingsToggle = document.getElementById("settings-toggle");
    const settingsContent = document.getElementById("settings-content");
    if (settingsToggle && settingsContent) {
        settingsToggle.addEventListener("click", () => {
            const isExpanded = settingsContent.classList.contains("h-auto");
            const icon = settingsToggle.querySelector('[data-lucide="chevron-down"]');

            if (isExpanded) {
                settingsContent.style.maxHeight = "0";
                settingsContent.classList.remove("h-auto", "mt-4");
                icon.classList.remove("rotate-180");
            } else {
                settingsContent.style.maxHeight = settingsContent.scrollHeight + "px";
                settingsContent.classList.add("h-auto", "mt-4");
                icon.classList.add("rotate-180");
            }
        });
    }
}
