
import fs from 'fs';
import pwuid from 'pwuid';

const HOME_DIR = pwuid().dir;
export const ahaFile = `${HOME_DIR}/.aha`;


export default (username, password) => {
  let ahaConfig = {};

  if (fs.existsSync(ahaFile)) {
    ahaConfig = JSON.parse(fs.readFileSync(ahaFile, 'utf8'));
  }

  // Generates Authorization Header
  const authorizationHeader = 'Basic ' + new Buffer(username + ':' + password)
    .toString('base64');

  ahaConfig.authorizationHeader = authorizationHeader
  ahaConfig.username = username;
  // Pretty print it ot ~/.aha
  fs.writeFileSync(ahaFile, JSON.stringify(ahaConfig, undefined, 4), 'utf8');
  console.log('Logged in succesfully, good damn job man!')
}

export const getAuthToken = () => {
  let ahaConfig = {};

  if (fs.existsSync(ahaFile)) {
    ahaConfig = JSON.parse(fs.readFileSync(ahaFile, 'utf8'));
  }
  return ahaConfig.authorizationHeader;
}

export const getUsername = () => {
  let ahaConfig = {};

  if (fs.existsSync(ahaFile)) {
    ahaConfig = JSON.parse(fs.readFileSync(ahaFile, 'utf8'));
  }
  return ahaConfig.username;
}
// CORE-R-111
export const getDefaultReleasePrefix = () => {
  let ahaConfig = {};

  if (fs.existsSync(ahaFile)) {
    ahaConfig = JSON.parse(fs.readFileSync(ahaFile, 'utf8'));
  }

  return ahaConfig.defaultProduct
    ? ahaConfig.defaultProduct + '-R-'
    : false;
}
