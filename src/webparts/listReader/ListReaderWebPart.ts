import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import ListReader from './components/ListReader';
import { IListReaderProps } from './components/IListReaderProps';

export default class ListReaderWebPart extends BaseClientSideWebPart<{}> {
  public render(): void {
    const element: React.ReactElement<IListReaderProps> = React.createElement(ListReader, {
      spHttpClient: this.context.spHttpClient,
      siteUrl: this.context.pageContext.web.absoluteUrl
    });

    ReactDom.render(element, this.domElement);
  }
}
