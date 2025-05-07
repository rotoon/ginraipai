# 🧠 GinRaiPai App Blueprint (English Version)

## 📱 App Name
**GinRaiPai** ("What did you eat?")

## 🎯 Goal
To help users track their food intake by snapping a photo of each meal. The app uses AI to recognize the food, calculates calories and nutrients, and logs it in a daily health dashboard.

---

## ⚙️ Core Features

### 1. Authentication
- Signup/Login with Firebase or Supabase
- Store user profile: age, weight, height, gender

### 2. Onboarding
- On first login, ask user to fill in body data
- Save to user profile context/store

### 3. Meal Recognition
- Use camera to take meal photo
- Use Google Cloud Vision API (or similar) to detect food items
- Map labels to a food-nutrition database

### 4. Meal Logging
- Display identified food with estimated nutrients
- User confirms/edit
- Save meal per day with timestamps
- Track per-meal and per-day calorie totals

### 5. Dashboard
- Show chart of calorie intake (daily, weekly)
- Badge system for streaks
- Summary card (e.g. “You had 3 meals today / 1500 kcal”)

### 6. Design
- Mobile-first UX, one-hand usable
- Pastel color palette for calm + modern feel
- Fun tone with encouragement messages

---

## 🧱 Data Models (example)
### User
- id, name, email, age, gender, height, weight

### Meal
- id, userId, timestamp, photoUrl, items: [{ name, calories, fat, protein, carb }]

---

## 🤖 AI Integration
- Google Cloud Vision API or
- Free alternatives: Roboflow, Clarifai, Replicate

---

## 🧪 Tech Stack
- React Native (Expo version 53)
- Supabase
- Google Vision API
- Nativewind (Tailwind for RN)
- TypeScript

---

## 🛣️ Future Ideas
- Set weight goals
- AI-suggested meals
- Reminders before mealtime
- Sync with wearable device (e.g., Fitbit)

---

## 📦 MVP Scope
✅ Photo recognition → 🧠 AI model  
✅ Nutrient display → 🧾 Food database  
✅ Daily log & chart → 📊 Dashboard  
✅ Auth → 🔐 Firebase or Supabase  
✅ Minimal UX → 📱 3-step flow


# Ref Ideas
- https://dribbble.com/shots/20053309-Calories-app-interaction
- https://dribbble.com/shots/24692953-Nutrio-Calorie-Counter-App-UI-Kit
- https://dribbble.com/shots/19193291-Diet-and-Food-Tracker-App-Design
