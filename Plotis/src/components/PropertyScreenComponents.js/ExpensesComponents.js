import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

import EditMortgages from '../ExpensesComponents/EditMortgages'
import MortgageInsuranceComponent from '../ExpensesComponents/MortgageInsuranceComponent'
import HomeInsuranceComponent from '../ExpensesComponents/HomeInsuranceComponent'
import TaxComponent from '../ExpensesComponents/TaxComponent'
import HOAComponent from '../ExpensesComponents/HOAComponent'
import AdditionalExpensesComponent from '../ExpensesComponents/AdditionalExpensesComponent'
import UtilitiesComponent from '../ExpensesComponents/UtilitiesComponent'
import OtherExpensesComponent from '../ExpensesComponents/OtherExpensesComponent'

const ExpensesComponents = (props) => {
  const {
    currentHome
  } = props

  const [mortgage, setMortgage] = useState()
  const [mortgageInsurance, setMortgageInsurance] = useState()
  const [homeInsurance, setMortageInsurance] = useState()
  const [propertyTax, setPropertyTax] = useState()
  const [hoa, setHoa] = useState()
  const [utilities, setUtilities] = useState()
  const [additionalExpenses, setAdditionalExpenses] = useState()

  return (
    <View style={styles.keyDetailsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Expenses</Text>
        <Text style={styles.label}>$4,556</Text>
      </View>
      <View style={styles.separateContainer}></View>
      <EditMortgages currentHome={currentHome} mortgage={mortgage}/>
      <View style={styles.separateContainer}></View>
      <MortgageInsuranceComponent currentHome={currentHome}/>
      <View style={styles.separateContainer}></View>
      <HomeInsuranceComponent currentHome={currentHome} />
      <View style={styles.separateContainer}></View>
      <TaxComponent currentHome={currentHome} />
      <View style={styles.separateContainer}></View>
      <HOAComponent currentHome={currentHome} />
      <View style={styles.separateContainer}></View>
      <UtilitiesComponent currentHome={currentHome}/>
      <View style={styles.separateContainer}></View>
      <OtherExpensesComponent currentHome={currentHome} />
    </View>
  )
}

const styles = StyleSheet.create({
  keyDetailsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 24,
    paddingHorizontal: 8,
    justifyContent: 'space-between'
  },
  headerContainer: {
    width: '100%',
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 22,
    fontWeight: '700'
  },
  separateContainer: {
    width: '94%',
    marginLeft: '3%',
    height: 2,
    backgroundColor: 'grey',
    marginVertical: 8
  }
})

export default ExpensesComponents