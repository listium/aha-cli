import AhaClient from '../AhaClient';
import {getUsername, getDefaultPrefix} from './login';

export default (featureId, comment) => {

  const aha = new AhaClient;

  console.log('Adding comment to feature', featureId);

  // Lookuip release id
  const data = {
      "comment": {
        "body": comment,
        "user": {
          "email": getUsername(),
        },
      }
  };


  featureId = getDefaultPrefix()
    ? getDefaultPrefix() + featureId
    : featureId;

  aha.send({
    apiUrl: `/features/${featureId}/comments`,
    data,
    method: 'POST',
    renderer: (body) => {
      console.log('Finished!', body);
    }
  });
}
