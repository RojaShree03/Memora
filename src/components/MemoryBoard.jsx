import MemoryCard from "./MemoryCard";

function MemoryBoard({
    cards,
    flippedCards,
    matchedCards,
    gamePhase,
    onCardClick
}) {

    return (
        <section className="memory-board">

            <div
                className={`cards-grid cards-${cards.length}`}
            >

                {cards.map((card) => {

                    const isFlipped =
                        flippedCards.includes(card.id);

                    const isMatched =
                        matchedCards.includes(card.id);

                    return (
                        <MemoryCard
                            key={card.id}
                            card={card}
                            isFlipped={isFlipped}
                            isMatched={isMatched}
                            showNumber={
                                gamePhase === "memorize"
                            }
                            onClick={onCardClick}
                        />
                    );
                })}

            </div>

        </section>
    );
}

export default MemoryBoard;
