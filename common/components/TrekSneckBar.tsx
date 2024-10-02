import React, { useEffect, useState } from "react";
import { Portal, Snackbar } from "react-native-paper";

export type TrekSneckBarProps = {
  isVisible?: boolean;
  message: string;
};

export const TrekSneckBar: React.FC<TrekSneckBarProps> = (props) => {
  const [state, setState] = useState({ isVisible: !!props.isVisible });

  const onDismissSnackBar = () =>
    setState((prevState) => ({ ...prevState, isVisible: false }));

  useEffect(() => {
    if (props.isVisible) {
      setState((prevState) => ({
        ...prevState,
        isVisible: !!props.isVisible,
      }));
    }
  }, [props.isVisible]);
  return (
    <Portal>
      <Snackbar
        visible={state.isVisible}
        onDismiss={onDismissSnackBar}
        duration={4000}
        // action={{
        //   label: "Undo",
        //   onPress: () => {
        //     // Do something
        //   },
        // }}
      >
        {props.message}
      </Snackbar>
    </Portal>
  );
};
