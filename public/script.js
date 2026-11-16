// --- ÇEVİRİ SÖZLÜĞÜ (TR / EN) ---
const translations = {
  tr: {
    langBtn: "EN",
    studioBadge: "🎉 Kişiye Özel Kutlama Stüdyosu Pro 🎁",
    studioDesc: "Sevdiklerin İçin Modern, Şifreli Kişiye Özel Kartlar Tasarla!",
    occasionLabel: "Özel Gün",
    passLabel: "Güvenlik Şifresi",
    senderLabel: "Kimden?",
    forLabel: "Kimin İçin?",
    yearLabel: "Doğum Veya Başlangıç Yılı Ekleyin",
    msgLabel: "Sevgi Mesajın",
    msgPlaceholder: "İyi ki varsın...",
    randomBtn: "✨ Rastgele",
    photosLabel: "Fotoğraflar (Max 4)",
    audioLabel: "Özel Arka Plan Müzik / Ses (Opsiyonel)",
    submitBtn: "✨ Kutlama Linki & QR Kodu Oluştur",
    optBirthday: "🎂 Doğum Günü",
    optAnniversary: "💍 Yıldönümü",
    optValentine: "❤️ Sevgililer Günü",
    optNewyear: "🎄 Yılbaşı",
    passTitle: "Bu Kutlama Korumalı",
    passDesc: "Görüntülemek için kart sahibinin belirlediği şifreyi girin.",
    passPlaceholder: "ŞİFRE",
    passError: "❌ Yanlış şifre! Lütfen tekrar deneyin.",
    unlockBtn: "Kilidi Aç 🔓",
    voiceConfirmTitle: "Sesli Mesajı Gönder",
    voiceConfirmDesc: "Bu sesli mesajı anı defterine göndermek istediğinize emin misiniz? Geri silinemez.",
    noBtn: "Hayır ❌",
    yesBtn: "Evet, Gönder ✨",
    surpriseTag: "Sürpriz Mesajın",
    seeMemoriesBtn: " Anılarımı Gör 📸",
    backBtn: "Geri Git",
    blowBtnText: "Mumu Söndürmek İçin Tıkla! 💨",
    copyBtn: "Kopyala",
    qrTitle: "Hediye Kartı İçin QR Kod",
    qrDownload: "QR Kodu İndir 📥",
    albumTag: "📸 Anı Albümü",
    albumTitle: "Özel Anılarımız",
    liveViewText: "Canlı Görüntülenme:",
    guestbookTitle: "💬 Anı Defteri & Dilekler",
    namePlaceholder: "Adınız",
    commentPlaceholder: "Kutlama mesajı yaz...",
    voiceLabel: " Sesli Not Bırak (İsteğe bağlı)",
    recordBtnText: "Kayıt Başlat",
    sendBtn: "Gönder",
    homeBtn: "Ana Sayfa",
    closingGreeting: "İYİ Kİ VARSIN",
    supportTitle: "Nasıl Kullanılır?",
    supportSubtitle: "Bulunduğun sayfaya özel rehber",
    supportHelpText: "Sorun mu yaşıyorsunuz? Yardım talebi oluşturun:",
    supportBtn: "🛠️ Yardım Talebi Oluştur",
  },
  en: {
    langBtn: "TR",
    studioBadge: "🎉 Personalized Celebration Studio Pro 🎁",
    studioDesc: "Design Modern, Encrypted Personalized Cards for Your Loved Ones!",
    occasionLabel: "Occasion",
    passLabel: "Security Password",
    senderLabel: "From?",
    forLabel: "For Whom?",
    yearLabel: "Add Birth or Start Year",
    msgLabel: "Your Love Message",
    msgPlaceholder: "Glad to have you...",
    randomBtn: "✨ Random",
    photosLabel: "Photos (Max 4)",
    audioLabel: "Special Background Music / Audio (Optional)",
    submitBtn: "✨ Create Celebration Link & QR Code",
    optBirthday: "🎂 Birthday",
    optAnniversary: "💍 Anniversary",
    optValentine: "❤️ Valentine's Day",
    optNewyear: "🎄 New Year",
    passTitle: "This Celebration is Protected",
    passDesc: "Enter the password set by the card owner to view.",
    passPlaceholder: "PASSWORD",
    passError: "❌ Incorrect password! Please try again.",
    unlockBtn: "Unlock 🔓",
    voiceConfirmTitle: "Send Voice Note",
    voiceConfirmDesc: "Are you sure you want to send this voice note to the guestbook? It cannot be deleted.",
    noBtn: "No ❌",
    yesBtn: "Yes, Send ✨",
    surpriseTag: "Your Surprise Message",
    seeMemoriesBtn: " See My Memories 📸",
    backBtn: "Go Back",
    blowBtnText: "Click to Blow Out the Candle! 💨",
    copyBtn: "Copy",
    qrTitle: "QR Code for Gift Card",
    qrDownload: "Download QR Code 📥",
    albumTag: "📸 Memory Album",
    albumTitle: "Our Special Memories",
    liveViewText: "Live Views:",
    guestbookTitle: "💬 Guestbook & Wishes",
    namePlaceholder: "Your Name",
    commentPlaceholder: "Write a celebration message...",
    voiceLabel: " Leave a Voice Note (Optional)",
    recordBtnText: "Start Recording",
    sendBtn: "Send",
    homeBtn: "Home",
    closingGreeting: "GLAD TO HAVE YOU",
    supportTitle: "How to Use?",
    supportSubtitle: "Guide specific to your current page",
    supportHelpText: "Having trouble? Create a help request:",
    supportBtn: "🛠️ Create Support Request",
  },
};
let wasMusicPlayingBeforeAudio = false; // Ses çalmadan önce müzik açık mıydı?
let currentLang = localStorage.getItem("site_lang") || "tr";

function toggleLanguage() {
  // 1. Dili değiştir ve localStorage'a kaydet
  currentLang = currentLang === "tr" ? "en" : "tr";
  localStorage.setItem("site_lang", currentLang);

  // 2. Sadece arayüzdeki metin etiketlerini güncelle (Müziğe ve DOM'a dokunulmaz, takılma olmaz)
  applyLanguage();

  // 3. Eğer kart açık durumdaysa, tüm kartı yeniden çizmek yerine sadece dinamik metin alanlarını güncelle
  if (cardData) {
    const uppercaseName = (cardData.name || "").toUpperCase();
    const uppercaseSender = (cardData.sender || "").toUpperCase();

    let subGreeting = currentLang === "en" ? "Glad to Have You" : "İyi Ki Varsın";
    if (cardData.occasion === "birthday") subGreeting = currentLang === "en" ? "Happy Birthday" : "İyi Ki Doğdun";
    else if (cardData.occasion === "anniversary") subGreeting = currentLang === "en" ? "Glad to Have You" : "İyi Ki Varsın";
    else if (cardData.occasion === "valentine") subGreeting = currentLang === "en" ? "I Love You So Much" : "Seni Çok Seviyorum";
    else if (cardData.occasion === "newyear") subGreeting = currentLang === "en" ? "Happy New Year" : "Mutlu Yıllar";

    let occasionTitle = currentLang === "en" ? "Is Celebrating Birthday" : "Doğum Gününü Kutluyor";
    let occasionEmoji = "🎂";
    if (cardData.occasion === "anniversary") {
      occasionTitle = currentLang === "en" ? "Is Celebrating Anniversary" : "Yıldönümünüzü Kutluyor";
      occasionEmoji = "💍";
    } else if (cardData.occasion === "valentine") {
      occasionTitle = currentLang === "en" ? "IS CELEBRATING VALENTINE'S DAY" : "SEVGİLİLER GÜNÜNÜ KUTLUYOR";
      occasionEmoji = "❤️";
    } else if (cardData.occasion === "newyear") {
      occasionTitle = currentLang === "en" ? "Is Celebrating New Year" : "Yeni Yılını Kutluyor";
      occasionEmoji = "🎄";
    }

    const badgeTextEl = document.getElementById("badgeText");
    if (badgeTextEl) {
      let badgeContent = uppercaseSender
        ? `${uppercaseSender} ${occasionTitle} - ${uppercaseName} (${subGreeting})`
        : `${occasionTitle} - ${uppercaseName} (${subGreeting})`;
      badgeTextEl.innerText = `${occasionEmoji} ${badgeContent} ${occasionEmoji}`;
    }

    // Pasta altındaki yaş / yıl yazısını güncelle
    const bYear = cardData.birthyear || cardData.birthYear;
    const currentYear = new Date().getFullYear();
    const diff = bYear ? currentYear - parseInt(bYear) : 0;
    const cakeLabelText = document.getElementById("cakeLabelText");

    if (cakeLabelText) {
      if (cardData.occasion === "anniversary") {
        cakeLabelText.innerText =
          diff > 0
            ? currentLang === "en"
              ? `Happy ${diff}. Anniversary ❤️`
              : `${diff}. Yılımız Kutlu Olsun ❤️`
            : currentLang === "en"
              ? "Happy Anniversary ❤️"
              : "Yıldönümümüz Kutlu Olsun ❤️";
      } else if (cardData.occasion === "valentine") {
        cakeLabelText.innerText =
          diff > 0
            ? currentLang === "en"
              ? `Happy ${diff}. Year Together 💖`
              : `${diff}. Yılımız Kutlu Olsun 💖`
            : currentLang === "en"
              ? "Happy Valentine's Day 💖"
              : "Sevgililer Günümüz Kutlu Olsun 💖";
      } else if (cardData.occasion === "newyear") {
        cakeLabelText.innerText = currentLang === "en" ? "Happy New Year! 🎄" : "Mutlu Yıllar! 🎄";
      } else {
        if (diff >= 0) {
          const age = diff + 1;
          cakeLabelText.innerText = currentLang === "en" ? `Turning ${age} 🎂` : `${age}. Yaşına Giriyorsun 🎂`;
        } else {
          cakeLabelText.innerText = currentLang === "en" ? "Happy Birthday! 🎂" : "İyi ki Doğdun! 🎂";
        }
      }
    }
  }
}

