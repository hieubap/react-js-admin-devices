import { useState } from "react";

function useHookState(initState = {}) {
  const [state, _setState] = useState(initState);
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  return { state, setState };
}

export default useHookState;
