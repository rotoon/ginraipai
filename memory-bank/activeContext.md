# Active Context

## Current Work Focus

- Onboarding flow fully implemented and visually polished
- Animated transitions between steps (slide/fade)
- Animated, accessible error messages
- Visually distinct, stable-width navigation buttons
- Animated progress indicator
- All fields styled, accessible, and mobile-friendly
- Known issue: animation direction bug when going back then forward rapidly (documented for future fix)
- Next: focus can shift to other features, UI polish, or bug fixes

## Recent Changes

- Initialized Expo project with TypeScript template in ginraipai-app
- Removed NativeBase and normalize-css-color
- Updated App.tsx and UiLibraryTestScreen.tsx to use only Dripsy
- Added OnboardingScreen, DashboardScreen, CameraScreen, PrimaryButton
- Set up navigation for all screens
- Removed UiLibraryTestScreen and cleaned up navigation

- Onboarding redesign: Nutrio-inspired, pastel, modern, mobile-first
- Animated transitions and error messages
- Navigation buttons and progress indicator improved
- Known animation direction bug documented

## Next Steps

- Next: focus on other features, UI polish, or bug fixes

## Active Decisions

- Using pnpm for package management
- Scaffolding both Supabase and Firebase for now
- Focusing on basic app structure before feature integration
- Dripsy is the official UI library for this project
- Utility-based, responsive, Expo-friendly styling
- Organized codebase for scalable development
- Test screen removed, codebase ready for feature development

- Onboarding flow considered complete for now
- Known animation direction bug documented for future fix

## Main Design Reference

- The main design/UX reference for GinRaiPai is now the Diet and Food Tracker App Design by Musemind ([Dribbble link](https://dribbble.com/shots/19193291-Diet-and-Food-Tracker-App-Design)).
- All future UI/UX work should match this style as closely as possible.
- Key elements to adopt:
  - Modern, clean, minimal layout
  - Large, readable typography
  - Soft, rounded cards and containers
  - Pastel and light color palette
  - Prominent, easy-to-tap buttons
  - Visual meal cards, charts, and badges
  - Friendly, encouraging microcopy
  - Consistent iconography and spacing