function applyLanguage() {
  const t = translations[currentLang];
  document.getElementById("langButtonText").innerText = t.langBtn;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.innerText = t[key];
  });

  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const key = el.getAttribute("data-i18n-ph");
    if (t[key]) el.placeholder = t[key];
  });

  const liveViewEl = document.getElementById("liveViewCountText");
  if (liveViewEl) liveViewEl.innerText = t.liveViewText;
}

let currentCardId = null;
let cardData = null;
let currentPhotoIndex = 0;
let isMusicPlaying = false;

function updateThemeByOccasion(occasion) {
  const occ = occasion || "birthday";
  document.body.classList.remove("theme-birthday", "theme-valentine", "theme-anniversary", "theme-newyear");

  if (occ === "valentine") {
    document.body.classList.add("theme-valentine");
    initParticles("valentine");
  } else if (occ === "anniversary") {
    document.body.classList.add("theme-anniversary");
    initParticles("anniversary");
  } else if (occ === "newyear") {
    document.body.classList.add("theme-newyear");
    initParticles("newyear");
  } else {
    document.body.classList.add("theme-birthday");
    initParticles("birthday");
  }
}

function toggleMusic() {
  const customAudio = document.getElementById("customAudio");
  const bgAudio = document.getElementById("bgAudio");
  const icon = document.getElementById("musicIcon");

  const hasCustom = customAudio.src && customAudio.src !== window.location.href;
  const activeAudio = hasCustom ? customAudio : bgAudio;

  if (isMusicPlaying) {
    activeAudio.pause();
    icon.className = "fa-solid fa-music";
    isMusicPlaying = false;
  } else {
    bgAudio.pause();
    customAudio.pause();

    activeAudio
      .play()
      .then(() => {
        icon.className = "fa-solid fa-volume-high text-emerald-400";
        isMusicPlaying = true;
      })
      .catch(() => {
        showToast(currentLang === "en" ? "Failed to play music." : "Müzik çalınamadı.", "error");
      });
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  applyLanguage();
  updateThemeByOccasion("birthday");

  const urlParams = new URLSearchParams(window.location.search);
  const cardId = urlParams.get("id");

  if (cardId) {
    currentCardId = cardId;

    if (localStorage.getItem("blown_" + cardId) === "true") {
      document.getElementById("createSection").classList.add("hidden");
      document.getElementById("celebrateSection").classList.remove("hidden");
      document.getElementById("flame").style.display = "none";
      document.getElementById("smokeEffect").classList.remove("hidden");
      const btnText = currentLang === "en" ? "My Memories 📸" : "Anılarım 📸";
      document.getElementById("actionArea").innerHTML = `
        <button onclick="openPhotoBoard()" class="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 text-white font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-indigo-500/25 transition">
          <i class="fa-solid fa-images"></i><span>${btnText}</span>
        </button>`;
    }

    fetchCardDetails("");
  }
});

async function fetchCardDetails(passCode) {
  try {
    const res = await fetch("/api/card/" + currentCardId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passCode }),
    });
    const data = await res.json();

    const errorMsg = document.getElementById("passwordErrorMsg");
    const passInput = document.getElementById("inputPassAttempt");

    if (data.isLocked) {
      document.getElementById("passwordModal").classList.remove("hidden");
      if (passCode) {
        errorMsg.classList.remove("hidden");
        passInput.classList.add("border-rose-500");
        passInput.value = "";
        passInput.focus();
      }
    } else if (data.success) {
      errorMsg.classList.add("hidden");
      passInput.classList.remove("border-rose-500");
      document.getElementById("passwordModal").classList.add("hidden");

      cardData = data.card;
      renderCard(cardData);
    } else {
      showToast(currentLang === "en" ? "Celebration not found." : "Kutlama bulunamadı.", "error");
    }
  } catch (err) {
    showToast(currentLang === "en" ? "Connection error." : "Bağlantı hatası.", "error");
  }
}

