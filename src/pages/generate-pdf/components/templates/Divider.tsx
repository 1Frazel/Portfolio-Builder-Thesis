import { View } from "@react-pdf/renderer";

const Divider = () => {
  return (
    <View
      style={{
        height: "1px",
        backgroundColor: "#000000",
        width: "100%",
        marginTop: "4px",
        marginBottom: "10px",
      }}
    ></View>
  );
};

export default Divider;
