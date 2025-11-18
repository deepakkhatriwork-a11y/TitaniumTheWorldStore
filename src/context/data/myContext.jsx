import { createContext } from 'react';

const defaultContextValue = {
  state: { name: '', class: '' },
  myColor: 'red',
  mode: 'light',
  toggleMode: () => {},
};

const myContext = createContext(defaultContextValue);
export default myContext;
