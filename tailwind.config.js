module.exports = {
    theme: {},
    variants: {
        borderWidth: ['first', 'last']
    },
    plugins: [
        require('./plugins/pagination'),
    ],
    corePlugins: {
        float: false,
    }
};
