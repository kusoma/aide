import { Dimensions, StyleSheet } from "react-native";

export const Constant = {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
  COLORS: {
    MAROON: "#B10101",
    SHADOW_COLOR: "rgba(0,0,0,0.25)"
  }
};

export const GlobalStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    paddingVertical: 20
  },
  pillButton: {
    backgroundColor: Constant.COLORS.MAROON,
    borderRadius: 50,
    width: Constant.MAX_WIDTH / 2,
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  pillButtonWhite: {
    backgroundColor: "#C0C0C0",
    borderRadius: 50,
    width: Constant.MAX_WIDTH / 2,
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  shadow: {
    shadowColor: Constant.COLORS.SHADOW_COLOR,
    shadowOffset: { width: 3, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 12
  },
  title: {
    fontSize: 72,
    fontFamily: "Comfortaa_Bold",
    letterSpacing: 10
  },
  textField: {
    width: 300,
    marginBottom: 5,
    fontSize: 16,
    fontFamily: "Comfortaa"
  }
});
