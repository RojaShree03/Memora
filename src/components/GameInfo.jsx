function GameInfo({
    level,
    lives,
    combo,
    gameTime
}) {

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    };

    return (
        <section className="game-info">

            {/* Level */}
            <div className="info-item">

                <span className="info-label">
                    LEVEL
                </span>

                <strong className="info-value">
                    {String(level).padStart(2, "0")}
                </strong>

            </div>


            {/* Lives */}
            <div className="info-item">

                <span className="info-label">
                    LIVES
                </span>

                <div className="lives">

                    {[0, 1, 2].map((life) => (
                        <span
                            key={life}
                            className={
                                life < lives
                                    ? "life active"
                                    : "life"
                            }
                        >
                            ♥
                        </span>
                    ))}

                </div>

            </div>


            {/* Combo */}
            <div className="info-item">

                <span className="info-label">
                    COMBO
                </span>

                <strong
                    className={`info-value ${combo >= 2 ? "combo-active" : ""
                        }`}
                >
                    ×{combo}
                </strong>

            </div>


            {/* Timer */}
            <div className="info-item">

                <span className="info-label">
                    TIME
                </span>

                <strong className="info-value timer">
                    {formatTime(gameTime)}
                </strong>

            </div>

        </section>
    );
}

export default GameInfo;
