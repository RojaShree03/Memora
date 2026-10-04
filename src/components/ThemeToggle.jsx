function ThemeToggle({
    darkMode,
    setDarkMode
}) {

    const handleToggle = () => {
        setDarkMode((previousMode) => !previousMode);
    };

    return (
        <button
            type="button"
            className={`theme-toggle ${
                darkMode ? "theme-dark" : "theme-light"
            }`}
            onClick={handleToggle}
            aria-label={
                darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }
            title={
                darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }
        >

            <span className="theme-icon">

                {darkMode ? "☀" : "☾"}

            </span>

        </button>
    );
}

export default ThemeToggle;