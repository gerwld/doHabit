import React from "react";
import { PLATFORM } from "@constants";

const useInputFocusOnInit = (inputRef, delay = 600) => {
    React.useEffect(() => {
        // sets focus on first input
        let timer;
        const isAddOnMobile = (PLATFORM === "ios" || PLATFORM === "android");
        if (isAddOnMobile) {
          timer = setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();  // Focus on TextInput after delay
            }
          }, PLATFORM === "android" ? (delay / 2) : delay );
        }
    
        return () => clearTimeout(timer);
      }, []);

}

export default useInputFocusOnInit;