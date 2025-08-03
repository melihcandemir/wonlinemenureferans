# 🌐 Wonline Menu Referans Sistemi

> Modern ve kullanıcı dostu referans yönetim sistemi

## 📖 Proje Hakkında

Wonline Menu Referans Sistemi, web sitesi referanslarını yönetmek için geliştirilmiş modern bir web uygulamasıdır. Bu sistem, admin kullanıcıların referansları ekleyip düzenleyebileceği ve genel kullanıcıların bu referansları görüntüleyebileceği iki ayrı arayüz sunar.

## 🔗 Proje Linkler

### 🌐 Canlı Site

**Ana Sayfa (Public):** https://melihcandemir.github.io/wonlinemenureferans/

**Admin Paneli:** https://melihcandemir.github.io/wonlinemenureferans/#/admin/login

### 💻 Geliştirme

**GitHub Repository:** https://github.com/melihcandemir/wonlinemenureferans

**Supabase Dashboard:** [Proje sahibi erişimi]

## ✨ Özellikler

### 🏠 Ana Sayfa (Public)

- 📋 Tüm referansların listelendiği public görünüm
- 🔄 Otomatik 5 dakikada bir güncelleme
- 📅 En son güncellenen referanslar başta
- ⬆️ Sayfa başına çıkma butonu
- 📱 Responsive tasarım

### 🔐 Admin Paneli

- 🔑 Güvenli kullanıcı doğrulama (Supabase Auth)
- ➕ Yeni referans ekleme
- ✏️ Mevcut referansları düzenleme
- 🗑️ Referans silme (onay ile)
- ✅ Form validasyonu (boş değer kontrolü)
- 📊 Dashboard ile toplam referans sayısı
- 🔗 Ana sayfaya hızlı erişim (logo tıklama)

### 🎨 Kullanıcı Deneyimi

- 🎯 Modern ve temiz tasarım
- ⚡ Hızlı yükleme süreleri
- 🔔 Başarı/hata mesajları
- 🖱️ Kullanıcı dostu arayüz
- 📱 Mobil uyumlu

## 🛠️ Teknolojiler

### Frontend

- **React 19** - Modern UI kütüphanesi
- **React Router DOM** - SPA yönlendirme
- **TailwindCSS v4** - Utility-first CSS framework
- **Vite** - Modern build tool

### Backend & Database

- **Supabase** - Backend-as-a-Service
  - 🗄️ PostgreSQL database
  - 🔐 Authentication
  - 🚀 Real-time subscriptions
  - 📡 RESTful API

### Deployment

- **GitHub Pages** - Static hosting
- **GitHub Actions** - CI/CD pipeline
- **HashRouter** - SPA routing için GitHub Pages uyumluluğu

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Supabase hesabı

## 📁 Proje Yapısı

```
wonlinemenureferans/
├── 📁 public/              # Static dosyalar
│   ├── 🖼️ wonline2023.png  # Logo
│   ├── 📄 404.html         # SPA 404 handler
│   └── 📄 _redirects       # Netlify redirects
├── 📁 src/
│   ├── 📁 assets/          # Görseller ve statik varlıklar
│   ├── 📁 components/      # Reusable React bileşenleri
│   ├── 📁 config/          # Konfigürasyon dosyaları
│   │   └── ⚙️ supabase.js   # Supabase client
│   ├── 📁 contexts/        # React Context API
│   │   └── 🔐 AuthContext.jsx # Authentication context
│   ├── 📁 pages/           # Sayfa bileşenleri
│   │   ├── 🏠 Dashboard.jsx     # Admin anasayfa
│   │   ├── 🔑 Login.jsx         # Giriş sayfası
│   │   ├── 📋 References.jsx    # Referans yönetimi
│   │   └── 📁 public/
│   │       └── 🌐 Home.jsx      # Public anasayfa
│   ├── 📁 utils/           # Yardımcı fonksiyonlar
│   ├── 🎨 index.css        # Global CSS
│   ├── ⚛️ main.jsx         # React entry point
│   └── 📱 App.jsx          # Main App component
├── 📁 .github/workflows/   # GitHub Actions
│   └── 🚀 deploy.yml       # Auto deployment
├── ⚙️ vite.config.js       # Vite configuration
├── 🎨 tailwind.config.js   # TailwindCSS config
└── 📦 package.json         # Dependencies
```

## 🔧 Supabase Kurulumu

### 1. Tablo Oluşturma

```sql
CREATE TABLE wonlinemenu_references (
  id BIGSERIAL PRIMARY KEY,
  referans TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. RLS (Row Level Security) Politikaları

```sql
-- Public okuma izni
CREATE POLICY "Allow public read access" ON wonlinemenu_references
FOR SELECT USING (true);

-- Authenticated kullanıcılar için tam erişim
CREATE POLICY "Allow authenticated users full access" ON wonlinemenu_references
FOR ALL USING (auth.role() = 'authenticated');
```

### 3. Otomatik updated_at Trigger

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_wonlinemenu_references_updated_at
    BEFORE UPDATE ON wonlinemenu_references
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 📋 Admin Kullanım Kılavuzu

### 🔑 Giriş Yapma

1. Admin paneline erişin: `/admin/login`
2. Supabase'de tanımlı email/şifre ile giriş yapın
3. Başarılı girişte dashboard'a yönlendirileceksiniz

### ➕ Referans Ekleme

1. Admin panelinden "Referanslar" sayfasına gidin
2. "Yeni referans ekle" alanına domain adını yazın (örn: `wonline.com`)
3. "Ekle" butonuna tıklayın
4. ✅ Başarı mesajı ile referans listeye eklenecek

### ✏️ Referans Düzenleme

1. Düzenlemek istediğiniz referansın yanındaki "Düzenle" butonuna tıklayın
2. Metin alanında değişiklik yapın
3. "Kaydet" butonuna tıklayın veya "İptal" ile vazgeçin

### 🗑️ Referans Silme

1. Silmek istediğiniz referansın yanındaki "Sil" butonuna tıklayın
2. Onay dialogunda "Tamam" ile onaylayın
3. Referans kalıcı olarak silinecektir

## 🎯 Önemli Notlar

- ✅ Tüm admin işlemleri gerçek zamanlı olarak güncellenir
- 🔒 Admin paneline sadece kimlik doğrulaması yapılmış kullanıcılar erişebilir
- 📱 Site mobil cihazlarda da tam işlevseldir
- ⚡ Public sayfa otomatik olarak 5 dakikada bir güncellenir
- 🔄 Referanslar son güncellenme tarihine göre sıralanır

## 👨‍💻 Geliştirici

**Melih Can Demir**
