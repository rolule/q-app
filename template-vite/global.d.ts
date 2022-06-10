import { FunctionComponent } from 'react';

declare global {
  interface IPage extends FunctionComponent {
    path: string;
  }
}
