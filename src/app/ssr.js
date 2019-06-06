import React from 'react';

export default function SSR(Page) {
  class SSR extends React.Component {
    static getInitialData(ctx) {
      return Page.getInitialData
        ? Page.getInitialData(ctx)
        : Promise.resolve(null);
    }

    constructor(props) {
      super(props);

      this.state = {
        data: props.serverData || null,
        isLoading: false
      };
      this.ignoreLastFetch = false;
    }

    componentDidMount() {
      console.log('mount', this.state.data);
      if (!this.state.data) {
        this.fetchData();
      }
    }

    componentWillUnmount() {
      console.log('unmount higherorder')
      this.ignoreLastFetch = true;
    }

    fetchData() {
      if (!this.ignoreLastFetch) {
        this.setState({ isLoading: true });
        this.constructor.getInitialData({ match: this.props.match }).then(
          data => {
            this.setState({ data, isLoading: false });
          },
          error => {
            this.setState(state => ({
              data: { error },
              isLoading: false
            }));
          }
        );
      }
    }

    render() {
      // Flatten out all the props.
      const { serverData, ...rest } = this.props;

      console.log('ssr higher order', this.state)

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

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
