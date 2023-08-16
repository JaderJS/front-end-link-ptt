import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        padding: 20,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        marginBottom: 3,
    },
});

const Pdf = ({ values }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Seção de dados do cliente */}
            <View style={styles.section}>
                <Text style={styles.title}>Dados do cliente</Text>
                {/* ... Inclua os campos de dados do cliente aqui */}
            </View>

            {/* Seção da tabela de orçamento */}
            <View style={styles.section}>
                <Text style={styles.title}>Orçamento</Text>
                {/* ... Inclua a tabela de orçamento aqui */}
            </View>

            {/* Seção do valor total */}
            <View style={styles.section}>
                <Text style={styles.title}>Valor Total</Text>
                <Text style={styles.text}>R$ {values.reduce((sum, val) => sum + +val.val, 0)}</Text>
            </View>
        </Page>
    </Document>
);

export default Pdf;
