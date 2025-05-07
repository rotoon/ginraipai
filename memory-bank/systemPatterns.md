# System Patterns

## System Architecture

- Mobile-first app built with React Native (Expo)
- Backend: Supabase (or Firebase) for authentication and user data
- AI service: Google Cloud Vision API (or alternative) for meal recognition
- Food-nutrition database for nutrient lookup

## Key Technical Decisions

- Use of cloud-based AI for food recognition
- Store user and meal data in Supabase/Firebase
- Use Nativewind for Tailwind-style UI in React Native

## Design Patterns

- Context/store for user profile and meal data
- Modular components for camera, meal display, dashboard, and onboarding
- 3-step minimal flow: photo → confirm/edit → dashboard

## Component Relationships

- Camera component triggers AI recognition
- Meal display component shows/edit nutrients
- Dashboard aggregates daily/weekly stats

## Main UI/UX Reference

- The main UI/UX reference for all screens and components is now the Diet and Food Tracker App Design by Musemind ([Dribbble link](https://dribbble.com/shots/19193291-Diet-and-Food-Tracker-App-Design)).
- All design patterns, color palettes, and UI elements should align with this reference.
- Key elements to reuse:
  - Modern, clean, minimal layout
  - Large, readable typography
  - Soft, rounded cards and containers
  - Pastel and light color palette
  - Prominent, easy-to-tap buttons
  - Visual meal cards, charts, and badges
  - Friendly, encouraging microcopy
  - Consistent iconography and spacing
