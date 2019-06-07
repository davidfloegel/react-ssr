import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  serverData?: any;
}

interface State {
  data?: any;
  isLoading: boolean;
}

export default function SSR<T,>(Page: any) {
  class SSR extends React.Component<Props, State> {
    private ignoreLastFetch: boolean;

    static displayName: string;

    static getInitialData(match: any) {
      return Page.getInitialData
        ? Page.getInitialData(match)
        : Promise.resolve(null);
    }

    constructor(props: Props) {
      super(props);

      this.state = {
        data: props.serverData || null,
        isLoading: false
      };
      this.ignoreLastFetch = false;
    }

    componentDidMount() {
      if (!this.state.data) {
        this.fetchData();
      }
    }

    componentWillUnmount() {
      this.ignoreLastFetch = true;
    }

    async fetchData() {
      if (!this.ignoreLastFetch) {
        this.setState({ isLoading: true });

        try {
          const data = await this.constructor.getInitialData({
            match: this.props.match
          });
          this.setState({ data: data.data, isLoading: false });
        } catch (error) {
          this.setState({ data: error, isLoading: false });
        }
      }
    }

    render() {
      // Flatten out all the props.
      const { serverData, ...rest } = this.props;

      //  if we wanted to create an app-wide error component,
      //  we could also do that here using <HTTPStatus />. However, it is
      //  more flexible to leave this up to the Routes themselves.
      //
      // if (rest.error && rest.error.code) {
      //   <HttpStatus statusCode={rest.error.code || 500}>
      //     {/* cool error screen based on status code */}
      //   </HttpStatus>
      // }

      return (
        <Page
          {...rest}
          refetch={() => this.fetchData()}
          isLoading={this.state.isLoading}
          data={this.state.data}
        />
      );
    }
  }

  SSR.displayName = `SSR(${getDisplayName(Page)})`;
  return SSR;
}

function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

