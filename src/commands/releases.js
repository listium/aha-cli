import AhaClient from '../AhaClient';
import Table from 'easy-table';

export default (productId) => {

  console.log('Requesting releases for', productId);

  const aha = new AhaClient;

  aha.send({
    apiUrl: `/products/${productId}/releases?per_page=2000`,
    renderer: (body) => {
      const data = body.releases.reverse().splice(20);

      const t = new Table;

      data.forEach((release) => {
        t.cell('Ref', release.reference_num)
        t.cell('Name', release.name)
        t.cell('Release Date', release.release_date)
        t.newRow()
      })

      console.log(t.toString());
    }
  });
}
