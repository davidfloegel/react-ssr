import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  serverData?: any;
}

interface IState {
  data?: any;
  isLoading: boolean;
}

export default function PrerenderHOC<T>(Page: any) {
  class Prerender extends React.Component<IProps, IState> {
    public static displayName: string;

    public static getInitialData(match: any) {
      return Page.getInitialData
        ? Page.getInitialData(match)
        : Promise.resolve(null);
    }
    private ignoreLastFetch: boolean;

    constructor(props: IProps) {
      super(props);

      this.state = {
        data: props.serverData || null,
        isLoading: false
      };
      this.ignoreLastFetch = false;
    }

    public componentDidMount() {
      if (!this.state.data) {
        this.fetchData();
      }
    }

    public componentWillUnmount() {
      this.ignoreLastFetch = true;
    }

    public async fetchData() {
      if (!this.ignoreLastFetch) {
        this.setState({ isLoading: true });

        try {
          const data = await Prerender.getInitialData({
            match: this.props.match
          });
          this.setState({ data: data.data, isLoading: false });
        } catch (error) {
          this.setState({ data: error, isLoading: false });
        }
      }
    }

    public render() {
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

  Prerender.displayName = `Prerender(${getDisplayName(Page)})`;
  return Prerender;
}

function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
