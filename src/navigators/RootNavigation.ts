import * as React from 'react';

export const rootNavigationRef: any = React.createRef();

export const RootNavigation = {
  goBack: () => (rootNavigationRef.current as any)?.goBack(),
  navigate: (name: string, params: any) => {
    (rootNavigationRef.current as any)?.navigate(name, params);
  },
  reset: (name: string, params: any) => {
    (rootNavigationRef.current as any)?.reset({
      index: 0,
      routes: [{ name, params }],
    });
  },
};
