import AhaClient from '../AhaClient';
import {getUsername, getDefaultReleasePrefix} from './login';

export default (releaseId, featureName, workflowKind, workflowStatus,
  assignedToUser) => {

  const aha = new AhaClient;

  console.log('Creating feature', featureName);

  // Lookuip release id
  const data = {
    "feature": {
      "name": featureName,
      "workflow_kind": workflowKind || "Improvement",
      "workflow_status": {
        "name": workflowStatus || "Ready for development"
      },
      "assigned_to_user": getUsername(),
    }
  };

  releaseId = getDefaultReleasePrefix()
    ? getDefaultReleasePrefix() + releaseId
    : releaseId;

  aha.send({
    apiUrl: `/releases/${releaseId}/features`,
    renderer: (body) => {
      console.log('Finished!')
    },
    data,
    method: 'POST',
  });
}
