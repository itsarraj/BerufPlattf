import { makeStore } from './store';

export const makeServerStore = () => {
  return makeStore();
};

export type ServerStore = ReturnType<typeof makeServerStore>;