export default interface Route {
  path: string;
  exact: boolean;
  component: any;
  private?: boolean;
}