function submitPassword() {
  const pass = document.getElementById("inputPassAttempt").value;
  fetchCardDetails(pass);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("inputName");
  const messageInput = document.getElementById("inputMessage");
  const passInput = document.getElementById("inputPassCode");
  const submitBtn = document.getElementById("submitBtn");
  const submitBtnText = document.getElementById("submitBtnText");
  const birthYearInput = document.getElementById("inputBirthYear");

  const yearVal = parseInt(birthYearInput.value);

  if (!nameInput.value.trim() || !messageInput.value.trim()) {
    showToast(currentLang === "en" ? "Please fill in all empty fields." : "Lütfen Boş Alanları Doldurun.", "error");
    return;
  }

  if (!passInput.value.trim() || passInput.value.length !== 4) {
    passInput.focus();
    showToast(currentLang === "en" ? "Please set a 4-digit password (PIN)." : "Lütfen tam 4 haneli bir şifre (PIN) belirleyin.", "error");
    return;
  }
  if (!birthYearInput.value.trim() || birthYearInput.value.length !== 4 || yearVal < 1930 || yearVal > 2030) {
    birthYearInput.focus();
    showToast(
      currentLang === "en" ? "Please enter a 4-digit year between 1930 and 2030." : "Lütfen 1930 ile 2030 arasında 4 haneli bir yıl girin.",
      "error",
    );
    return;
  }

  submitBtn.disabled = true;
  const creatingText = currentLang === "en" ? "Creating, please wait..." : "Oluşturuluyor, lütfen bekleyin...";
  submitBtnText.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> ${creatingText}`;

  const form = document.getElementById("cardForm");
  const formData = new FormData(form);

  try {
    const res = await fetch("/api/create", { method: "POST", body: formData });
    const data = await res.json();
    if (data.success) {
      currentCardId = data.cardId;
      window.history.pushState({}, "", "?id=" + data.cardId);
      await fetchCardDetails(passInput.value);
      showToast(currentLang === "en" ? "Celebration created successfully! ✨" : "Kutlama başarıyla oluşturuldu! ✨", "success");
    } else {
      showToast(data.error || (currentLang === "en" ? "An error occurred." : "Hata oluştu."), "error");
      submitBtn.disabled = false;
      submitBtnText.innerText = translations[currentLang].submitBtn;
    }
  } catch (err) {
    showToast(currentLang === "en" ? "Connection error." : "Bağlantı hatası.", "error");
    submitBtn.disabled = false;
    submitBtnText.innerText = translations[currentLang].submitBtn;
  }
}

function renderCard(card) {
  const uppercaseName = (card.name || "").toUpperCase();
  const uppercaseSender = (card.sender || "").toUpperCase();

  let subGreeting = currentLang === "en" ? "Glad to Have You" : "İyi Ki Varsın";
  if (card.occasion === "birthday") subGreeting = currentLang === "en" ? "Happy Birthday" : "İyi Ki Doğdun";
  else if (card.occasion === "anniversary") subGreeting = currentLang === "en" ? "Glad to Have You" : "İyi Ki Varsın";
  else if (card.occasion === "valentine") subGreeting = currentLang === "en" ? "I Love You So Much" : "Seni Çok Seviyorum";
  else if (card.occasion === "newyear") subGreeting = currentLang === "en" ? "Happy New Year" : "Mutlu Yıllar";

  document.getElementById("displayName").innerHTML = "";
  updateThemeByOccasion(card.occasion);
  document.getElementById("inputOccasion").value = card.occasion || "birthday";

  let occasionTitle = currentLang === "en" ? "Is Celebrating Birthday" : "Doğum Gününü Kutluyor";
  let occasionEmoji = "🎂";
  if (card.occasion === "anniversary") {
    occasionTitle = currentLang === "en" ? "Is Celebrating Anniversary" : "Yıldönümünüzü Kutluyor";
    occasionEmoji = "💍";
  } else if (card.occasion === "valentine") {
    occasionTitle = currentLang === "en" ? "IS CELEBRATING VALENTINE'S DAY" : "SEVGİLİLER GÜNÜNÜ KUTLUYOR";
    occasionEmoji = "❤️";
  } else if (card.occasion === "newyear") {
    occasionTitle = currentLang === "en" ? "Is Celebrating New Year" : "Yeni Yılını Kutluyor";
    occasionEmoji = "🎄";
  }

  let badgeContent = uppercaseSender
    ? `${uppercaseSender} ${occasionTitle} - ${uppercaseName} (${subGreeting})`
    : `${occasionTitle} - ${uppercaseName} (${subGreeting})`;
  document.getElementById("badgeText").innerText = `${occasionEmoji} ${badgeContent} ${occasionEmoji}`;

  const bYear = card.birthyear || card.birthYear;
  const currentYear = new Date().getFullYear();
  const diff = bYear ? currentYear - parseInt(bYear) : 0;
  const cakeLabelText = document.getElementById("cakeLabelText");

  if (card.occasion === "anniversary") {
    cakeLabelText.innerText =
      diff > 0
        ? currentLang === "en"
          ? `Happy ${diff}. Anniversary ❤️`
          : `${diff}. Yılımız Kutlu Olsun ❤️`
        : currentLang === "en"
          ? "Happy Anniversary ❤️"
          : "Yıldönümümüz Kutlu Olsun ❤️";
  } else if (card.occasion === "valentine") {
    cakeLabelText.innerText =
      diff > 0
        ? currentLang === "en"
          ? `Happy ${diff}. Year Together 💖`
          : `${diff}. Yılımız Kutlu Olsun 💖`
        : currentLang === "en"
          ? "Happy Valentine's Day 💖"
          : "Sevgililer Günümüz Kutlu Olsun 💖";
  } else if (card.occasion === "newyear") {
    cakeLabelText.innerText = currentLang === "en" ? "Happy New Year! 🎄" : "Mutlu Yıllar! 🎄";
  } else {
    if (diff >= 0) {
      const age = diff + 1;
      cakeLabelText.innerText = currentLang === "en" ? `Turning ${age} 🎂` : `${age}. Yaşına Giriyorsun 🎂`;
    } else {
      cakeLabelText.innerText = currentLang === "en" ? "Happy Birthday! 🎂" : "İyi ki Doğdun! 🎂";
    }
  }

  const audioUrl = card.audio || card.audioUrl || card.audiourl || card.sound;
  const customAudioEl = document.getElementById("customAudio");

  if (audioUrl) {
    customAudioEl.src = audioUrl;
  }

  const currentFullUrl = window.location.href;
  const qrImgSrc = card.qrcode || card.qrCode;
  const qrImageUrl = qrImgSrc || `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentFullUrl)}`;

  document.getElementById("qrImage").src = qrImageUrl;
  document.getElementById("qrContainer").classList.remove("hidden");
  document.getElementById("createSection").classList.add("hidden");

  if (card.candleblown || card.candleBlown || localStorage.getItem("blown_" + currentCardId) === "true") {
    localStorage.setItem("blown_" + currentCardId, "true");
    document.getElementById("flame").style.display = "none";
    document.getElementById("smokeEffect").classList.remove("hidden");
    const btnText = currentLang === "en" ? "My Memories 📸" : "Anılarım 📸";
    document.getElementById("actionArea").innerHTML = `
      <button onclick="openPhotoBoard()" class="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 text-white font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-indigo-500/25 transition">
        <i class="fa-solid fa-images"></i><span>${btnText}</span>
      </button>`;
  }

  document.getElementById("photoBoardSection").classList.add("hidden");
  document.getElementById("celebrateSection").classList.remove("hidden");
}

async function blowCandle() {
  if (!cardData || cardData.candleBlown || localStorage.getItem("blown_" + currentCardId) === "true") return;

  try {
    await fetch("/api/card/" + currentCardId + "/blow", { method: "POST" });
    cardData.candleBlown = true;
    cardData.candleblown = true;
    localStorage.setItem("blown_" + currentCardId, "true");
  } catch (e) {}

  document.getElementById("flame").style.display = "none";
  document.getElementById("smokeEffect").classList.remove("hidden");
  if (typeof confetti === "function") confetti({ particleCount: 180, spread: 100, origin: { y: 0.6 } });

  if (!isMusicPlaying) {
    toggleMusic();
  }

  const btnText = currentLang === "en" ? "My Memories 📸" : "Anılarım 📸";
  document.getElementById("actionArea").innerHTML = `
    <button onclick="openPhotoBoard()" class="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 text-white font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-indigo-500/25 transition">
      <i class="fa-solid fa-images"></i><span>${btnText}</span>
    </button>`;

  document.getElementById("modalMessage").innerText = '"' + cardData.message + '"';
  document.getElementById("surpriseModal").classList.remove("hidden");
}

function closeSurpriseModal() {
  document.getElementById("surpriseModal").classList.add("hidden");
}

function openPhotoBoard() {
  document.getElementById("surpriseModal").classList.add("hidden");

  updateLiveViewCounter();

  const grid = document.getElementById("photoGrid");
  grid.innerHTML = "";

  if (cardData && cardData.photos && cardData.photos.length > 0) {
    cardData.photos.forEach((photoUrl, index) => {
      const memoryText = currentLang === "en" ? `Memory #${index + 1}` : `Anı #${index + 1}`;
      grid.innerHTML += `
<div class="bg-slate-950/70 border border-indigo-500/20 hover:border-indigo-500/60 rounded-2xl p-2 space-y-1.5 cursor-pointer group shadow-lg transition-all duration-300 relative" onclick="openFullPhoto(${index})">
    <div class="w-full h-20 overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center relative">
      <img src="${photoUrl}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500 ease-out" alt="Anı">
      <div class="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
        <i class="fa-solid fa-expand text-white text-xs drop-shadow-md"></i>
      </div>
    </div>
    <div class="flex items-center justify-center space-x-1">
      <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
      <p class="text-[10px] text-indigo-300 font-bold tracking-wide text-center">${memoryText}</p>
    </div>
</div>`;
    });
  } else {
    const noPhotoText = currentLang === "en" ? "No photos added." : "Fotoğraf eklenmemiş.";
    grid.innerHTML = `<div class="col-span-2 text-xs text-slate-500 py-4">${noPhotoText}</div>`;
  }

  renderComments();
  document.getElementById("celebrateSection").classList.add("hidden");
  document.getElementById("photoBoardSection").classList.remove("hidden");
}

async function updateLiveViewCounter() {
  try {
    const cardId = currentCardId || "genel-ziyaretci";

    let currentViews = parseInt(localStorage.getItem(`view_${cardId}`) || "0");
    currentViews += 1;
    localStorage.setItem(`view_${cardId}`, currentViews);

    const viewNumberEl = document.getElementById("liveViewCountNumber");
    if (viewNumberEl) {
      viewNumberEl.innerText = currentViews;

      viewNumberEl.classList.add("scale-125", "text-emerald-400");
      setTimeout(() => {
        viewNumberEl.classList.remove("scale-125", "text-emerald-400");
      }, 300);
    }
  } catch (error) {
    const viewNumberEl = document.getElementById("liveViewCountNumber");
    if (viewNumberEl) viewNumberEl.innerText = "0";
  }
}

function openFullPhoto(index) {
  currentPhotoIndex = index;
  updateModalPhoto();
  document.getElementById("photoModal").classList.remove("hidden");
}

