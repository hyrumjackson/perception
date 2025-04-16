# Perception – IS 542 Final Project

Perception is a TypeScript-based single-page web app built with React. It is designed to simulate a self-ranking group game where users assess their personal traits within a peer group. The goal of this project was to demonstrate full mastery of React with TypeScript, API integration, state management, and strong UI/UX principles.

---

## 📦 Project Overview

This application is a single-page game experience where one player hosts a game and others join using a room code. Each player ranks themselves based on humorous or insightful prompts. Points are awarded if a player uniquely selects a number. The app runs entirely on the client side with simulated multiplayer for demonstration.

---

## 🛠 Technologies Used

- **React** (Functional Components, React Router)
- **TypeScript** with strict type checking
- **Context API** for global state management
- **Hooks**: useState, useEffect, useContext, useMemo
- **API Integration**: API Ninjas (Quotes API)
- **Custom Utility Functions** for prompt generation
- **Global CSS** for styling

---

## 🔄 Application Features

### ✅ Functional Requirements:
- React + TypeScript application using modern development patterns
- Routing via `react-router-dom`
- Global state for players, game, and current prompts
- Quote API fetch on the home screen
- Prompt-based game with ranking and scoring logic

### ✅ Additional Features:
- Animated player reveal in lobby and results
- Game settings (rounds, prompt type: auto or custom)
- Responsive and centered layout
- Custom prompts fallback ("Give your prompt to the group")
- Basic error prevention (disabled navigation without selection, etc.)

---

## 🌐 API Used

**API Ninjas - Quotes API**
- Used to display a quote on the title screen
- Random quote fetched from `https://api.api-ninjas.com/v1/quotes`
- Error handled with fallback message

Environment variable:
```env
REACT_APP_API_NINJAS_KEY=your-api-key-here
```

---

## 📂 Project Structure Highlights

```
/src
├── context/
│   ├── GameContext.tsx        # Global state management
│   ├── gameTypes.ts           # Shared TypeScript interfaces
├── data/
│   └── prompts.ts             # Prompt pool for the game
├── pages/                     # All game screens
│   ├── TitleScreen.tsx
│   ├── HostInfo.tsx
│   ├── PlayerInfo.tsx
│   ├── GameSettings.tsx
│   ├── Question.tsx
│   ├── RoundResults.tsx
│   └── etc.
└── utils/
    └── generatePromptIds.ts   # Utility for shuffled prompt lists
```

---

## 🚀 Running the Project

### 1. Clone the repository:
```bash
git clone https://github.com/hyrumjackson/perception.git
cd perception
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Create a `.env` file:
```bash
echo "REACT_APP_API_NINJAS_KEY=your-api-key-here" > .env
```

### 4. Start the development server:
```bash
npm start
```

The app will run on `http://localhost:3000`

---

## 🌍 Deployment

Deployed on **[Vercel](https://vercel.com)**
> Live site: https://your-deployed-site.vercel.app

---

## ✅ Instructor Notes

This project demonstrates all key requirements from the IS 542 semester project rubric:

- **Fully in TypeScript** with defined interfaces and types
- **React Functional Components** with hooks
- **Web API integrated** with error handling
- **State Management** using Context API and hooks
- **Routing** via `react-router-dom`
- **Responsive Design** and intuitive UI
- **Readable, maintainable code structure**

---

Made with ❤️ for IS 542.