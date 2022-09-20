import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

import { convertToDollars } from '../../../utilities'

const InvestmentMetricsComponent = (props) => {
  const {
    currentHome,
    monthlyRevenue,
    yearlyRevenue,
    monthlyExpenses,
    yearlyExpenses,
    monthlyNOI,
    yearlyNOI,
    capRate,
    monthlyCashFlow,
    yearlyCashFlow,
    cashOnCashReturn,
    year1ROI
  } = props

  return (
    <View style={styles.keyDetailsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Investment Metrics</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={[styles.col, styles.extraPadding]}>
          <View style={styles.row}>
            <Text style={styles.text}>Gross Monthly Revenue:</Text>
            <Text style={styles.text}>${convertToDollars(monthlyRevenue)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Gross Yearly Revenue:</Text>
            <Text style={styles.text}>${convertToDollars(yearlyRevenue)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Total Monthly Expenses: </Text>
            <Text style={styles.text}>${convertToDollars(monthlyExpenses)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Total Yearly Expenses:</Text>
            <Text style={styles.text}>${convertToDollars(yearlyExpenses)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Monthly NOI:</Text>
            <Text style={styles.text}>${convertToDollars(monthlyNOI)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Yearly NOI:</Text>
            <Text style={styles.text}>${convertToDollars(yearlyNOI)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Monthly Cashflow:</Text>
            <Text style={styles.text}>${convertToDollars(monthlyCashFlow)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Yearly Cashflow:</Text>
            <Text style={styles.text}>${convertToDollars(yearlyCashFlow)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>CAP Rate:</Text>
            <Text style={styles.text}>{capRate}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Cash on Cash Return:</Text>
            <Text style={styles.text}>{cashOnCashReturn}%</Text>
          </View>
          <View style={styles.lastRow}>
            <Text style={styles.text}>Return on Investment:</Text>
            <Text style={styles.text}>{year1ROI}%</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  keyDetailsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 24,
    paddingLeft: 8,
    justifyContent: 'space-between'
  },
  headerContainer: {
    width: '100%',
    marginBottom: 16
  },
  label: {
    fontSize: 22,
    fontWeight: '700'
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  col: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 8,
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1

  },
  lastRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 17,
    fontWeight: '500'
  },
})

export default InvestmentMetricsComponent