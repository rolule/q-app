import { FunctionComponent } from 'react';

export type VariablePath = `:${string}`;
export type PathPart = '/' | '*' | VariablePath | string;

export type Page = {
  path: readonly PathPart[];
  parent?: Page;
  Component: FunctionComponent;
};
