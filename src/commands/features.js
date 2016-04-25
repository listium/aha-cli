import AhaClient from '../AhaClient';
import Table from 'easy-table';
import {getUsername} from './login';

export default (releaseId, command) => {

  const aha = new AhaClient;

  if (!releaseId && command.assigned) {
    const username = typeof command.assigned === 'string'
      ? command.assigned : getUsername();
    console.log('getting features for', username)
    aha.send({
      apiUrl: `/features?assigned_to_user=${username}`,
      renderer: (body) => {
        const data = body.features;

        const t = new Table;

        data.forEach((feature) => {
          t.cell('Ref', feature.reference_num)
          t.cell('Name', feature.name)
          t.newRow()
        })

        console.log(t.toString());
      }
    });
  } else {
    console.log('Requesting features for', releaseId);

    // Lookuip release id
    aha.send({
      apiUrl: `/releases/${releaseId}/features`,
      renderer: (body) => {
        const data = body.features;

        const t = new Table;

        data.forEach((feature) => {
          t.cell('Ref', feature.reference_num)
          t.cell('Name', feature.name)
          t.newRow()
        })

        console.log(t.toString())
      },
    });
  }
}
