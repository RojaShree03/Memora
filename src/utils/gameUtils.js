// ========================================
// Generate unique random numbers
// ========================================

export const generateRandomNumbers = (count) => {

    const numbers = new Set();

    while (numbers.size < count) {

        const randomNumber =
            Math.floor(Math.random() * 90) + 10;

        numbers.add(randomNumber);
    }

    return Array.from(numbers);
};


// ========================================
// Create memory card pairs
// ========================================

export const createMemoryCards = (pairCount) => {

    const numbers = generateRandomNumbers(pairCount);

    const cards = numbers.flatMap(
        (number, index) => {

            const uniqueId =
                `${Date.now()}-${index}`;

            return [
                {
                    id: `${uniqueId}-a`,
                    value: number,
                    matched: false
                },

                {
                    id: `${uniqueId}-b`,
                    value: number,
                    matched: false
                }
            ];
        }
    );

    return shuffleCards(cards);
};


// ========================================
// Shuffle cards
// ========================================

export const shuffleCards = (cards) => {

    const shuffledCards = [...cards];

    for (
        let currentIndex = shuffledCards.length - 1;
        currentIndex > 0;
        currentIndex--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (currentIndex + 1)
            );

        [
            shuffledCards[currentIndex],
            shuffledCards[randomIndex]
        ] = [
            shuffledCards[randomIndex],
            shuffledCards[currentIndex]
        ];
    }

    return shuffledCards;
};


// ========================================
// Get level configuration
// ========================================

export const getLevelConfig = (level) => {

    const configurations = {

        1: {
            pairs: 2,
            memorizeTime: 3
        },

        2: {
            pairs: 3,
            memorizeTime: 4
        },

        3: {
            pairs: 4,
            memorizeTime: 5
        },

        4: {
            pairs: 5,
            memorizeTime: 5
        },

        5: {
            pairs: 6,
            memorizeTime: 6
        }
    };

    return (
        configurations[level] || {
            pairs: Math.min(level + 1, 10),
            memorizeTime: Math.min(6 + level - 5, 10)
        }
    );
};


// ========================================
// Calculate score
// ========================================

export const calculateMatchScore = (combo) => {

    const baseScore = 100;

    const comboBonus = combo * 25;

    return baseScore + comboBonus;
};


// ========================================
// Calculate accuracy
// ========================================

export const calculateAccuracy = (
    matchedPairs,
    attempts
) => {

    if (attempts === 0) {
        return 0;
    }

    const accuracy =
        (matchedPairs / attempts) * 100;

    return Math.min(
        Math.round(accuracy),
        100
    );
};


// ========================================
// Format time
// ========================================

export const formatTime = (seconds) => {

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;
};


// ========================================
// Calculate final score bonus
// ========================================

export const calculateLevelBonus = (
    level,
    gameTime,
    lives
) => {

    const levelBonus =
        level * 500;

    const timeBonus =
        Math.max(
            0,
            500 - gameTime * 10
        );

    const lifeBonus =
        lives * 100;

    return (
        levelBonus +
        timeBonus +
        lifeBonus
    );
};
