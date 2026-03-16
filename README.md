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