function updateModalPhoto() {
  if (!cardData || !cardData.photos) return;
  document.getElementById("modalPhotoImg").src = cardData.photos[currentPhotoIndex];
  document.getElementById("photoCounter").innerText = `${currentPhotoIndex + 1} / ${cardData.photos.length}`;
}

function nextPhoto(e) {
  if (e) e.stopPropagation();
  currentPhotoIndex = (currentPhotoIndex + 1) % cardData.photos.length;
  updateModalPhoto();
}

function prevPhoto(e) {
  if (e) e.stopPropagation();
  currentPhotoIndex = (currentPhotoIndex - 1 + cardData.photos.length) % cardData.photos.length;
  updateModalPhoto();
}

function closePhotoModal() {
  document.getElementById("photoModal").classList.add("hidden");
}

function renderComments() {
  const list = document.getElementById("commentsList");
  const count = document.getElementById("commentCount");
  const comments = cardData.comments || [];
  const noteLabel = currentLang === "en" ? "Notes" : "Not";
  count.innerText = `${comments.length} ${noteLabel}`;
  list.innerHTML = "";

  if (comments.length === 0) {
    const noNoteText = currentLang === "en" ? "No notes yet. Be the first to leave one!" : "Henüz not bırakılmamış. İlk notu sen yaz!";
    list.innerHTML = `<p class="text-[10px] text-slate-500 italic">${noNoteText}</p>`;
    return;
  }

  comments.forEach((c, index) => {
    let voicePlayerHTML = "";
    if (c.voiceUrl) {
      voicePlayerHTML = `
        <div class="mt-2 flex items-center space-x-2 bg-slate-900/90 border border-indigo-500/20 px-3 py-2 rounded-xl shadow-inner relative">
          <button type="button" onclick="toggleVoicePlay('${c.voiceUrl}', ${index})" id="playBtn_${index}" class="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center text-xs shadow-md transition cursor-pointer flex-shrink-0">
            <i id="playIcon_${index}" class="fa-solid fa-play"></i>
          </button>
          <div class="flex-1 flex flex-col justify-center space-y-1">
            <div class="flex items-center justify-between text-[9px] text-slate-400 font-mono">
              <span id="currentTime_${index}">0:00</span>
              <span id="durationTime_${index}">0:00</span>
            </div>
            <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden cursor-pointer relative" onclick="seekAudio(event, ${index})">
              <div id="progressBar_${index}" class="bg-indigo-500 h-full w-0"></div>
            </div>
          </div>
          <div class="relative flex-shrink-0">
            <button type="button" onclick="toggleVolumePopup(${index})" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-[11px] transition cursor-pointer" title="Ses Ayarı">
              <i id="volIcon_${index}" class="fa-solid fa-volume-high"></i>
            </button>
            <div id="volumePopup_${index}" class="hidden absolute bottom-full right-0 mb-2 bg-slate-950 border border-white/15 px-2 py-1.5 rounded-xl shadow-2xl flex items-center space-x-1.5 z-30 backdrop-blur-md">
              <i class="fa-solid fa-volume-low text-[8px] text-slate-400"></i>
              <input type="range" min="0" max="1" step="0.05" value="1" oninput="changeAudioVolume(this.value, ${index})" class="w-8 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500">
              <i class="fa-solid fa-volume-high text-[8px] text-slate-400"></i>
            </div>
          </div>
          <audio id="audioElement_${index}" src="${c.voiceUrl}" preload="metadata" onloadedmetadata="initAudioMeta(${index})" onended="audioEnded(${index})"></audio>
        </div>`;
    }

    list.innerHTML += `
      <div class="bg-slate-950/70 border border-white/10 p-2.5 rounded-xl space-y-1 shadow-inner">
        <div class="flex justify-between items-center text-[10px]">
          <span class="font-bold text-indigo-400">${c.author}</span>
          <span class="text-slate-500 text-[9px]">${c.date}</span>
        </div>
        <p class="text-slate-200 text-[11px]">${c.text}</p>
        ${voicePlayerHTML}
      </div>`;
  });
}

function backToCake() {
  document.getElementById("photoBoardSection").classList.add("hidden");
  document.getElementById("celebrateSection").classList.remove("hidden");
}

function goHome() {
  window.location.href = window.location.pathname;
}

function shareOnWhatsApp() {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  const msgText =
    currentLang === "en"
      ? "Check out the surprise celebration card I created for you! 🎉 "
      : "Sana özel hazırladığım sürpriz kutlama kartına göz at! 🎉 ";
  window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(msgText + url), "_blank");
}

function copyToClipboard() {
  navigator.clipboard.writeText(window.location.href);
  showToast(currentLang === "en" ? "Celebration link copied! 📋" : "Kutlama linki kopyalandı! 📋", "success");
}

