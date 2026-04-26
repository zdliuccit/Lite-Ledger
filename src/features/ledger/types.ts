export type MainTabKey = 'home' | 'bills' | 'add-record' | 'report' | 'mine';

export type LedgerRoute =
  | '/home'
  | '/bills'
  | '/add-record'
  | '/statistics'
  | '/budget'
  | '/accounts'
  | '/assets'
  | '/report'
  | '/mine';

export type LedgerPageDefinition = {
  route: LedgerRoute;
  title: string;
  mainTab: MainTabKey;
};
