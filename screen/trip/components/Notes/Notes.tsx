import React, { useRef } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";

export const Notes = () => {
  const _editor = useRef();

  return (
    <>
      <QuillEditor
        style={styles.editor}
        ref={_editor}
        initialHtml="<h1>Quill Editor for react-native</h1>"
      />
      <QuillToolbar editor={_editor} options="full" theme="light" />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "red",
    minHeight: "100%",
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: "gray",
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: "white",
  },
});
