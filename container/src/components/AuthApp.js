import { mount } from "auth/AuthApp";

import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
useHistory;

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
          console.log(
            "Container noticed navigation in marketing app",
            nextPathname,
          );
        }
      },
      onSignIn: () => {
        onSignIn();
        console.log("User signed in...!");
      },
    });
    history.listen(onParentNavigate);
  });
  return <div ref={ref}></div>;
};
