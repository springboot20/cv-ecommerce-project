import React, { Component } from 'react';
import { ErrorUI } from './Error';
import { toast } from 'react-toastify';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ hasError: true });
    toast(error.message, { type: 'error' });

    console.log(errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorUI />;
    }

    return this.props.children;
  }
}
