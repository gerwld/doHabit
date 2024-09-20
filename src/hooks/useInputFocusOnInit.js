import React from "react";
import { Platform } from "react-native";

const useInputFocusOnInit = (inputRef, delay = 600) => {
    React.useEffect(() => {
        // sets focus on first input
        let timer;
        const platform = Platform.OS;
        const isAddOnMobile = (platform === "ios" || platform === "android");
        if (isAddOnMobile) {
          timer = setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();  // Focus on TextInput after delay
            }
          }, platform === "android" ? (delay / 2) : delay );
        }
    
        return () => clearTimeout(timer);
      }, []);

}

export default useInputFocusOnInit;