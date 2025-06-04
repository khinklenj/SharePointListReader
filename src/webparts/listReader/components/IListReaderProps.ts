import { SPHttpClient } from '@microsoft/sp-http';

export interface IListReaderProps {
  spHttpClient: SPHttpClient;
  siteUrl: string;
}
