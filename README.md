# GinRaiPai

**What did you eat?**

GinRaiPai is a mobile app to help users track their food intake by snapping a photo of each meal. The app uses AI to recognize the food, calculates calories and nutrients, and logs it in a daily health dashboard.

---

## 🎯 Goal

- Effortless, fun food tracking
- Snap a photo, get instant meal recognition and nutrition
- See your daily/weekly progress in a beautiful dashboard

---

## ⚙️ Core Features

- **Authentication:** Signup/Login with Supabase or Firebase
- **Onboarding:** Enter body data (age, weight, height, gender)
- **Meal Recognition:** Take meal photo, AI detects food, maps to nutrition database
- **Meal Logging:** Confirm/edit meal, save per day, track calories
- **Dashboard:** Calorie intake chart, streak badges, summary card
- **Design:** Mobile-first, pastel, modern, fun, and accessible

---

## 🧱 Data Models (example)

- **User:** id, name, email, age, gender, height, weight
- **Meal:** id, userId, timestamp, photoUrl, items: [{ name, calories, fat, protein, carb }]

---

## 🤖 AI Integration

- Google Cloud Vision API (or alternatives: Roboflow, Clarifai, Replicate)

---

## 🧪 Tech Stack

- React Native (Expo 53)
- Supabase
- Google Vision API
- Nativewind (Tailwind for RN)
- TypeScript

---

## 🛣️ MVP Scope

- Photo recognition → 🧠 AI model
- Nutrient display → 🧾 Food database
- Daily log & chart → 📊 Dashboard
- Auth → 🔐 Firebase or Supabase
- Minimal UX → 📱 3-step flow

---

## 🖌️ Main Design Reference

- [Diet and Food Tracker App Design by Musemind (Dribbble)](https://dribbble.com/shots/19193291-Diet-and-Food-Tracker-App-Design)

---

## 🚀 Getting Started

1. **Clone the repo:**
   ```sh
   git clone git@github.com:rotoon/ginraipai.git
   cd ginraipai/ginraipai-app
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   ```
3. **Start the app:**
   ```sh
   pnpm start
   ```
4. **Run on device/emulator:**
   - Use Expo Go or your preferred simulator

---

## 📦 Folder Structure

- `components/` – Reusable UI components
- `screens/` – App screens (Onboarding, Dashboard, Camera, etc.)
- `contexts/` – React context for user/profile
- `utils/` – Utility functions
- `types/` – TypeScript types

---

## 📝 License

MIT