function generateRandomMessage() {
  const occasion = document.getElementById("inputOccasion").value || "birthday";

  const messagePool = {
    tr: {
      birthday: [
        "Gülüşünle dünyamı aydınlatan en güzel insan, iyi ki doğdun!",
        "Yeni yaşında tüm hayallerinin ve dileklerinin gerçek olması dileğiyle, iyi ki varsın!",
        "Hayatımın en değerli varlığı, doğum günün kutlu olsun!",
        "Yeni yaşın sana mutluluk, sağlık ve başarı getirsin. İyi ki doğdun!",
        "Her yeni yaşın bir önceki günden daha güzel, daha mutlu geçsin. Doğum günün kutlu olsun!",
        "Dünyaya geldiğin bu özel gün, benim de hayatımın en şanslı günü. İyi ki doğdun sevgilim!",
        "Yıllar geçse de kalbimdeki yerin hep ilk günkü gibi taze kalacak. İyi ki doğdun!",
        "Birlikte nice mutlu, huzurlu ve aşk dolu yaşlara canım benim.",
        "Hayatıma kattığın tüm güzellikler için teşekkür ederim, iyi ki doğdun!",
        "Bugün sadece senin değil, seni çok seven benim de en mutlu günüm. Doğum günün kutlu olsun!",
      ],
      anniversary: [
        "Birlikte geçirdiğimiz her güzel yıl, hayatımın en büyük armağanı. Yıldönümümüz kutlu olsun!",
        "Nice mutlu yıllara sevgilim, iyi ki ellerimiz hiç ayrılmadı.",
        "Seninle geçen her yıl, aşkımızın ne kadar güçlü olduğunu bir kez daha kanıtlıyor.",
        "Birlikte yazdığımız bu hikayenin her satırı için şükrederim. Yıldönümümüz kutlu olsun!",
        "Seninle geçen her gün ilk günkü heyecanı taşıyor. Nice yıllarımıza!",
        "Kalbimin en güzel köşesinde yerin var, iyi ki benimlesin hayat arkadaşım.",
        "Bir yastıkta kocadığımız, sevgi dolu nice yıllarımız olsun.",
        "Aşkımızın her yıl biraz daha büyüdüğünü görmek en büyük mutluluğum.",
        "Seninle ellerimiz hep böyle kenetli kalsın. Yıldönümümüz kutlu olsun!",
        "Hayatımın en doğru kararı seninle yola çıkmak oldu. İyi ki varsın!",
      ],
      valentine: [
        "Kalbimin tek sahibi, Sevgililer Günümüz kutlu olsun!",
        "Seninle geçen her an bir sevgililer günü gibi. Seni çok seviyorum.",
        "Gözlerine baktığımda hayatımın anlamını görüyorum, iyi ki benimlesin.",
        "Dünyanın en şanslı insanıyım çünkü senin gibi bir sevgilim var.",
        "Sevgililer Günümüz kutlu olsun, kalbimin atan en güzel ritmi!",
        "Sen benim hayatıma girene kadar aşkın ne demek olduğunu bilmimişim.",
        "Birlikte attığımız her adımda seni daha çok seviyorum.",
        "Ellerimiz hiç ayrılmasın, kalplerimiz hep birlikte atsin.",
        "Hayatımın en güzel hikayesi seninle yazılıyor. Sevgiler günümüz kutlu olsun!",
        "Varlığınla dünyamı güzelleştiren sevgilim, iyi ki varsın.",
      ],
      newyear: [
        "Yeni yılda da ellerimiz hep birbirine bağlı olsun, mutlu yıllar aşkım!",
        "Yeni yıl bize sağlık, huzur ve sonsuz mutluluk getirsin! İyi ki varsın.",
        "Yeni yılın ilk dakikasında da aklımda ve kalbimde sadece sen varsın. Mutlu yıllar!",
        "Geçen yılı seninle güzelleştirdik, yeni yılda da her anımız masal gibi olsun.",
        "Yeni yılda tüm dileklerin gerçek, yüzün hep güler olsun.",
        "Birlikte karşıladığımız nice mutlu ve huzurlu yıllara!",
        "Yeni yılın en tatlı sürprizi seninle olmak. Mutlu yıllar sevgilim!",
        "Gireceğimiz bu yeni yılda da aşkımız ilk günkü gibi tazecik kalsın.",
        "Hoş geldin yeni yıl, iyi ki hayatımdasın!",
        "Yeni yılın kutlu olsun, yeni yaşantımızda hep omuz omuza olalım.",
      ],
    },
    en: {
      birthday: [
        "To the most wonderful person who lights up my world with your smile, happy birthday!",
        "Wishing that all your dreams and wishes come true in your new age, so glad you exist!",
        "The most precious person in my life, happy birthday!",
        "May your new age bring you happiness, health, and success. Happy birthday!",
        "May each new year of your life be more beautiful and happier than the day before. Happy birthday!",
        "This special day you came into the world is also the luckiest day of my life. Happy birthday, my love!",
        "Even as years pass, your place in my heart will always stay as fresh as the first day. Happy birthday!",
        "To many happy, peaceful, and love-filled years together, my dear.",
        "Thank you for all the beauty you've added to my life, happy birthday!",
        "Today is not just your happiest day, it's also mine as the one who loves you so much. Happy birthday!",
      ],
      anniversary: [
        "Every beautiful year we spend together is the greatest gift of my life. Happy anniversary!",
        "Here's to many happy years my love, so glad our hands never parted.",
        "Every year that passes with you proves once again how strong our love is.",
        "I am grateful for every single line of this story we write together. Happy anniversary!",
        "Every day spent with you carries the excitement of the very first day. To many more years!",
        "You have a place in the most beautiful corner of my heart, so glad you're mine, my life partner.",
        "May we have many love-filled years growing old together.",
        "Seeing our love grow a little more every year is my greatest happiness.",
        "May our hands always stay locked together like this. Happy anniversary!",
        "Setting out on this journey with you was the best decision of my life. So glad you exist!",
      ],
      valentine: [
        "To the sole owner of my heart, happy Valentine's Day!",
        "Every moment spent with you feels like Valentine's Day. I love you so much.",
        "When I look into your eyes, I see the meaning of my life, so glad you are mine.",
        "I am the luckiest person in the world because I have a partner like you.",
        "Happy Valentine's Day, the most beautiful rhythm beating in my heart!",
        "Until you came into my life, I didn't know what love truly meant.",
        "I love you even more with every step we take together.",
        "May our hands never part, and may our hearts always beat as one.",
        "The most beautiful story of my life is being written with you. Happy Valentine's Day!",
        "My love, who makes my world beautiful with your presence, so glad you exist.",
      ],
      newyear: [
        "May our hands always stay intertwined in the new year too, happy new year my love!",
        "May the new year bring us health, peace, and endless happiness! So glad you exist.",
        "Even in the very first minute of the new year, only you are in my mind and heart. Happy new year!",
        "We made the past year beautiful together, may every moment of the new year be like a fairy tale too.",
        "May all your wishes come true and may your face always smile in the new year.",
        "To many happy and peaceful years that we welcome together!",
        "The sweetest surprise of the new year is being with you. Happy new year, my love!",
        "May our love stay as fresh as the first day in this new year we are entering.",
        "Welcome new year, so glad you are in my life!",
        "Happy new year, may we always stand shoulder to shoulder in our new chapter.",
      ],
    },
  };

  const currentPool = messagePool[currentLang] || messagePool.tr;
  const msgs = currentPool[occasion] || currentPool.birthday;
  document.getElementById("inputMessage").value = msgs[Math.floor(Math.random() * msgs.length)];
  showToast(currentLang === "en" ? "✨ Random message added!" : "✨ Rastgele mesaj eklendi!", "success");
}

