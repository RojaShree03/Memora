function ScoreBoard({
    score,
    attempts
}) {

    return (
        <section className="score-board">

            <div className="score-item">

                <span className="score-label">
                    SCORE
                </span>

                <strong className="score-value">
                    {score.toLocaleString()}
                </strong>

            </div>


            <div className="score-divider"></div>


            <div className="score-item">

                <span className="score-label">
                    ATTEMPTS
                </span>

                <strong className="score-value">
                    {attempts}
                </strong>

            </div>

        </section>
    );
}

export default ScoreBoard;
