import { StyleSheet, Dimensions, Text, View } from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';

const PDFViewAccount = ({ route }) => {
  const sourceURL = route?.params?.pdfFile;
  console.log('sourceURL: ', sourceURL);
  const source = { uri: `${sourceURL}`, cache: true };
  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          // console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          // console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          // console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

export default PDFViewAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#FFF',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
