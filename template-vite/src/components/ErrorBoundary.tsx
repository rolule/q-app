import { Heading } from '@chakra-ui/react';
import { Component, PropsWithChildren, ErrorInfo } from 'react';

interface IErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  PropsWithChildren,
  IErrorBoundaryState
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught in Boundary:', error, errorInfo);
  }

  render() {
    // render fallback UI
    if (this.state.hasError) {
      return <Heading>Something went wrong. Please try again.</Heading>;
    }

    return this.props.children;
  }
}
