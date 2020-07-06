// eslint-disable-next-line @typescript-eslint/no-var-requires
const replace = require('replace-in-file');

const options = {

    //Single file
    files: 'client/main.*',

    from: 'host:process.env.HOST',
    to: `host: "${process.env.HOST}"`,
};

try {
   replace.sync(options);
}
catch (error) {
    console.error('Error occurred:', error);
}