import path from 'path';

export default {
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') },
        ]
    }
}