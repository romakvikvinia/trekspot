import WebView from "react-native-webview";
import { SIZES } from "../../styles/theme";
const Agreement = () => {
  return (
    <WebView
      source={{ uri: "https://shavnabada.schoolbook.ge/Privacy" }}
      style={{
        marginTop: 0,
        borderTopLeftRadius: SIZES.radius,
        borderTopRightRadius: SIZES.radius,
        height: 400,
      }}
    />
  );
};
export default Agreement;
