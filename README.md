# Bracco Sports Cashback Estimator

A React Native (Expo) app for estimating Bracco Sports cashback rewards.

## Setup & Running

This project uses Expo.

### 1. View on Web
You can export and run the web build directly:
```bash
npx expo export -p web
npx serve dist
```

### 2. Run Locally (iOS/Android)
1. Install [Expo Go](https://expo.dev/go) on your phone.
2. Clone this repository and install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm start
```
4. Scan the QR code with your phone's camera (iOS) or the Expo Go app (Android).

## Architecture overview

The codebase is split into two main areas:
- **`src/ui/`**: A generic UI library containing Bracco-themed components (Tokens, Atoms, Molecules).
- **`src/features/cashback/`**: The specific business logic, custom hooks, and components for the cashback estimator.

### Data layer
- `cashback.json` acts as our mock backend response.
- We use a **Zod schema** (`schema.ts`) to validate the data at runtime and provide TypeScript types.
- A service layer (`cashbackService.ts`) handles fetching the data, making it easy to swap out the local JSON for a real API endpoint later.

### Key implementation details
- **Config-Driven**: The tier inputs (Straight Bet, 2-Leg, etc.) are rendered dynamically from the JSON configuration rather than hardcoded.
- **Formatting**: Uses `Intl.NumberFormat` dynamically based on the `currency` field provided by the backend.
- **Performance**: Uses standard React optimizations (`useMemo`, `useCallback`, `React.memo`) so dragging the sliders feels snappy and doesn't trigger unnecessary re-renders.
- **Accessibility**: Includes basic ARIA roles and accessibility labels for interactive elements.

## Testing & linting

The core calculation logic and state management are covered by Jest unit tests.

```bash
# Run tests
npm test

# Run linter
npm run lint
```
