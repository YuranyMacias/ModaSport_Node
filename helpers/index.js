
const dbValidators = require('./db-validators');
const generateJWT = require('./generate-jwt');
const googleVeryfy = require('./google-verify');
const uploadsFiles = require('./uploads-files');

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVeryfy,
    ...uploadsFiles,
}