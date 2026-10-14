# 🎬 AI Dub Studio — Frontend

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**AI Dub Studio** — bu sun'iy intellekt yordamida videolarni avtomatik tarjima qilish va dublyaj qilish uchun mo'ljallangan zamonaviy web-platformaning frontend qismi. Ushbu loyiha foydalanuvchilarga videolarni yuklash, ularni qayta ishlash jarayonini real-vaqtda kuzatish va tayyor natijani tahrirlash imkonini beradi.

---

## ✨ Asosiy Imkoniyatlar

- **📊 Professional Dashboard**: Loyihalarni boshqarish uchun sodda va qulay interfeys.
- **⚡ Real-vaqt Progress**: `WebSockets` orqali videoga ishlov berish jarayonini (transkripsiyadan tortib dublyajgacha) jonli kuzatish.
- **🎨 Modern Dizayn**: TailwindCSS v4 va Glassmorphism effektlari asosida yaratilgan, ko'zga yoqimli "Dark Mode" interfeysi.
- **📽️ Smart Editor**: AI tomonidan yaratilgan transkripsiyani tahrirlash, vaqt belgilarini (timestamps) moslash va tarjimani tasdiqlash uchun maxsus muharrir.
- **📱 Responsive Layout**: Har qanday qurilma (desktop, planshet, mobil) uchun to'liq moslashgan dizayn.

---

## 🛠 Texnologik Stack

- **Framework**: [React 19](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/) (Eng so'nggi versiya)
- **State & API**: 
  - `Axios` (Server bilan ma'lumot almashish)
  - `Native WebSockets` (Real-vaqtda status olish)
- **Routing**: `React Router Dom v7`

---

## 🏛️ Frontend Arxitekturasi (System Architecture)

**AI Dub Studio** frontend arxitekturasi modulli sahifalar, video-pleyer va subtitrlar vaqtini real-vaqtda sinxronlovchi muharrir hamda `WebSockets` orqali uzluksiz status almashuvchi tarmoq qatlami asosida ishlaydi:

```mermaid
flowchart TD
    %% Styling and Theme Classes
    classDef ui fill:#0F172A,stroke:#38BDF8,stroke-width:2px,color:#F8FAFC
    classDef router fill:#1E293B,stroke:#818CF8,stroke-width:2px,color:#F8FAFC
    classDef comm fill:#1E1E38,stroke:#F43F5E,stroke-width:2px,color:#F8FAFC
    classDef editor fill:#312E81,stroke:#C084FC,stroke-width:2px,color:#F8FAFC
    classDef backend fill:#064E3B,stroke:#34D399,stroke-width:2px,color:#F8FAFC

    subgraph ClientViews["🖥️ Foydalanuvchi Interfeysi (Pages & Router)"]
        Router["🧭 React Router Dom v7<br/>(Client-side marshrutlash)"]:::router
        LoginPage["🔐 Login / Auth Page<br/>(Kirish va xavfsiz sessiya)"]:::ui
        DashboardPage["📊 Project Dashboard<br/>(Loyihalar ro'yxati va holati)"]:::ui
        StudioEditor["🎬 Smart Dubbing Editor<br/>(Video pleyer, transkript & audio)"]:::editor
    end

    subgraph EditorSubsystems["⚙️ Tahrirlovchi Muharrir Tizimi (Editor Modules)"]
        VideoPlayer["📽️ HTML5 Video Sync Engine<br/>(Vaqt belgilariga mos ijro)"]:::editor
        SubtitleEditor["📝 Interactive Timeline & Subtitles<br/>(Matn tahriri, spikerlar, timing)"]:::editor
        AudioControls["🎛️ Dubbing & Audio Controls<br/>(Ovoz balandligi, tillar, tezlik)"]:::editor
    end

    subgraph CommLayer["⚡ Aloqa va Holat Boshqaruvi (Network Tier)"]
        AxiosClient["📡 Axios HTTP Client<br/>(Video yuklash, loyihalar CRUD, eksport)"]:::comm
        WSClient["🔄 Native WebSocket Client<br/>(Real-vaqt jarayon monitori)"]:::comm
        ThemeEngine["🎨 Tailwind CSS v4 & Glassmorphism<br/>(Zamonaviy Dark rejim va stillar)"]:::ui
    end

    subgraph BackendAPI["🚀 Backend Servislar (FastAPI & AI Workers)"]
        FastAPIEndpoint["🛡️ REST API Shlyuzi<br/>(/api/v1/projects, /api/v1/upload)"]:::backend
        WSServerEndpoint["📡 WebSocket Server<br/>(Transkripsiya, Dublyaj statusi)"]:::backend
    end

    %% Routing
    Router --> LoginPage
    Router --> DashboardPage
    Router --> StudioEditor

    %% Editor Composition
    StudioEditor --> VideoPlayer
    StudioEditor --> SubtitleEditor
    StudioEditor --> AudioControls

    %% Network Connections
    DashboardPage -- "Video fayllarni yuklash" --> AxiosClient
    StudioEditor -- "Tahrirlangan subtitrlarni saqlash" --> AxiosClient
    StudioEditor <-- "Jonli status xabarlari" --> WSClient
    DashboardPage <-- "Jarayon foizlari (progress)" --> WSClient

    %% Backend Sync
    AxiosClient <--> FastAPIEndpoint
    WSClient <--> WSServerEndpoint
```

### 🔄 Real-Vaqt Video Qayta Ishlash Oqimi (Pipeline Flow)
1. **Loyiha Yaratish:** Foydalanuvchi video yuklaydi $\rightarrow$ `Axios` orqali backendga uzatiladi va unikal loyiha ID raqami olinadi.
2. **Jonli Kuzatuv (WebSocket):** Frontend WebSocket orqali ulanadi va transkripsiyalash, matn tarjimasi va dublyaj yaratilish foizlarini progress-barda ko'rsatib boradi.
3. **Smart Editor Sinxronizatsiyasi:** Natija tayyor bo'lgach, foydalanuvchi muharrirga o'tadi — videoning har bir soniyasiga mos keluvchi subtitrlar bloklari jonli faollashadi, foydalanuvchi o'zgartirish kiritishi va yangi dublyajni tinglashi mumkin.

---

## 🚀 Loyal Muhitda Ishga Tushirish

Loyihani o'z kompyuteringizda yurgizish uchun quyidagi qadamlarni bajaring:

```bash
# 1. Repozitoriyani klonlash
git clone https://github.com/Farhodoff/video-translate-front.git

# 2. Loyiha papkasiga kirish
cd video-translate-front

# 3. Kutubxonalarni o'rnatish
npm install

# 4. Dev-serverni ishga tushirish
npm run dev
```
Odatda ilova **[http://localhost:5173](http://localhost:5173)** manzilida ishga tushadi.

---

## 📁 Loyiha Strukturasi

```text
src/
├── api/          # Server bilan bog'lanish va API konfiguratsiyasi
├── assets/       # Rasm, ikonka va boshqa statik fayllar
├── components/   # Qayta ishlatiluvchi UI komponentlar (buttons, inputs, cards)
├── pages/        # Asosiy sahifalar (Dashboard, Login, Editor)
└── App.tsx       # Routing va ilovaning kirish nuqtasi
```

---

## 👤 Muallif

**[Farhodoff](https://github.com/Farhodoff)** — Full-stack Developer.

---

## 📜 Litsenziya

MIT License. Loyihadan shaxsiy yoki tijoriy maqsadlarda foydalanishingiz mumkin.
