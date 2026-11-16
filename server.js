const path = require("path");
const express = require("express");
const multer = require("multer");
const QRCode = require("qrcode");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { Pool } = require("pg");

// 1. Cloudinary Yapılandırması
cloudinary.config({
  cloud_name: "rlflrxht",
  api_key: "727421665691293",
  api_secret: "BZ85bW9hpBvD02iLMlzNXSYsnQ8",
});

const pool = new Pool({
  connectionString: "postgresql://postgres.yylorsbmcmrenqrzcyzz:Marzali38**@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres",
  ssl: { rejectUnauthorized: false },
});

// Tabloyu ve eksik sütunları otomatik oluştur / güncelle
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cards (
        id VARCHAR(255) PRIMARY KEY,
        occasion VARCHAR(100),
        name VARCHAR(255),
        message TEXT,
        sender VARCHAR(255),
        birthYear VARCHAR(50),
        passCode VARCHAR(100),
        bgMusic VARCHAR(100),
        photos TEXT[],
        audioUrl TEXT,
        qrCode TEXT,
        candleBlown BOOLEAN DEFAULT FALSE,
        comments JSONB DEFAULT '[]'::jsonb,
        view_count INT DEFAULT 0, -- YENİ: Görüntülenme Sayacı Sütunu
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tablo daha önceden varsa sütunların eksik olma ihtimaline karşı ekleyelim:
    await pool.query(`
      ALTER TABLE cards ADD COLUMN IF NOT EXISTS audioUrl TEXT;
      ALTER TABLE cards ADD COLUMN IF NOT EXISTS view_count INT DEFAULT 0;
    `);

    console.log("Supabase Veritabanı ve Tablo Kontrolü Başarılı ✓");
  } catch (err) {
    console.error("Veritabanı tablo oluşturma hatası:", err.message);
  }
}
initDB();

// Multer için Cloudinary Depolama Alanı (Hem fotoğraf hem ses formatları için)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName = "celebration_studio";
    let resourceType = "auto";

    // Ses dosyaları veya sesli notlar için resource_type kesinlikle "video" olmalıdır
    if (file.fieldname === "audio" || file.fieldname === "voiceNote") {
      resourceType = "video";
    }

    return {
      folder: folderName,
      resource_type: resourceType,
      // Video/Ses dosyaları için webm ve diğer formatlara izin veriyoruz
      allowed_formats: resourceType === "video" ? ["mp3", "wav", "m4a", "aac", "webm", "ogg"] : ["jpg", "png", "jpeg", "webp"],
    };
  },
});

const upload = multer({ storage: storage });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Multer Çoklu Alan (Fields) Yapılandırması (Fotoğraflar ve Ses Dosyası için)
const cpUpload = upload.fields([
  { name: "photos", maxCount: 4 },
  { name: "audio", maxCount: 1 },
]);

// 1. Yeni Kart Oluşturma (Supabase + Cloudinary)
app.post("/api/create", cpUpload, async (req, res) => {
  try {
    const { occasion, name, message, sender, birthYear, passCode, bgMusic } = req.body;

    if (!passCode || !passCode.trim()) {
      return res.status(400).json({ success: false, error: "Lütfen bir güvenlik şifresi (PIN) belirleyin." });
    }

    const photos = req.files && req.files["photos"] ? req.files["photos"].map((f) => f.path) : [];
    const audioFile = req.files && req.files["audio"] && req.files["audio"][0] ? req.files["audio"][0].path : null;

    const cardId = Date.now().toString(36) + Math.random().toString(36).substring(2);

    const fullUrl = `${req.protocol}://${req.get("host")}?id=${cardId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(fullUrl);

    await pool.query(
      `INSERT INTO cards (id, occasion, name, message, sender, birthYear, passCode, bgMusic, photos, audioUrl, qrCode, candleBlown, comments) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        cardId,
        occasion || "birthday",
        name || "",
        message || "",
        sender || "",
        birthYear || "",
        passCode.trim(),
        bgMusic || "happy",
        photos,
        audioFile,
        qrCodeDataUrl,
        false,
        JSON.stringify([]),
      ],
    );

    res.json({ success: true, cardId });
  } catch (err) {
    console.error("Kart oluşturma hatası:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Kart Detayı Getirme (Şifre Kontrolü ile)
app.post("/api/card/:id", async (req, res) => {
  try {
    const { passCode } = req.body;
    const result = await pool.query("SELECT * FROM cards WHERE id = $1", [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Kutlama bulunamadı" });
    }

    const card = result.rows[0];

    if (card.passcode && card.passcode !== passCode) {
      return res.json({ success: false, isLocked: true, error: "Yanlış Şifre!" });
    }

    res.json({ success: true, isLocked: false, card });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Mumu Üfle
app.post("/api/card/:id/blow", async (req, res) => {
  try {
    const result = await pool.query("UPDATE cards SET candleBlown = TRUE WHERE id = $1 RETURNING *", [req.params.id]);
    if (result.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, error: "Kutlama bulunamadı" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Ziyaretçi Defterine Not Ekleme
// 4. Ziyaretçi Defterine Not veya Sesli Not Ekleme (Multer ile Cloudinary'ye ses yükleme destekli)
app.post("/api/card/:id/comment", upload.single("voiceNote"), async (req, res) => {
  try {
    const { author, text } = req.body;
    const cardId = req.params.id;

    // Cloudinary'ye yüklenen ses dosyasının URL'si (varsa)
    const voiceUrl = req.file ? req.file.path : null;

    if (!text && !voiceUrl) {
      return res.status(400).json({ success: false, error: "Not veya ses kaydı boş olamaz." });
    }

    const result = await pool.query("SELECT comments FROM cards WHERE id = $1", [cardId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Kutlama bulunamadı" });
    }

    const newComment = {
      id: Date.now().toString(36),
      author: author && author.trim() ? author.trim() : "İsimsiz Dost",
      text: text ? text.trim() : "🎤 Sesli Mesaj",
      voiceUrl: voiceUrl || null,
      date: new Date().toLocaleDateString("tr-TR"),
    };

    let comments = result.rows.length > 0 && result.rows[0].comments ? result.rows[0].comments : [];
    comments.unshift(newComment);

    await pool.query("UPDATE cards SET comments = $1 WHERE id = $2", [JSON.stringify(comments), cardId]);

    res.json({ success: true, comment: newComment });
  } catch (err) {
    console.error("Not ekleme hatası:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Gelişmiş Sunucu çalışıyor: http://localhost:${PORT}`);
});
