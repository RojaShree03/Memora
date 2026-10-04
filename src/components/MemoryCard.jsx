function MemoryCard({
    card,
    isFlipped,
    isMatched,
    showNumber,
    onClick
}) {

    const shouldReveal =
        showNumber ||
        isFlipped ||
        isMatched;

    const handleClick = () => {

        if (showNumber) {
            return;
        }

        if (isMatched) {
            return;
        }

        onClick(card.id);
    };

    return (
        <button
            type="button"
            className={`
                memory-card
                ${shouldReveal ? "flipped" : ""}
                ${isMatched ? "matched" : ""}
            `}
            onClick={handleClick}
            disabled={isMatched}
            aria-label={
                shouldReveal
                    ? `Number ${card.value}`
                    : "Hidden memory card"
            }
        >

            <div className="card-inner">

                {/* Front / Hidden Side */}
                <div className="card-face card-front">

                    <div className="card-symbol">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <span className="card-question">
                        ?
                    </span>

                </div>


                {/* Back / Number Side */}
                <div className="card-face card-back">

                    <span className="number">
                        {card.value}
                    </span>

                    {isMatched && (
                        <span className="match-icon">
                            ✓
                        </span>
                    )}

                </div>

            </div>

        </button>
    );
}

export default MemoryCard;
