import * as React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        flexDirection: `row`,
        backgroundColor: `#E4E4E4`
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
})

export const PdfDocument = () => {
    return (
        <Document>
            <Page size={`A4`} style={styles.page} wrap={false}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2 </Text>
                </View>
            </Page>
        </Document>
    )
}

export const PdfViewer = ({ width = `100%`, height = `500px` }: any) => {
    return (
        <PDFViewer
            width={width}
            height={height}>
            <PdfDocument />
        </PDFViewer>
    )
}

