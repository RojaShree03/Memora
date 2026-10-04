function Countdown({
    time,
    cards
}) {

    return (
        <section className="countdown-section">

            <div className="countdown-content">

                <span className="countdown-label">
                    MEMORIZE
                </span>

                <h2>
                    {time > 0 ? time : "GO"}
                </h2>

                <p>
                    Remember the numbers before they disappear.
                </p>

            </div>

            <div className="memorize-numbers">

                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="memorize-number"
                    >
                        {card.value}
                    </div>
                ))}

            </div>

        </section>
    );
}

export default Countdown;
