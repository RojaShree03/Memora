function ResultScreen({
    type,
    level,
    score,
    attempts,
    gameTime,
    onNextLevel,
    onRestart
}) {

    const isCompleted = type === "completed";

    const accuracy =
        attempts > 0
            ? Math.round(
                  ((level * 2) / attempts) * 100
              )
            : 0;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);

        const remainingSeconds =
            seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    };

    return (
        <section
            className={`result-section ${
                isCompleted
                    ? "result-success"
                    : "result-game-over"
            }`}
        >

            {/* Result Icon */}

            <div className="result-icon">

                {isCompleted ? "✓" : "×"}

            </div>


            {/* Result Heading */}

            <span className="result-label">

                {isCompleted
                    ? "LEVEL COMPLETE"
                    : "GAME OVER"}

            </span>


            <h2>

                {isCompleted
                    ? "Excellent memory."
                    : "Don't give up."}

            </h2>


            <p className="result-message">

                {isCompleted
                    ? `You completed level ${level}. Keep going and challenge your memory.`
                    : `You ran out of lives on level ${level}. Try again and beat your score.`}

            </p>


            {/* Statistics */}

            <div className="result-stats">

                <div className="result-stat">

                    <span>
                        SCORE
                    </span>

                    <strong>
                        {score.toLocaleString()}
                    </strong>

                </div>


                <div className="result-stat">

                    <span>
                        ATTEMPTS
                    </span>

                    <strong>
                        {attempts}
                    </strong>

                </div>


                <div className="result-stat">

                    <span>
                        TIME
                    </span>

                    <strong>
                        {formatTime(gameTime)}
                    </strong>

                </div>


                <div className="result-stat">

                    <span>
                        ACCURACY
                    </span>

                    <strong>
                        {Math.min(accuracy, 100)}%
                    </strong>

                </div>

            </div>


            {/* Actions */}

            <div className="result-actions">

                {isCompleted && (
                    <button
                        type="button"
                        className="primary-button"
                        onClick={onNextLevel}
                    >
                        Next Level

                        <span>
                            →
                        </span>
                    </button>
                )}


                <button
                    type="button"
                    className={
                        isCompleted
                            ? "secondary-button"
                            : "primary-button"
                    }
                    onClick={onRestart}
                >
                    {isCompleted
                        ? "Play Again"
                        : "Try Again"}
                </button>

            </div>

        </section>
    );
}

export default ResultScreen;
