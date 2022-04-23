module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/tw-elements/dist/js/**/*.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                montserrant: "'Montserrant'",
                proxima: "'Proxima Nova'",
            },
            colors: {
                "plotco-yellow": "#F9CA31",
                "plotco-blue": "#177E89",
                "plotco-darkblue": "#204B5F",
                "plotco-red": "#CB483D",
            },
        },
    },
    plugins: [require("tw-elements/dist/plugin")],
};
