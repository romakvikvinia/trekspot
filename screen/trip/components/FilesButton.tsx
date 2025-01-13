import * as WebBrowser from "expo-web-browser";
import { StyleSheet, Text, View } from "react-native";

import { FloatingActionButton } from "../../../components/common/FloatingButtons";
import { COLORS } from "../../../styles/theme";
import {
  AttachedFileIcon,
  PDFLinearIcon,
} from "../../../utilities/SvgIcons.utility";
import { tripDetailStyles } from "../_tripDetailStyles";

export const FilesButton = () => {
  const _handleShowFileAsync = async (url) => {
    const result = await WebBrowser.openBrowserAsync(url, {
      enableBarCollapsing: true,
    });
  };

  return (
    <FloatingActionButton
      withHeader={true}
      title="Files"
      buttonsContainerStyle={{
        right: 10,
        top: 0,
        width: 200,
        height: 200,
      }}
      overlayBGOpacity={0.2}
      buttons={[
        {
          label: "Booking reference file",
          onPress: () =>
            _handleShowFileAsync("https://pdfobject.com/pdf/sample.pdf"),
          icon: PDFLinearIcon,
          isDanger: false,
          image: null
        },
        {
          label: "Another file title",
          onPress: () =>
            _handleShowFileAsync("https://pdfobject.com/pdf/sample.pdf"),
          icon: PDFLinearIcon,
          isDanger: false,
          image: null
        },
        {
            label: "Tickets image",
            onPress: () =>
              _handleShowFileAsync("https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg"),
            icon: null,
            isDanger: false,
            image: "https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg"
          },
      ]}
      renderTrigger={() => (
        <View style={styles.showFilesButton}>
          <View style={tripDetailStyles.iconWrapper}>
            <AttachedFileIcon size={15} color={COLORS.gray} />
          </View>
          <Text style={styles.showFilesButtonText}>Files</Text>
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  showFilesButton: {
    alignItems: "center",
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    marginLeft: 6,
    paddingHorizontal: 3,
    paddingVertical: 0,
  },
  showFilesButtonText: {
    color: COLORS.gray,
    fontSize: 11,
    fontWeight: "600",
  },
});
