import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'

import { Feather } from 'react-native-vector-icons'

import { convertToDollars } from '../../../utilities'

const InvestmentMetricsComponent = (props) => {
  const {
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

  const [openGMR, setOpenGMI] = useState(false)
  const [openGYR, setOpenGYR] = useState(false)
  const [openTME, setOpenTME] = useState(false)
  const [openTYE, setOpenTYE] = useState(false)
  const [openNMOI, setOpenMNOI] = useState(false)
  const [openYNOI, setOpenYNOI] = useState(false)
  const [openMCF, setOpenMCF] = useState(false)
  const [openYCF, setOpenYCF] = useState(false)
  const [openCAPR, setOpenCAPR] = useState(false)
  const [openCCR, setOpenCCR] = useState(false)
  const [openROI, setOpenROI] = useState(false)


  return (
    <View style={styles.keyDetailsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Investment Metrics</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={[styles.col, styles.extraPadding]}>
          <View style={styles.row}>
            <View style={styles.invMetricInfo}>
              <Text style={styles.text}>Gross Monthly Revenue:</Text>
              <TouchableOpacity onPress={() => {setOpenGMI(true)}}>
                <Feather style={styles.icon} size={18} name='info'/> 
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>${convertToDollars(monthlyRevenue)}</Text>
          </View>
          <Modal
            animationType="fade"
            transparent={false}
            visible={openGMR}
            onRequestClose={() => {
              setOpenGMI(!openGMR);
            }}
          >
            <View style={styles.modal}>
              <Text>Gross Monhtly Income</Text>
              <TouchableOpacity onPress={() => {setOpenGMI(false)}}><Text>X</Text></TouchableOpacity>
            </View>
          </Modal>
          <View style={styles.row}>
            <View style={styles.invMetricInfo}>
              <Text style={styles.text}>Gross Yearly Revenue:</Text>
              <TouchableOpacity onPress={() => {setOpenGYR(true)}}>
                <Feather style={styles.icon} size={18} name='info'/> 
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>${convertToDollars(yearlyRevenue)}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.invMetricInfo}>
              <Text style={styles.text}>Total Monthly Expenses:</Text>
              <TouchableOpacity onPress={() => {setOpenTME(true)}}>
                <Feather style={styles.icon} size={18} name='info'/> 
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>${convertToDollars(monthlyExpenses)}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.invMetricInfo}>
              <Text style={styles.text}>Total Yearly Expenses:</Text>
              <TouchableOpacity onPress={() => {setOpenTYE(true)}}>
                <Feather style={styles.icon} size={18} name='info'/> 
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>${convertToDollars(yearlyExpenses)}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.invMetricInfo}>
              <Text style={styles.text}>Monthly NOI:</Text>
              <TouchableOpacity onPress={() => {setOpenMNOI(true)}}>
                <Feather style={styles.icon} size={18} name='info'/> 
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>${convertToDollars(monthlyNOI)}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.invMetricInfo}>
              <Text style={styles.text}>Yearly NOI:</Text>
              <TouchableOpacity onPress={() => {setOpenYNOI(true)}}>
                <Feather style={styles.icon} size={18} name='info'/> 
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>${convertToDollars(yearlyNOI)}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.invMetricInfo}>
              <Text style={styles.text}>Monthly Cashflow:</Text>
              <TouchableOpacity onPress={() => {setOpenMCF(true)}}>
                <Feather style={styles.icon} size={18} name='info'/> 
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>${convertToDollars(monthlyCashFlow)}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.invMetricInfo}>
              <Text style={styles.text}>Yearly Cashflow:</Text>
              <TouchableOpacity onPress={() => {setOpenYCF(true)}}>
                <Feather style={styles.icon} size={18} name='info'/> 
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>${convertToDollars(yearlyCashFlow)}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.invMetricInfo}>
              <Text style={styles.text}>CAP Rate:</Text>
              <TouchableOpacity onPress={() => {setOpenCAPR(true)}}>
                <Feather style={styles.icon} size={18} name='info'/> 
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>{capRate}%</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.invMetricInfo}>
              <Text style={styles.text}>Cash On Cash Return:</Text>
              <TouchableOpacity onPress={() => {setOpenCCR(true)}}>
                <Feather style={styles.icon} size={18} name='info'/> 
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>{cashOnCashReturn}%</Text>
          </View>
          <View style={styles.lastRow}>
            <View style={styles.invMetricInfo}>
              <Text style={styles.text}>Return On Investment (1 year):</Text>
              <TouchableOpacity onPress={() => {setOpenROI(true)}}>
                <Feather style={styles.icon} size={18} name='info'/> 
              </TouchableOpacity>
            </View>
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
  icon: {
    color: 'grey',
    marginLeft: 4
  },
  invMetricInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  modal: {
    marginTop: 100
  }
})

export default InvestmentMetricsComponent