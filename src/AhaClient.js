const request = require('superagent');
import {getAuthToken} from './commands/login';

export default class AhaClient {
  constructor (options) {
  }

  send (options) {
    const {method, data} = options;

    const apiUrl = `https://listium.aha.io/api/v1${options.apiUrl}`;

    const renderer = options.renderer || ((body) => {
      // Default renderer
      console.log(body);
    });

    const requestType = method;

    if(process.env.DEBUG) {
      console.log('URL', apiUrl);
      console.log('METHOD', requestType);
      console.log('BODY', data);
    }

    let apiRequest;
    if (requestType === 'POST') {
      apiRequest = request.post(apiUrl)
        .send(data);
    } else if (requestType === 'PUT') {
      apiRequest = request.put(apiUrl)
        .send(data);
    } else {
      apiRequest = request.get(apiUrl);
    }
    apiRequest = apiRequest.set('Authorization', getAuthToken());

	  apiRequest.end((err, res) => {

        if (err) {
          switch (res.status) {
            case 401:
              console.log('Authentication failed, try logging in again...');
              break;
            default:
              console.log('Unknown occurred, bug Bryce.');
              break;
          }
          console.log(err.te);
          return false;
        } else {
          renderer(res.body);
          return true;
        }
	    });
  }
}
