import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { IPersonalDetail } from "../../input/personalDetail";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexFlow: 1,
  },
});

const AtsDocument = ({
  personalDetail,
}: {
  personalDetail: IPersonalDetail;
}) => {
  const { firstName } = personalDetail;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{firstName}</Text>
          <Text>Section #2</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean erat
            sem, mollis feugiat diam non, tincidunt interdum velit. Aliquam eu
            cursus leo. Proin sem justo, placerat at mi at, rutrum iaculis
            neque. Etiam quis erat quis orci blandit suscipit. Morbi feugiat
            nibh est, ut consequat dui dapibus vel. Morbi tempus sem non leo
            euismod varius quis et nunc. Etiam tempus fringilla purus, vel
            ultrices sapien cursus quis. Nullam ipsum lorem, vestibulum et urna
            vel, commodo semper lorem. Duis dignissim leo sed nisl ultrices, sit
            amet euismod orci sollicitudin. Suspendisse potenti. Nam semper
            laoreet aliquet. Aenean luctus dolor non sodales faucibus. Etiam
            mattis commodo leo. Nam urna nisl, lacinia ut purus non, accumsan
            hendrerit est. Donec aliquam dui nec suscipit sollicitudin. Sed
            varius ligula tortor, in ornare diam ultrices sit amet. Integer nec
            tellus eu purus vehicula tincidunt et nec diam. Proin maximus nisi
            non ex accumsan rhoncus. Maecenas imperdiet sem quis ipsum molestie
            vulputate. Pellentesque eleifend nec mi a gravida. Nunc non gravida
            nisi, eu tincidunt nisi. Nunc tincidunt finibus quam at aliquet. Nam
            venenatis auctor interdum. Donec viverra massa sem, ac congue erat
            vehicula at. Donec eu ultricies mauris. Proin ac lectus et est
            posuere tristique sit amet eu lacus. Aliquam erat volutpat. Nunc
            blandit tellus vel nisi posuere fringilla. Nam porttitor enim et
            magna ullamcorper vulputate. Ut sit amet diam et justo aliquet
            imperdiet. Proin id massa leo. Aenean a scelerisque nibh. Curabitur
            lacinia eros dignissim venenatis vestibulum. Nulla et libero et elit
            ultricies volutpat. Donec dictum magna ut arcu dictum, mattis mollis
            risus finibus. Duis mollis dolor eu viverra semper. Donec volutpat,
            lacus quis finibus mollis, est augue iaculis tortor, nec rhoncus
            quam purus ac sem. Nullam eget est eleifend, facilisis ipsum et,
            sollicitudin lorem. Nunc id nunc non nibh gravida efficitur. Mauris
            luctus enim quis elit congue porttitor. Nulla scelerisque dui vitae
            tellus congue rhoncus. Phasellus feugiat urna id lacinia cursus.
            Donec non turpis ut ex fermentum fringilla. Vestibulum scelerisque
            dui vel pulvinar ultricies. Nulla facilisi. Donec sit amet purus
            purus. Sed finibus ligula in felis mollis lacinia. Quisque vitae
            volutpat diam. Donec euismod viverra justo. Cras mollis euismod
            massa eu auctor. Sed eu lobortis sem. Vestibulum neque sem,
            ultricies non nunc ut, porttitor dapibus velit. Nullam laoreet,
            dolor sed condimentum egestas, mauris eros mattis neque, ut rutrum
            nisl metus quis purus. Quisque faucibus ultricies convallis.
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam
            vitae lacinia lorem. Praesent sollicitudin ut eros at cursus.
            Aliquam in mollis elit, sed cursus velit.
          </Text>

          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean erat
            sem, mollis feugiat diam non, tincidunt interdum velit. Aliquam eu
            cursus leo. Proin sem justo, placerat at mi at, rutrum iaculis
            neque. Etiam quis erat quis orci blandit suscipit. Morbi feugiat
            nibh est, ut consequat dui dapibus vel. Morbi tempus sem non leo
            euismod varius quis et nunc. Etiam tempus fringilla purus, vel
            ultrices sapien cursus quis. Nullam ipsum lorem, vestibulum et urna
            vel, commodo semper lorem. Duis dignissim leo sed nisl ultrices, sit
            amet euismod orci sollicitudin. Suspendisse potenti. Nam semper
            laoreet aliquet. Aenean luctus dolor non sodales faucibus. Etiam
            mattis commodo leo. Nam urna nisl, lacinia ut purus non, accumsan
            hendrerit est. Donec aliquam dui nec suscipit sollicitudin. Sed
            varius ligula tortor, in ornare diam ultrices sit amet. Integer nec
            tellus eu purus vehicula tincidunt et nec diam. Proin maximus nisi
            non ex accumsan rhoncus. Maecenas imperdiet sem quis ipsum molestie
            vulputate. Pellentesque eleifend nec mi a gravida. Nunc non gravida
            nisi, eu tincidunt nisi. Nunc tincidunt finibus quam at aliquet. Nam
            venenatis auctor interdum. Donec viverra massa sem, ac congue erat
            vehicula at. Donec eu ultricies mauris. Proin ac lectus et est
            posuere tristique sit amet eu lacus. Aliquam erat volutpat. Nunc
            blandit tellus vel nisi posuere fringilla. Nam porttitor enim et
            magna ullamcorper vulputate. Ut sit amet diam et justo aliquet
            imperdiet. Proin id massa leo. Aenean a scelerisque nibh. Curabitur
            lacinia eros dignissim venenatis vestibulum. Nulla et libero et elit
            ultricies volutpat. Donec dictum magna ut arcu dictum, mattis mollis
            risus finibus. Duis mollis dolor eu viverra semper. Donec volutpat,
            lacus quis finibus mollis, est augue iaculis tortor, nec rhoncus
            quam purus ac sem. Nullam eget est eleifend, facilisis ipsum et,
            sollicitudin lorem. Nunc id nunc non nibh gravida efficitur. Mauris
            luctus enim quis elit congue porttitor. Nulla scelerisque dui vitae
            tellus congue rhoncus. Phasellus feugiat urna id lacinia cursus.
            Donec non turpis ut ex fermentum fringilla. Vestibulum scelerisque
            dui vel pulvinar ultricies. Nulla facilisi. Donec sit amet purus
            purus. Sed finibus ligula in felis mollis lacinia. Quisque vitae
            volutpat diam. Donec euismod viverra justo. Cras mollis euismod
            massa eu auctor. Sed eu lobortis sem. Vestibulum neque sem,
            ultricies non nunc ut, porttitor dapibus velit. Nullam laoreet,
            dolor sed condimentum egestas, mauris eros mattis neque, ut rutrum
            nisl metus quis purus. Quisque faucibus ultricies convallis.
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam
            vitae lacinia lorem. Praesent sollicitudin ut eros at cursus.
            Aliquam in mollis elit, sed cursus velit.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default AtsDocument;
