# 🌬️ AirQuality

Mobile app for **Programación Dispositivos Móviles** (Exam 3 · April 2026 · 20% grade).

Estimates a user's daily air pollution exposure based on their city, date, and time spent outdoors, using the [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native + Expo (managed workflow) |
| Language | TypeScript |
| Architecture | MVP (Model-View-Presenter) |
| HTTP | `fetch` (built-in) |
| Date handling | `dayjs` |
| Date picker | `react-native-ui-datepicker` |
| City picker | Custom bottom sheet modal |

---

## Architecture

```
src/
├── models/
│   ├── AirQualityModel.ts   # Fetches PM2.5 from Open-Meteo, computes daily avg
│   ├── cities.ts            # Colombian cities with coordinates
│   └── types.ts             # Shared TypeScript interfaces
├── presenters/
│   └── AirQualityPresenter.ts  # Connects Model ↔ View, no UI code
└── views/
    ├── screens/
    │   └── HomeScreen.tsx   # Main screen
    └── components/
        ├── CityPicker.tsx   # Bottom sheet city selector
        └── ResultCard.tsx   # Exposure result display
```

### MVP Responsibilities

- **Model** — API fetching, PM2.5 averaging, exposure index calculation
- **Presenter** — Receives inputs from View, calls Model, formats result, passes back. No JSX.
- **View** — Renders UI, captures input, delegates all logic to Presenter. No business logic.

---

## Core Feature

### Exposure Index Formula

```
exposure_index = avg_PM2.5 × hours_outdoors
```

### Risk Classification

| Index Value | Risk Level |
|-------------|------------|
| < 100 | 🟢 Bajo (Low) |
| 100 – 200 | 🟡 Moderado (Moderate) |
| > 200 | 🔴 Alto (High) |

---

## Supported Cities

| City | Latitude | Longitude |
|------|----------|-----------|
| Bogotá | 4.61 | -74.08 |
| Medellín | 6.25 | -75.56 |
| Cali | 3.43 | -76.52 |
| Barranquilla | 10.96 | -74.80 |
| Cartagena | 10.39 | -75.48 |
| Bucaramanga | 7.13 | -73.13 |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)

### Install & Run

```bash
# Clone the repository
git clone git@github.com:MagicExist/AirQuality.git
cd AirQuality/air-quality

# Install dependencies
npm install

# Start on web
npm run web

# Start on Android
npm run android

# Start on iOS
npm run ios
```

---

## API Reference

**Base URL:** `https://air-quality-api.open-meteo.com/v1/air-quality`

**Example request:**
```
GET /v1/air-quality?latitude=4.61&longitude=-74.08&hourly=pm2_5&start_date=2025-10-07&end_date=2025-10-07
```

**Response shape:**
```json
{
  "hourly": {
    "time": ["2025-10-07T00:00", "2025-10-07T01:00", "..."],
    "pm2_5": [12.3, 15.1, "..."]
  }
}
```

---

## User Flow

1. Select a **Colombian city** from the dropdown
2. Pick a **date** from the calendar
3. Enter **hours spent outdoors**
4. Tap **Calcular Exposición**
5. View PM2.5 average, exposure index, and risk level
