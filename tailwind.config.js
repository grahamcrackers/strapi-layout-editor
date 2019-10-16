module.exports = {
    theme: {},
    variants: {
        borderWidth: ['first', 'last']
    },
    plugins: [
        require('./plugins/styles/pagination'),
        require('@tailwindcss/custom-forms'),
    ],
    corePlugins: {
        float: false,
    }
};
