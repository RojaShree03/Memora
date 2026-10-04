import { useEffect, useState } from "react";

import Header from "./components/Header";
import GameInfo from "./components/GameInfo";
import MemoryBoard from "./components/MemoryBoard";
import Countdown from "./components/Countdown";
import ScoreBoard from "./components/ScoreBoard";
import ResultScreen from "./components/ResultScreen";
import ThemeToggle from "./components/ThemeToggle";

import {
    createMemoryCards,
    getLevelConfig,
    calculateMatchScore,
    calculateLevelBonus
} from "./utils/gameUtils";

import "./App.css";

function App() {
    const [level, setLevel] = useState(1);
    const [gamePhase, setGamePhase] = useState("start");

    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [attempts, setAttempts] = useState(0);
    const [combo, setCombo] = useState(0);

    const [memorizeTime, setMemorizeTime] = useState(3);
    const [gameTime, setGameTime] = useState(0);

    const [darkMode, setDarkMode] = useState(false);

    const [isChecking, setIsChecking] = useState(false);

    const setupLevel = (currentLevel) => {
        const config = getLevelConfig(currentLevel);
        const newCards = createMemoryCards(config.pairs);

        setCards(newCards);
        setFlippedCards([]);
        setMatchedCards([]);

        setMemorizeTime(config.memorizeTime);
        setGameTime(0);
        setAttempts(0);
        setCombo(0);
        setLives(3);
        setIsChecking(false);

        setGamePhase("memorize");
    };

    const startGame = () => {
        setScore(0);
        setLevel(1);

        setupLevel(1);
    };

    const startNextLevel = () => {
        const nextLevel = level + 1;

        setLevel(nextLevel);
        setupLevel(nextLevel);
    };

    useEffect(() => {
        if (gamePhase !== "memorize") {
            return;
        }

        if (memorizeTime <= 0) {
            setGamePhase("playing");
            return;
        }

        const timer = setTimeout(() => {
            setMemorizeTime(
                (previousTime) => previousTime - 1
            );
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [gamePhase, memorizeTime]);

    useEffect(() => {
        if (gamePhase !== "playing") {
            return;
        }

        const timer = setInterval(() => {
            setGameTime(
                (previousTime) => previousTime + 1
            );
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [gamePhase]);

    const handleCardClick = (cardId) => {
        if (gamePhase !== "playing") {
            return;
        }

        if (isChecking) {
            return;
        }

        if (flippedCards.includes(cardId)) {
            return;
        }

        if (matchedCards.includes(cardId)) {
            return;
        }

        if (flippedCards.length >= 2) {
            return;
        }

        setFlippedCards((previousCards) => [
            ...previousCards,
            cardId
        ]);
    };

    useEffect(() => {
        if (flippedCards.length !== 2) {
            return;
        }

        const firstCard = cards.find(
            (card) => card.id === flippedCards[0]
        );

        const secondCard = cards.find(
            (card) => card.id === flippedCards[1]
        );

        if (!firstCard || !secondCard) {
            return;
        }

        setIsChecking(true);

        setAttempts(
            (previousAttempts) => previousAttempts + 1
        );

        if (firstCard.value === secondCard.value) {
            setMatchedCards((previousMatched) => [
                ...previousMatched,
                firstCard.id,
                secondCard.id
            ]);

            const matchScore = calculateMatchScore(combo);

            setScore(
                (previousScore) =>
                    previousScore + matchScore
            );

            setCombo(
                (previousCombo) =>
                    previousCombo + 1
            );

            setFlippedCards([]);

            setIsChecking(false);

            return;
        }

        setCombo(0);

        setLives(
            (previousLives) =>
                previousLives - 1
        );

        const hideTimer = setTimeout(() => {
            setFlippedCards([]);
            setIsChecking(false);
        }, 800);

        return () => {
            clearTimeout(hideTimer);
        };
    }, [flippedCards, cards]);

    useEffect(() => {
        if (cards.length === 0) {
            return;
        }

        if (
            matchedCards.length === cards.length &&
            gamePhase === "playing"
        ) {
            const bonus = calculateLevelBonus(
                level,
                gameTime,
                lives
            );

            setScore(
                (previousScore) =>
                    previousScore + bonus
            );

            setGamePhase("completed");
        }
    }, [
        matchedCards,
        cards,
        gamePhase,
        level,
        gameTime,
        lives
    ]);

    useEffect(() => {
        if (
            lives <= 0 &&
            gamePhase === "playing"
        ) {
            setGamePhase("gameOver");
        }
    }, [lives, gamePhase]);

    const restartGame = () => {
        setScore(0);
        setLevel(1);

        setCards([]);
        setFlippedCards([]);
        setMatchedCards([]);

        setLives(3);
        setAttempts(0);
        setCombo(0);

        setGameTime(0);
        setMemorizeTime(3);

        setIsChecking(false);

        setGamePhase("start");
    };

    return (
        <div className={`app ${darkMode ? "dark" : ""}`}>
            <div className="app-container">

                <Header />

                <ThemeToggle
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />

                {gamePhase !== "start" && (
                    <GameInfo
                        level={level}
                        lives={lives}
                        combo={combo}
                        gameTime={gameTime}
                    />
                )}

                {gamePhase === "start" && (
                    <section className="welcome-section">
                        <div className="welcome-card">

                            <span className="welcome-icon">
                                ✦
                            </span>

                            <span className="welcome-label">
                                MEMORY GAME
                            </span>

                            <h2>
                                Remember what you see.
                            </h2>

                            <p>
                                Memorize the numbers,
                                flip the cards,
                                and find every
                                matching pair.
                            </p>

                            <button
                                type="button"
                                className="primary-button"
                                onClick={startGame}
                            >
                                Start Game
                                <span>→</span>
                            </button>

                        </div>
                    </section>
                )}

                {gamePhase === "memorize" && (
                    <Countdown
                        time={memorizeTime}
                        cards={cards}
                    />
                )}

                {(gamePhase === "playing" ||
                    gamePhase === "memorize") && (
                        <MemoryBoard
                            cards={cards}
                            flippedCards={flippedCards}
                            matchedCards={matchedCards}
                            gamePhase={gamePhase}
                            onCardClick={handleCardClick}
                        />
                    )}

                {gamePhase === "playing" && (
                    <ScoreBoard
                        score={score}
                        attempts={attempts}
                    />
                )}

                {gamePhase === "completed" && (
                    <ResultScreen
                        type="completed"
                        level={level}
                        score={score}
                        attempts={attempts}
                        gameTime={gameTime}
                        onNextLevel={startNextLevel}
                        onRestart={restartGame}
                    />
                )}

                {gamePhase === "gameOver" && (
                    <ResultScreen
                        type="gameOver"
                        level={level}
                        score={score}
                        attempts={attempts}
                        gameTime={gameTime}
                        onNextLevel={restartGame}
                        onRestart={restartGame}
                    />
                )}

                <footer>
                    <p>
                        MEMORA · Train your memory.
                    </p>
                </footer>

            </div>
        </div>
    );
}

export default App;