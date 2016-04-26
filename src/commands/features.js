import AhaClient from '../AhaClient';
import Table from 'easy-table';
import {getUsername, getDefaultPrefix} from './login';

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
  } else if (!releaseId && command.search) {
      console.log('getting features that match the following term:', command.search)
      aha.send({
        apiUrl: `/features?q=${command.search}`,
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

    releaseId = getDefaultPrefix()
      ? getDefaultPrefix() + releaseId
      : releaseId;

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
