module.exports = {
    theme: {},
    variants: {
        borderWidth: ['first', 'last']
    },
    plugins: [
        require('./plugins/styles/pagination'),
    ],
    corePlugins: {
        float: false,
    }
};
