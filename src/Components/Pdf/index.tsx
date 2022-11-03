import * as React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import get from 'lodash/get';

const styles = StyleSheet.create({
  page: {
    backgroundColor: `#E4E4E4`,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: `black`,
  },
  headerRow: {
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
  },
  headerColumn: {
    padding: 1,
    margin: 1,
    fontSize: 12,
    fontWeight: `bold`,
  },
  body: {},
  bodyRow: {
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
  },
  bodyColumn: {
    padding: 1,
    margin: 1,
    fontSize: 12,
  },
});

export const PdfDocument = ({
  properties,
  header,
  body,
  list,
  tableWidth,
}: any) => {
  return (
    <Document>
      <Page size={`A4`} style={styles.page} wrap={false}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            {['sl', ...properties].map((column: string, index: number) => {
              if (column == 'sl') {
                return (
                  <View
                    key={index}
                    style={{
                      ...styles.headerColumn,
                      width: 100,
                    }}>
                    <Text style={{ fontWeight: `bold` }}>SL</Text>
                  </View>
                );
              }
              return (
                <View
                  key={index}
                  style={{
                    ...styles.headerColumn,
                    width: tableWidth[column],
                  }}>
                  <Text style={{ fontWeight: `bold` }}>
                    {get(header, column, '')}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.body}>
          {list.map((row: string, rowIndex: number) => {
            return (
              <View key={rowIndex} style={styles.bodyRow}>
                {['sl', ...properties].map(
                  (column: string, columnIndex: number) => {
                    if (column == 'sl') {
                      return (
                        <View
                          key={columnIndex}
                          style={{
                            ...styles.bodyColumn,
                            width: 100,
                          }}>
                          <Text>{rowIndex + 1}</Text>
                        </View>
                      );
                    }
                    return (
                      <View
                        key={columnIndex}
                        style={{
                          ...styles.bodyColumn,
                          width: tableWidth[column],
                        }}>
                        <Text>{body({ row, column, Text, View })}</Text>
                      </View>
                    );
                  },
                )}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export const PdfViewer = ({
  width = `100%`,
  height = `500px`,
  list = [],
  properties = [],
  header = {},
  body = () => {},
  tableWidth = {},
}: any) => {
  return (
    <PDFViewer width={width} height={height}>
      <PdfDocument
        list={list}
        properties={properties}
        header={header}
        tableWidth={tableWidth}
        body={body}
      />
    </PDFViewer>
  );
};
