import React from 'react';

// コンテクストの作成
export const DispatchContext = React.createContext(() => {
  throw new Error();
});

// カスタムフックの作成
export function useToggleDarkMode() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback(() => dispatch({ type: 'TOGGLE_DARKMODE' }), [dispatch]);
}
