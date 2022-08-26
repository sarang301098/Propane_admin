import { debounce } from "lodash";

export const debounceFunction = debounce((dispatchAction: Function) => {
  dispatchAction && dispatchAction();
}, 300);