function showToast(msg, type = "success") {
  const container = document.getElementById("toastContainer");
  container.innerHTML = "";
  const toast = document.createElement("div");
  toast.className = `pointer-events-auto flex items-center space-x-2 px-4 py-3 rounded-2xl border backdrop-blur-xl text-xs font-semibold toast-animate ${type === "error" ? "bg-rose-600/95 border-rose-500 text-white" : "bg-slate-900/95 border-slate-700 text-slate-100"}`;
  toast.innerHTML = `<i class="fa-solid ${type === "error" ? "fa-circle-exclamation" : "fa-circle-check text-emerald-400"}"></i><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

async function downloadQRCode(event) {
  event.preventDefault();
  const qrImgSrc = document.getElementById("qrImage").src;
  try {
    const response = await fetch(qrImgSrc);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "kutlama-qr.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
    showToast(currentLang === "en" ? "QR code downloaded successfully! 📥" : "QR kod başarıyla indirildi! 📥", "success");
  } catch (err) {
    window.open(qrImgSrc, "_blank");
  }
}

function openSupportModal() {
  const modal = document.getElementById("supportModal");
  const contentContainer = document.getElementById("supportContentContainer");

  const createSec = document.getElementById("createSection");
  const celebrateSec = document.getElementById("celebrateSection");
  const photoBoardSec = document.getElementById("photoBoardSection");

  let htmlContent = "";

  if (createSec && !createSec.classList.contains("hidden")) {
    htmlContent = `
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">1.</div>
              <div><b>Özel Durumu Seçin:</b> Doğum günü, yıldönümü, sevgililer günü veya yılbaşı temalarından birini seçin.</div>
            </div>
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">2.</div>
              <div><b>Parola Oluşturma:</b> Kartınızın güvenliği için kişiye özel 4 haneli bir şifre (PIN) belirleyin.</div>
            </div>
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">3.</div>
              <div><b>Bilgiler ve Mesaj:</b> Kimden, kimin için olduğunu yazın ve sevgi mesajınızı ekleyin (dilerseniz '✨ Rastgele' butonunu kullanabilirsiniz).</div>
            </div>
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">4.</div>
              <div><b>Medya Dosyaları:</b> En fazla 4 fotoğraf ve isteğe bağlı özel arka plan müzik dosyası (.mp3 / .wav) yükleyin.</div>
            </div>
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">5.</div>
              <div><b>Oluştur & Paylaş:</b> Kutlama linkinizi ve QR kodunuzu oluşturarak sevdiklerinizle paylaşın.</div>
            </div>
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">6.</div>
              <div><b>Yardım Talebi:</b> Yardım butonuna basarak oradaki formu doldurup şifre unutma, görüş, öneri vb. konular için destek talebinde bulunabilirsiniz. 7/24 Destek Sağlanmaktadır.</div>
            </div>
            
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">7.</div>
              <div><b>Link kullanımı:</b> <div class="space-y-2 text-xs text-slate-300">
            </div>
             <div class="flex items-start space-x-2"><div class="text-indigo-400 font-bold flex-shrink-0">🔒</div><div><b>Tamamen Gizli & Güvenli:</b> Sadece belirlediğiniz şifreyi bilen kişiler görebilir; dışarıdan kimse erişemez.</div></div>
  <div class="flex items-start space-x-2"><div class="text-indigo-400 font-bold flex-shrink-0">♾️</div><div><b>Ömür Boyu Saklama:</b> Siz silinmesini talep etmediğiniz sürece kutlamanız sistemizde güvenle kalır.</div></div>
  <div class="flex items-start space-x-2"><div class="text-indigo-400 font-bold flex-shrink-0">🔗</div><div><b>Kalıcı Erişim:</b> Paylaştığınız linki ve QR kodu kaybetmediğiniz sürece hatıralarınıza dilediğiniz zaman ulaşabilirsiniz.</div></div>
</div></div>
          `;
  }
  // 2. Kutlama / Pasta Söndürme Ekranı
  else if (celebrateSec && !celebrateSec.classList.contains("hidden")) {
    htmlContent = `
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">1.</div>
              <div><b>Mumu Söndürün:</b> Ekrandaki mumu söndürmek için tıklayın, sürpriz mesajınızı görün ve kutlama konfetilerini patlatın!</div>
            </div>
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">2.</div>
              <div><b>Arka Plan Müziği:</b> Sağ üst köşedeki müzik butonu aracılığıyla özel müziği açıp kapatabilirsiniz.</div>
            </div>
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">3.</div>
              <div><b>Paylaşım Seçenekleri:</b> WhatsApp üzerinden doğrudan gönderebilir veya bağlantıyı kopyalayabilirsiniz.</div>
            </div>
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">4.</div>
              <div><b>Anı Defteri:</b> Mumu söndürdükten sonra aktif olan "Anılarım" butonuna basarak fotoğraf albümüne ve dileklere ulaşabilirsiniz.</div>
              
            </div>
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">5.</div>
              <div><b>Yardım Talebi:</b> Yardım butonuna basarak oradaki formu doldurup şifre unutma, görüş, öneri vb. konular için destek talebinde bulunabilirsiniz. 7/24 Destek Sağlanmaktadır.</div>
              
            </div>
          `;
  }
  // 3. Fotoğraf Panosu / Anı Defteri & Sesli Not Ekranı
  else if (photoBoardSec && !photoBoardSec.classList.contains("hidden")) {
    htmlContent = `
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">1.</div>
              <div><b>Anı Albümü:</b> Yüklenen fotoğrafları incelemek için üzerlerine tıklayarak tam ekran görüntüleyebilir ve ok tuşlarıyla gezinebilirsiniz.</div>
            </div>
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">2.</div>
              <div><b>Anı Defteri & Dilekler:</b> Adınızı ve kutlama mesajınızı yazarak anı defterine kolayca yazılı not bırakabilirsiniz.</div>
            </div>
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">3.</div>
              <div><b>Sesli Mesaj Bırakma:</b> "Kayıt Başlat" butonuna basarak 10 saniyeye kadar sesli mesaj kaydedebilir, önizleyebilir ve anı defterine gönderebilirsiniz. Gönderilen Notlar <b>Silinemez.</b></div>
            </div>
            <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">4.</div>
              <div><b>Sesli Notları Dinleme:</b> Bırakılan sesli notların üzerindeki oynat tuşuna basarak ses kayıtlarını dinleyebilir, ses seviyesini dilediğiniz gibi ayarlayabilirsiniz.</div>
            </div>
             <div class="flex items-start space-x-2">
              <div class="text-indigo-400 font-bold flex-shrink-0">5.</div>
              <div><b>Yardım Talebi:</b> Yardım butonuna basarak oradaki formu doldurup şifre unutma, görüş, öneri vb. konular için destek talebinde bulunabilirsiniz. 7/24 Destek Sağlanmaktadır.</div>
              
            </div>
          `;
  }

  contentContainer.innerHTML = htmlContent;
  modal.classList.remove("hidden");
}

function closeSupportModal() {
  const modal = document.getElementById("supportModal");
  if (modal) modal.classList.add("hidden");
}

window.addEventListener("online", () => showNetStatus("online"));
window.addEventListener("offline", () => showNetStatus("offline"));

async function checkConnectionQuality() {
  if (!navigator.onLine) {
    showNetStatus("offline");
    return;
  }

  try {
    const startTime = performance.now();
    await fetch(window.location.origin + "/favicon.ico?" + Date.now(), { method: "HEAD", cache: "no-store" });
    const duration = performance.now() - startTime;

    if (duration > 1500) {
      showNetStatus("weak");
    } else {
      hideNetStatus();
    }
  } catch (err) {
    showNetStatus("weak");
  }
}

let wasMusicPlayingBeforeDisconnect = false;

window.addEventListener("online", () => {
  showNetStatus("online");
});

window.addEventListener("offline", () => {
  wasMusicPlayingBeforeDisconnect = isMusicPlaying;
  pauseBackgroundMusic();
  showNetStatus("offline");
});

function showNetStatus(status) {
  const modal = document.getElementById("netStatusModal");
  const spinner = document.getElementById("netSpinner");
  const icon = document.getElementById("netIcon");
  const title = document.getElementById("netTitle");
  const desc = document.getElementById("netDesc");

  if (!modal) return;
  modal.classList.remove("hidden");

  if (status === "offline") {
    wasMusicPlayingBeforeDisconnect = wasMusicPlayingBeforeDisconnect || isMusicPlaying;
    pauseBackgroundMusic();
    if (spinner) spinner.classList.add("hidden");
    if (icon) {
      icon.classList.remove("hidden");
      icon.innerHTML = "❌";
      icon.className =
        "w-14 h-14 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-2xl flex items-center justify-center text-2xl mx-auto";
    }
    if (title) title.innerText = currentLang === "en" ? "Internet Connection Lost" : "İnternet Bağlantısı Koptu";
    if (desc) desc.innerText = currentLang === "en" ? "Please check your network." : "Lütfen modemini veya kablosuz ağını kontrol et.";
  } else if (status === "weak") {
    wasMusicPlayingBeforeDisconnect = wasMusicPlayingBeforeDisconnect || isMusicPlaying;
    pauseBackgroundMusic();

    if (spinner) spinner.classList.remove("hidden");
    if (icon) icon.classList.add("hidden");
    if (title) title.innerText = currentLang === "en" ? "Connecting..." : "Bağlantı Kuruluyor!";
    if (desc) desc.innerText = currentLang === "en" ? "Please wait a moment.." : "Lütfen Kısa Bir Süre Bekleyin..";
  } else if (status === "online") {
    if (spinner) spinner.classList.add("hidden");
    if (icon) {
      icon.classList.remove("hidden");
      icon.innerHTML = "✨";
      icon.className =
        "w-14 h-14 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-2xl mx-auto";
    }
    if (title) title.innerText = currentLang === "en" ? "Connection Restored!" : "Bağlantı Yeniden Sağlandı!";
    if (desc) desc.innerText = currentLang === "en" ? "All good, you can continue." : "Her şey yolunda, kaldığın yerden devam edebilirsin.";

    // Eğer bağlantı kopmadan önce müzik çalıyorsa
    if (wasMusicPlayingBeforeDisconnect) {
      const customAudio = document.getElementById("customAudio");
      const bgAudio = document.getElementById("bgAudio");
      const hasCustom = customAudio && customAudio.src && customAudio.src !== window.location.href;
      const activeAudio = hasCustom ? customAudio : bgAudio;

      if (activeAudio) {
        // 1. Önce doğrudan çalmayı dene (bazı tarayıcılar izin verebilir)
        activeAudio
          .play()
          .then(() => {
            const musicIcon = document.getElementById("musicIcon");
            if (musicIcon) musicIcon.className = "fa-solid fa-volume-high text-emerald-400";
            isMusicPlaying = true;
            wasMusicPlayingBeforeDisconnect = false;
          })
          .catch(() => {
            // 2. Tarayıcı engellerse (Autoplay kısıtı), kullanıcının ekrana ilk dokunuşunda müziği başlat
            if (!resumeListenerAdded) {
              resumeListenerAdded = true;
              const handleFirstInteraction = () => {
                resumeMusicIfNeeded();
                wasMusicPlayingBeforeDisconnect = false;
                resumeListenerAdded = false;
                document.removeEventListener("click", handleFirstInteraction);
                document.removeEventListener("touchstart", handleFirstInteraction);
              };
              document.addEventListener("click", handleFirstInteraction, { once: true });
              document.addEventListener("touchstart", handleFirstInteraction, { once: true });
            }
          });
      }
    }

    setTimeout(() => hideNetStatus(), 2500);
  }
}

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let currentParticleTheme = "birthday";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor(theme) {
    this.theme = theme;
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.opacity = Math.random() * 0.6 + 0.2;

    if (this.theme === "newyear") {
      this.y = Math.random() * canvas.height;
      this.speedY = Math.random() * 1.2 + 0.4;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.size = Math.random() * 3.5 + 1.5;
    } else if (this.theme === "valentine" || this.theme === "anniversary") {
      this.y = canvas.height + 20;
      this.speedY = -(Math.random() * 1.2 + 0.5);
      this.speedX = Math.random() * 0.8 - 0.4;
      this.size = Math.random() * 10 + 8;
    } else {
      this.speedY = Math.random() * 0.8 - 0.4;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.size = Math.random() * 3 + 1;
    }
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    if (this.theme === "newyear") {
      if (this.y > canvas.height) {
        this.y = -10;
        this.x = Math.random() * canvas.width;
      }
    } else if (this.theme === "valentine" || this.theme === "anniversary") {
      if (this.y < -20) {
        this.y = canvas.height + 20;
        this.x = Math.random() * canvas.width;
      }
    } else {
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
    }
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    if (this.theme === "newyear") {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.theme === "valentine" || this.theme === "anniversary") {
      ctx.font = `${this.size}px sans-serif`;
      ctx.fillText(this.theme === "valentine" ? "❤️" : "💖", this.x, this.y);
    } else {
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function initParticles(theme) {
  currentParticleTheme = theme;
  particles = [];
  const count = theme === "newyear" ? 50 : 35;
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(theme));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles("birthday");
animateParticles();

let mediaRecorder;
let audioChunks = [];
let recordedAudioBlob = null;
let recordTimerInterval = null;
let countdownSeconds = 10;
let isRecording = false;

async function toggleVoiceRecording() {
  if (!isRecording) {
    try {
      // --- Kayıt Başlarken Müziği Durdur ---
      pauseBackgroundMusic();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // ... (Geri kalan kayıt kodları)
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        recordedAudioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(recordedAudioBlob);
        const previewEl = document.getElementById("audioPreviewEl");
        previewEl.src = audioUrl;
        document.getElementById("audioPreviewContainer").classList.remove("hidden");

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      isRecording = true;
      countdownSeconds = 10;

      document.getElementById("recordIcon").className = "fa-solid fa-stop text-rose-400";
      document.getElementById("recordBtnText").innerText = currentLang === "en" ? "Stop Recording" : "Kaydı Durdur";
      document.getElementById("recordBtn").classList.replace("bg-indigo-600/80", "bg-rose-600/80");

      const timerEl = document.getElementById("recordTimer");
      timerEl.classList.remove("hidden");
      timerEl.innerText = `00:10`;

      recordTimerInterval = setInterval(() => {
        countdownSeconds--;
        if (countdownSeconds < 10 && countdownSeconds >= 0) {
          timerEl.innerText = `00:0${countdownSeconds}`;
        }
        if (countdownSeconds <= 0) {
          stopVoiceRecording();
        }
      }, 1000);
    } catch (err) {
      showToast(currentLang === "en" ? "Microphone permission denied or unsupported." : "Mikrofon izni alınamadı veya desteklenmiyor.", "error");
    }
  } else {
    stopVoiceRecording();
  }
}

function stopVoiceRecording() {
  if (mediaRecorder && isRecording) {
    mediaRecorder.stop();
    isRecording = false;
    clearInterval(recordTimerInterval);

    document.getElementById("recordIcon").className = "fa-solid fa-microphone";
    document.getElementById("recordBtnText").innerText = currentLang === "en" ? "Re-record" : "Yeniden Kaydet";
    document.getElementById("recordBtn").classList.replace("bg-rose-600/80", "bg-indigo-600/80");
    document.getElementById("recordTimer").classList.add("hidden");
  }
  resumeMusicIfNeeded();
}

function cancelVoiceRecording() {
  recordedAudioBlob = null;
  document.getElementById("audioPreviewContainer").classList.add("hidden");
  document.getElementById("audioPreviewEl").src = "";
  document.getElementById("recordBtnText").innerText = translations[currentLang].recordBtnText;
}

let voiceConfirmCallback = null;

function promptVoiceConfirmation() {
  return new Promise((resolve) => {
    document.getElementById("voiceConfirmModal").classList.remove("hidden");
    voiceConfirmCallback = resolve;
  });
}

function closeVoiceConfirm(isConfirmed) {
  document.getElementById("voiceConfirmModal").classList.add("hidden");
  if (voiceConfirmCallback) {
    voiceConfirmCallback(isConfirmed);
    voiceConfirmCallback = null;
  }
}

async function submitComment() {
  const authorInput = document.getElementById("inputCommentAuthor");
  const textInput = document.getElementById("inputCommentText");
  const submitBtn = document.getElementById("commentSubmitBtn");

  if (!authorInput || !textInput) return;

  const author = authorInput.value;
  const text = textInput.value;

  if (!author.trim()) {
    return showToast(currentLang === "en" ? "Please enter your name!" : "Lütfen adınızı girin!", "error");
  }

  if (!text.trim() && !recordedAudioBlob) {
    return showToast(
      currentLang === "en" ? "Please write a note or add a voice recording." : "Lütfen bir not yazın veya sesli kayıt ekleyin.",
      "error",
    );
  }

  if (recordedAudioBlob) {
    const confirmed = await promptVoiceConfirmation();
    if (!confirmed) return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    const addingText = currentLang === "en" ? "Adding..." : "Ekleniyor...";
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> ${addingText}`;
  }
  showToast(currentLang === "en" ? "Adding your note, please wait..." : "Notunuz ekleniyor, lütfen bekleyin...", "success");

  const formData = new FormData();
  formData.append("author", author);
  formData.append("text", text);
  if (recordedAudioBlob) {
    formData.append("voiceNote", recordedAudioBlob, "voice_note.webm");
  }

  try {
    const res = await fetch(`/api/card/${currentCardId}/comment`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = translations[currentLang].sendBtn;
    }

    if (data.success) {
      if (!cardData.comments) cardData.comments = [];
      cardData.comments.unshift(data.comment);

      authorInput.value = "";
      textInput.value = "";
      cancelVoiceRecording();

      renderComments();
      showToast(currentLang === "en" ? "Your note and voice recording have been added! ✍️🎤" : "Notunuz ve ses kaydınız eklendi! ✍️🎤", "success");
    } else {
      showToast(data.error || (currentLang === "en" ? "Failed to send note." : "Not gönderilemedi."), "error");
    }
  } catch (e) {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = translations[currentLang].sendBtn;
    }
    showToast(currentLang === "en" ? "Connection error, note could not be sent." : "Bağlantı hatası, not gönderilemedi.", "error");
  }
}

