import AhaClient from '../AhaClient';
import {getDefaultPrefix} from './login';

export default (featureId, workflowStatus) => {

  const aha = new AhaClient;

  console.log('Updating feature', featureId);

  // Lookuip release id
  const data = {
      "workflow_status": workflowStatus || "Ready for testing"
  };

  featureId = getDefaultPrefix()
    ? getDefaultPrefix() + featureId
    : featureId;

  aha.send({
    apiUrl: `/features/${featureId}`,
    data,
    method: 'PUT',
    renderer: (body) => {
      console.log('Finished!', body);
    }
  });
}
