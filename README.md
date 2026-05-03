# Planora: AI-Based Trip Planner

An AI-powered web application that generates personalized travel itineraries based on user preferences. Built using modern web technologies, this project focuses on clean architecture, modular design, and real-world API integration.

## 🚀 Features
### Intelligent Itinerary Engine

* **Geographic Clustering**: Groups activities within a 5–10 km radius per time block (Morning, Midday, Evening) to reduce travel fatigue.
* **Weather-Adaptive Planning**: Integrates real-time weather to dynamically adjust plans (e.g., outdoor → indoor when rain is predicted).
* **Dietary-First Dining**: Filters restaurants based on vegetarian and custom dietary constraints.
* **Logistics Solver**: Suggests transport routes (flight/train/road) with fallbacks if preferred options aren’t feasible.

### 🎨 Modern "Glassmorphic" UI/UX

* **Canvas-Based Scroller**: Smooth, frame-based homepage animation using 1200+ image frames.
* **Glassmorphism UI**: Clean interface using backdrop-blur and layered transparency.
* **Responsive Results Header**: Displays weather, budget tracking, and traveler info in real-time.
* **Dynamic Day Images**: Fetches scenic images for each itinerary location.

### 🛠 Technical Capabilities

* **PDF Export**: Download itinerary as a polished PDF.
* **Parallel Data Fetching**: Uses Promise.all for efficient API calls (weather, places, hotels, images).
* **Session Persistence**: Uses sessionStorage to retain user data across refreshes.


### 🛠 Tech Stack

**Framework**: Next.js 14 (App Router)
**Frontend**: React + TypeScript
**Styling**: Tailwind CSS
**Animations**: Framer Motion
**AI**: OpenAI (Prompt Engineering)
**APIs**:
-OpenRouter API (LLM access)
-OpenWeather API
-Overpass API (OpenStreetMap data)
-Unsplash API
**PDF Export**: jsPDF / html2canvas


## 📂 Project Structure

```
src/
│
├── app/
│   ├── api/
│   │   └── generate-itinerary/
│   │       └── route.ts        # API endpoint for itinerary generation
│   │
│   ├── itinerary-result/
│   │   └── page.tsx            # Displays generated itinerary
│   │
│   ├── page.tsx                # Landing page
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│
├── components/
│   ├── animations/             # Smooth scroll & transition effects
│   ├── layout/                 # Navbar, Footer
│   ├── sections/               # Landing + itinerary sections
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── ItineraryForm.tsx
│   │   ├── ItineraryDisplay.tsx
│   │   ├── ItineraryEngine.tsx
│   │   ├── Transition.tsx
│   │   └── MidTransition.tsx
│
├── hooks/
│   └── useImagePreloader.ts    # Custom hook for performance
│
├── lib/
│   └── apis/                   # External API integrations
│       ├── ai.ts
│       ├── places.ts
│       ├── hotels.ts
│       ├── images.ts
│       └── weather.ts
│
├── public/                     # Static assets (logo, images)

```
## ⚙️ How It Works

1. User enters travel preferences (destination, budget, duration, etc.)
2. Data is sent to /api/generate-itinerary
3. Backend orchestrates:
   -AI prompt generation
   -Weather API
   -Places & Hotels APIs
   -Image fetching
4. Logic applies:
   -Distance clustering
   -Weather adaptation
   -Dietary filtering
5. Final itinerary is generated
6. User is redirected to the results page
7. Option to download itinerary as PDF


## 🧑‍💻 Getting Started

### 1. Clone the repository

```
git clone https://github.com/NikhilParashar23/PLANORA-AI-based-Trip-Planner.git
```

### 2. Install dependencies

```
npm install
```

### 3. Add environment variables

Create a `.env.local` file and add your API keys:

```
AI_API_KEY=your_key
PLACES_API_KEY=your_key
HOTELS_API_KEY=your_key
WEATHER_API_KEY=your_key
```

### 4. Run the development server

```
npm run dev
```

### 5. Open in browser

```
http://localhost:3000
```

### 📝 Configuration Note

The animation frames are stored in:

```
/public/NewFrames
```
Ensure all 1200+ frames are correctly named for the CanvasScroller to work smoothly.


## 📌 Future Improvements

* 🗺️ Map integration for locations
* 📱 Improved responsiveness
* ⭐ Save & share itineraries


## 👨‍💻 Author

-Nikhil Parashar
-Snigdha Raibagkar