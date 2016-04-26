import AhaClient from '../AhaClient';
import Table from 'easy-table';
import {getDefaultPrefix} from './login';

export default (productId, command) => {

  const aha = new AhaClient;

  productId = getDefaultPrefix()
    ? getDefaultPrefix().slice(0,-1)
    : getDefaultPrefix().slice(0,-1) + productId;


  if (command.search) {
      console.log('getting releases that match the following term:', command.search)
      aha.send({
        apiUrl: `/releases?q=${command.search}`,
        renderer: (body) => {
          const data = body.releases;

          const t = new Table;

          data.forEach((releases) => {
            t.cell('Ref', releases.reference_num)
            t.cell('Name', releases.name)
            t.newRow()
          })

          console.log(t.toString());
        }
      });
  } else {
    console.log('Requesting releases for', productId);
    aha.send({
      apiUrl: `/products/${productId}/releases`,
      renderer: (body) => {
        const data = body.releases.reverse().splice(20);

        const t = new Table;

        data.forEach((release) => {
          t.cell('Ref', release.reference_num)
          t.cell('Name', release.name)
          t.cell('Release Date', release.release_date)
          t.newRow()
        })

        console.log(t.toString())
      },
    });
  }

  //
  // productId = getDefaultPrefix()
  //   ? getDefaultPrefix().slice(0,-1)
  //   : getDefaultPrefix().slice(0,-1) + productId;
  // console.log('Requesting releases for', productId);
  //

  // aha.send({
  //   apiUrl: `/products/${productId}/releases?per_page=2000`,
  //   renderer: (body) => {
  //     const data = body.releases.reverse().splice(20);
  //
  //     const t = new Table;
  //
  //     data.forEach((release) => {
  //       t.cell('Ref', release.reference_num)
  //       t.cell('Name', release.name)
  //       t.cell('Release Date', release.release_date)
  //       t.newRow()
  //     })
  //
  //     console.log(t.toString());
  //   }
  // });
}
