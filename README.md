# 🧠 MEMORA — Memory Number Game

> Remember what you see.

MEMORA is a modern React-based memory game where players memorize randomly generated numbers, flip cards, find matching pairs, and progress through increasingly challenging levels.

The project was originally created as a **Random Number Generator — State & Conditional Rendering Project**, and was extended into a complete interactive memory game to demonstrate React concepts in a practical way.

## 🌐 Live Demo

🚀 **Vercel:**  
https://memora-sage-xi.vercel.app/

## 📂 GitHub Repository

💻 **Source Code:**  
https://github.com/RojaShree03/Memora

---

## ✨ Features

- 🎲 Randomly generated numbers
- 🧠 Memorization phase
- 🃏 Interactive memory cards
- 🔎 Match identical numbers
- ❤️ Lives system
- 🔥 Combo system
- 🏆 Score calculation
- 🎯 Attempts tracking
- ⏱️ Game timer
- 📈 Progressive levels
- 🎉 Level completion screen
- 💀 Game-over state
- 🌙 Dark mode
- 📱 Responsive design
- ✨ Smooth card-flip animations
- 🔄 Restart and next-level functionality
- 🚫 Prevents duplicate card selections
- 🛡️ Prevents multiple life deductions for a single wrong attempt

---

## 🎯 React Concepts Demonstrated

This project demonstrates several important React fundamentals.

### `useState`

State is used to manage:

- Current level
- Game phase
- Generated cards
- Flipped cards
- Matched cards
- Score
- Lives
- Attempts
- Combo
- Game timer
- Memorization countdown
- Dark mode

Example:

```jsx
const [score, setScore] = useState(0);
const [lives, setLives] = useState(3);
const [level, setLevel] = useState(1);