let currentPlayingIndex = null;
let activeAnimationId = null;

function toggleVoicePlay(url, index) {
  const audioEl = document.getElementById(`audioElement_${index}`);
  const playIcon = document.getElementById(`playIcon_${index}`);

  if (!audioEl) return;

  if (currentPlayingIndex === index && !audioEl.paused) {
    audioEl.pause();
    playIcon.className = "fa-solid fa-play";
    stopSmoothProgress();

    if (wasMusicPlayingBeforeAudio) {
      resumeMusicIfNeeded();
      wasMusicPlayingBeforeAudio = false;
    }

    currentPlayingIndex = null;
    return;
  }

  // Ses çalmaya başlamadan önceki müzik durumunu kaydet
  wasMusicPlayingBeforeAudio = isMusicPlaying;
  if (isMusicPlaying) {
    pauseBackgroundMusic();
  }

  if (currentPlayingIndex !== null && currentPlayingIndex !== index) {
    const prevAudio = document.getElementById(`audioElement_${currentPlayingIndex}`);
    const prevIcon = document.getElementById(`playIcon_${currentPlayingIndex}`);
    if (prevAudio) prevAudio.pause();
    if (prevIcon) prevIcon.className = "fa-solid fa-play";
  }

  audioEl
    .play()
    .then(() => {
      playIcon.className = "fa-solid fa-pause";
      currentPlayingIndex = index;
      startSmoothProgress(index);
    })
    .catch((err) => console.error("Ses oynatılamadı:", err));
}

function audioEnded(index) {
  stopSmoothProgress();
  const playIcon = document.getElementById(`playIcon_${index}`);
  if (playIcon) playIcon.className = "fa-solid fa-play";

  const currentTimeEl = document.getElementById(`currentTime_${index}`);
  const progressBar = document.getElementById(`progressBar_${index}`);
  if (currentTimeEl) currentTimeEl.innerText = "0:00";
  if (progressBar) progressBar.style.width = "0%";

  // Ses çalması bittiğinde, önceki müzik durumuna göre müziği devam ettir
  if (wasMusicPlayingBeforeAudio) {
    resumeMusicIfNeeded();
    wasMusicPlayingBeforeAudio = false;
  }
  currentPlayingIndex = null;
}

function initAudioMeta(index) {
  const audioEl = document.getElementById(`audioElement_${index}`);
  const durationEl = document.getElementById(`durationTime_${index}`);
  if (audioEl && durationEl) {
    durationEl.innerText = formatTime(audioEl.duration);
  }
}

function startSmoothProgress(index) {
  cancelAnimationFrame(activeAnimationId);
  const audioEl = document.getElementById(`audioElement_${index}`);
  const currentTimeEl = document.getElementById(`currentTime_${index}`);
  const progressBar = document.getElementById(`progressBar_${index}`);

  function updateFrame() {
    if (!audioEl || audioEl.paused) return;

    if (currentTimeEl) currentTimeEl.innerText = formatTime(audioEl.currentTime);
    if (progressBar && audioEl.duration) {
      const percent = (audioEl.currentTime / audioEl.duration) * 100;
      progressBar.style.width = `${percent}%`;
    }

    activeAnimationId = requestAnimationFrame(updateFrame);
  }

  activeAnimationId = requestAnimationFrame(updateFrame);
}

