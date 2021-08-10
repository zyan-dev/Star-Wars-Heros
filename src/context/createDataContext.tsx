import React, { useReducer } from 'react';

export type ContextParam = {
    children: Array<React.ReactNode>
}

// context function for whole app state management
export default (reducer: any, actions: any, defaultValue: any) => {
  const Context = React.createContext(defaultValue);

  // provider component wrapping all components
  const Provider = (param: any) => {
    const { children, value } = param;
    const [state, dispatch] = useReducer(reducer, { ...defaultValue, ...value });

    const boundActions: any = {};

    // action objects looped over and bound to dispatch
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
    // bound actions change state
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  // return context and provider
  return { Context, Provider };
};
