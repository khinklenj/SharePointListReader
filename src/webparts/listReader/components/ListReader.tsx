import * as React from 'react';
import { IListReaderProps } from './IListReaderProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

const ListReader: React.FC<IListReaderProps> = ({ spHttpClient, siteUrl }) => {
  const [items, setItems] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const url = `${siteUrl}/_api/web/lists/getbytitle('Test')/items`;

    spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Server response: ${response.status} - ${response.statusText}`);
        }
      })
      .then((data) => {
        if (data.value?.length > 0) {
          setItems(data.value);
        } else {
          setError('No items found or list is empty.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching items from the Test list.');
      });
  }, []);

  return (
    <div>
      <h2>Test List Items</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item.Title || '(no title)'}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListReader;