function stopSmoothProgress() {
  cancelAnimationFrame(activeAnimationId);
}

function audioEnded(index) {
  stopSmoothProgress();
  const playIcon = document.getElementById(`playIcon_${index}`);
  if (playIcon) playIcon.className = "fa-solid fa-play";

  const currentTimeEl = document.getElementById(`currentTime_${index}`);
  const progressBar = document.getElementById(`progressBar_${index}`);
  if (currentTimeEl) currentTimeEl.innerText = "0:00";
  if (progressBar) progressBar.style.width = "0%";
}

function seekAudio(event, index) {
  const audioEl = document.getElementById(`audioElement_${index}`);
  if (!audioEl || !audioEl.duration) return;

  const barRect = event.currentTarget.getBoundingClientRect();
  const clickPosition = Math.max(0, Math.min(1, (event.clientX - barRect.left) / barRect.width));

  audioEl.currentTime = clickPosition * audioEl.duration;

  const progressBar = document.getElementById(`progressBar_${index}`);
  const currentTimeEl = document.getElementById(`currentTime_${index}`);
  if (progressBar) progressBar.style.width = `${clickPosition * 100}%`;
  if (currentTimeEl) currentTimeEl.innerText = formatTime(audioEl.currentTime);
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function toggleVolumePopup(index) {
  const popup = document.getElementById(`volumePopup_${index}`);
  document.querySelectorAll("[id^='volumePopup_']").forEach((el, idx) => {
    if (idx !== index) el.classList.add("hidden");
  });
  popup.classList.toggle("hidden");
}

function changeAudioVolume(volumeValue, index) {
  const audioEl = document.getElementById(`audioElement_${index}`);
  const volIcon = document.getElementById(`volIcon_${index}`);

  if (audioEl) {
    audioEl.volume = volumeValue;
    if (volumeValue == 0) {
      volIcon.className = "fa-solid fa-volume-xmark text-rose-400";
    } else if (volumeValue < 0.5) {
      volIcon.className = "fa-solid fa-volume-low text-slate-300";
    } else {
      volIcon.className = "fa-solid fa-volume-high text-slate-300";
    }
  }
}

document.addEventListener("click", function (e) {
  if (!e.target.closest("[id^='volumePopup_']") && !e.target.closest("button[onclick*='toggleVolumePopup']")) {
    document.querySelectorAll("[id^='volumePopup_']").forEach((el) => {
      el.classList.add("hidden");
    });
  }
});
let wasMusicPlayingBeforeVoice = false;
let previewAnimationId = null;
let wasMusicPlayingBeforePreview = false;

function togglePreviewAudio() {
  const audioEl = document.getElementById("audioPreviewEl");
  const playIcon = document.getElementById("previewPlayIcon");

  if (audioEl.paused) {
    // Ses çalmadan hemen önce arka plan müziğinin o anki durumunu hafızaya al ve müziği durdur
    wasMusicPlayingBeforePreview = isMusicPlaying;
    if (isMusicPlaying) {
      pauseBackgroundMusic();
    }

    audioEl.play();
    playIcon.className = "fa-solid fa-pause";
    startPreviewSmoothProgress();
  } else {
    audioEl.pause();
    playIcon.className = "fa-solid fa-play";
    cancelAnimationFrame(previewAnimationId);

    // Önizleme durdurulduğunda, eğer önceden müzik çalıyorsa geri aç
    if (wasMusicPlayingBeforePreview) {
      resumeMusicIfNeeded();
      wasMusicPlayingBeforePreview = false;
    }
  }
}

function initPreviewMeta() {
  const audioEl = document.getElementById("audioPreviewEl");
  const durationEl = document.getElementById("previewDurationTime");
  if (audioEl && durationEl) {
    durationEl.innerText = formatTime(audioEl.duration);
  }
}

function startPreviewSmoothProgress() {
  cancelAnimationFrame(previewAnimationId);
  const audioEl = document.getElementById("audioPreviewEl");
  const currentTimeEl = document.getElementById("previewCurrentTime");
  const progressBar = document.getElementById("previewProgressBar");

  function updateFrame() {
    if (!audioEl || audioEl.paused) return;
    if (currentTimeEl) currentTimeEl.innerText = formatTime(audioEl.currentTime);
    if (progressBar && audioEl.duration) {
      const percent = (audioEl.currentTime / audioEl.duration) * 100;
      progressBar.style.width = `${percent}%`;
    }
    previewAnimationId = requestAnimationFrame(updateFrame);
  }
  previewAnimationId = requestAnimationFrame(updateFrame);
}

function previewAudioEnded() {
  cancelAnimationFrame(previewAnimationId);
  document.getElementById("previewPlayIcon").className = "fa-solid fa-play";
  document.getElementById("previewCurrentTime").innerText = "0:00";
  document.getElementById("previewProgressBar").style.width = "0%";

  // Ses bittiyse ve önceden müzik açıksa müziği tekrar başlat
  if (wasMusicPlayingBeforePreview) {
    resumeMusicIfNeeded();
    wasMusicPlayingBeforePreview = false;
  }
}

function seekPreviewAudio(event) {
  const audioEl = document.getElementById("audioPreviewEl");
  if (!audioEl || !audioEl.duration) return;
  const barRect = event.currentTarget.getBoundingClientRect();
  const clickPosition = Math.max(0, Math.min(1, (event.clientX - barRect.left) / barRect.width));
  audioEl.currentTime = clickPosition * audioEl.duration;

  document.getElementById("previewProgressBar").style.width = `${clickPosition * 100}%`;
  document.getElementById("previewCurrentTime").innerText = formatTime(audioEl.currentTime);
}

function togglePreviewVolumePopup() {
  const popup = document.getElementById("previewVolumePopup");
  popup.classList.toggle("hidden");
}

function changePreviewVolume(val) {
  const audioEl = document.getElementById("audioPreviewEl");
  const volIcon = document.getElementById("previewVolIcon");
  if (audioEl) {
    audioEl.volume = val;
    if (val == 0) volIcon.className = "fa-solid fa-volume-xmark text-rose-400";
    else if (val < 0.5) volIcon.className = "fa-solid fa-volume-low text-slate-300";
    else volIcon.className = "fa-solid fa-volume-high text-slate-300";
  }
}

function hideNetStatus() {
  const modal = document.getElementById("netStatusModal");
  modal.classList.add("hidden");
}

setInterval(checkConnectionQuality, 8000);

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  return false;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "F12" || e.keyCode === 123) {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.keyCode === 73)) {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j" || e.keyCode === 74)) {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c" || e.keyCode === 67)) {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && (e.key === "U" || e.key === "u" || e.keyCode === 85)) {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && (e.key === "S" || e.key === "s" || e.keyCode === 83)) {
    e.preventDefault();
    return false;
  }
}); // Arka plan müziği çalıyorsa durduran yardımcı fonksiyon
function pauseBackgroundMusic() {
  const customAudio = document.getElementById("customAudio");
  const bgAudio = document.getElementById("bgAudio");
  const icon = document.getElementById("musicIcon");

  if (isMusicPlaying) {
    customAudio.pause();
    bgAudio.pause();
    if (icon) icon.className = "fa-solid fa-music";
    isMusicPlaying = false;
  }
}
// Arka plan müziğini durdurulan yerden veya yeniden oynatan fonksiyon
function resumeMusicIfNeeded() {
  const customAudio = document.getElementById("customAudio");
  const bgAudio = document.getElementById("bgAudio");
  const icon = document.getElementById("musicIcon");

  const hasCustom = customAudio.src && customAudio.src !== window.location.href;
  const activeAudio = hasCustom ? customAudio : bgAudio;

  // Eğer kullanıcı daha önceden müzik çalmayı aktif bıraktıysa veya otomatik başlatmak istiyorsanız:
  activeAudio
    .play()
    .then(() => {
      if (icon) icon.className = "fa-solid fa-volume-high text-emerald-400";
      isMusicPlaying = true;
    })
    .catch(() => {
      // Tarayıcı politikaları (autoplay engeli) nedeniyle hata alabilir
      if (icon) icon.className = "fa-solid fa-music";
      isMusicPlaying = false;
    });
}
