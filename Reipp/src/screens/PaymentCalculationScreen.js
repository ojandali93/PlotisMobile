import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

import Slider from '@react-native-community/slider';

import { calculateLoanAmount, calculateDownPaymentAmount } from '../components/ExpensesComponents/metrics';
import { calculateClosingCost, calculateDynamicMortgagePayment } from '../components/ExpensesComponents/metrics';


const PaymentCalculationScreen = () => {

  const [totalHomeInsurance, setTotalHomeInsurance] = useState(1400)
  const [totalHoa, setTotalHoa] = useState(0)
  const [homePrice, setHomePrice] = useState(550000)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [interestRate, setInterestRate] = useState(5.3)
  const [propertyTax, setPropertyTax] = useState(1.1)
  const [loanTerm, setLoanTerm] = useState(30)
  const [homeInsurance, setHomeInsurance] = useState(1400)
  const [monthlyPropertyTax, setMonthlyPropertyTax] = useState()
  
  const [totalPandI, setTotalPandI] = useState()
  const [totalPropTax, setTotalPropTax] = useState(Math.round((homePrice * (propertyTax/100))/12))
  const [totalPayment, setTotalPayment] = useState()

  useEffect(() => {
    let initialDownPayment = calculateDownPaymentAmount(homePrice, downPaymentPercent)
    let initialLoanAmount = calculateLoanAmount(homePrice, initialDownPayment)
    let closingCost = calculateClosingCost(initialLoanAmount)
    let mortgagePayment = calculateDynamicMortgagePayment(initialLoanAmount, interestRate, loanTerm)
    setTotalPayment(totalPropTax + totalPandI + totalHomeInsurance + totalHoa)
  }, [])

  useEffect(() => {
    let downPayment = calculateDownPaymentAmount(homePrice, downPaymentPercent)
    let loanAmount = calculateLoanAmount(homePrice, downPayment)
    let closingCost = calculateClosingCost(loanAmount)
    let mortgagePayment = calculateDynamicMortgagePayment(loanAmount, interestRate, loanTerm)
  }, [homePrice, downPaymentPercent, interestRate, loanTerm])

  useEffect(() => {
    setTotalPropTax(Math.round((homePrice * (propertyTax/100))/12))
  }, [propertyTax])

  useEffect(() => {
    setTotalHomeInsurance(Math.round(homeInsurance/12))
  }, [homeInsurance])

  useEffect(() => {
    setTotalPayment(totalPropTax + totalPandI + totalHomeInsurance + totalHoa)
  }, [totalPropTax, totalPandI, totalHomeInsurance, totalHoa])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Payment Calculator: </Text>
      </View>
      <View style={styles.totalContainer}>
        <View style={styles.row}>
          <Text style={styles.headerLabel}>Total Payment</Text>
          <Text style={styles.headerLabel}>${totalPayment}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Monthly Principle & Interest</Text>
          <Text style={styles.label}>${totalPandI}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Monthly Property Tax</Text>
          <Text style={styles.label}>${totalPropTax}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Monthly Home Insurance</Text>
          <Text style={styles.label}>${totalHomeInsurance}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Monthly HOA</Text>
          <Text style={styles.label}>${totalHoa}</Text>
        </View>
      </View>

      <View style={styles.separater}></View>

      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <View style={styles.sectionLabel}>
              <Text style={styles.label}>Home Price:</Text>
              <Text style={styles.label}>${homePrice}</Text>
            </View>
            <Slider
              value={homePrice}
              style={styles.slider}
              step={50000}
              minimumValue={0}
              maximumValue={10000000}
              onValueChange={(value) => setHomePrice(value)}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.sectionLabel}>
              <Text style={styles.label}>Down Payment:</Text>
              <Text style={styles.label}>{downPaymentPercent}%</Text>
            </View>
            <Slider
              value={downPaymentPercent}
              style={styles.slider}
              step={1}
              minimumValue={0}
              maximumValue={100}
              onValueChange={(value) => setDownPaymentPercent(value)}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.sectionLabel}>
              <Text style={styles.label}>Interest Rate:</Text>
              <Text style={styles.label}>{interestRate}%</Text>
            </View>
            <Slider
              value={interestRate}
              style={styles.slider}
              step={.1}
              minimumValue={0}
              maximumValue={10}
              onValueChange={(value) => setInterestRate(value.toFixed(1))}
            />
          </View>
          <View style={styles.content}>
            <View>
              <Text style={styles.label}>Loan Type:</Text>
            </View>
            {
              loanTerm == 30 ?  <View style={styles.optionContainer}>
                                  <TouchableOpacity style={[styles.options, styles.blue]} onPress={() => {setLoanTerm(30)}}>
                                    <Text style={[styles.label, styles.white]}>30 Year</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={styles.options} onPress={() => {setLoanTerm(20)}}>
                                    <Text style={styles.label}>20 Year</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={styles.options} onPress={() => {setLoanTerm(15)}}>
                                    <Text style={styles.label}>15 Year</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={styles.options} onPress={() => {setLoanTerm(10)}}>
                                    <Text style={styles.label}>10 Year</Text>
                                  </TouchableOpacity>
                                </View>
                              : loanTerm == 20 ?  <View style={styles.optionContainer}>
                                                    <TouchableOpacity style={styles.options} onPress={() => {setLoanTerm(30)}}>
                                                      <Text style={styles.label}>30 Year</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={[styles.options, styles.blue]} onPress={() => {setLoanTerm(20)}}>
                                                      <Text style={[styles.label, styles.white]}>20 Year</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.options} onPress={() => {setLoanTerm(15)}}>
                                                      <Text style={styles.label}>15 Year</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.options} onPress={() => {setLoanTerm(10)}}>
                                                      <Text style={styles.label}>10 Year</Text>
                                                    </TouchableOpacity>
                                                  </View>
                                               :  loanTerm == 15 ?  <View style={styles.optionContainer}>
                                                                      <TouchableOpacity style={styles.options} onPress={() => {setLoanTerm(30)}}>
                                                                        <Text style={styles.label}>30 Year</Text>
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={styles.options} onPress={() => {setLoanTerm(20)}}>
                                                                        <Text style={styles.label}>20 Year</Text>
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={[styles.options, styles.blue]} onPress={() => {setLoanTerm(15)}}>
                                                                        <Text style={[styles.label, styles.white]}>15 Year</Text>
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={styles.options} onPress={() => {setLoanTerm(10)}}>
                                                                        <Text style={styles.label}>10 Year</Text>
                                                                      </TouchableOpacity>
                                                                    </View>
                                                                 :  <View style={styles.optionContainer}>
                                                                      <TouchableOpacity style={styles.options} onPress={() => {setLoanTerm(30)}}>
                                                                        <Text style={styles.label}>30 Year</Text>
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={styles.options} onPress={() => {setLoanTerm(20)}}>
                                                                        <Text style={styles.label}>20 Year</Text>
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={styles.options} onPress={() => {setLoanTerm(15)}}>
                                                                        <Text style={styles.label}>15 Year</Text>
                                                                      </TouchableOpacity>
                                                                      <TouchableOpacity style={[styles.options, styles.blue]} onPress={() => {setLoanTerm(10)}}>
                                                                        <Text style={[styles.label, styles.white]}>10 Year</Text>
                                                                      </TouchableOpacity>
                                                                    </View>
            }
          </View>
          <View style={styles.content}>
            <View style={styles.sectionLabel}>
              <Text style={styles.label}>Property Tax Rate:</Text>
              <Text style={styles.label}>{propertyTax}%</Text>
            </View>
            <Slider
              value={propertyTax}
              style={styles.slider}
              step={.1}
              minimumValue={0}
              maximumValue={10}
              onValueChange={(value) => setPropertyTax(value.toFixed(1))}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.sectionLabel}>
              <Text style={styles.label}>Home Owners Insurance:</Text>
              <Text style={styles.label}>${totalHomeInsurance}</Text>
            </View>
            <Slider
              value={homeInsurance}
              style={styles.slider}
              step={100}
              minimumValue={0}
              maximumValue={10000}
              onValueChange={(value) => setHomeInsurance(value)}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.sectionLabel}>
              <Text style={styles.label}>HOA Fees:</Text>
              <Text style={styles.label}>${totalHoa}</Text>
            </View>
            <Slider
              value={totalHoa}
              style={styles.slider}
              step={25}
              minimumValue={0}
              maximumValue={10000}
              onValueChange={(value) => setTotalHoa(value)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 44
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    marginBottom: 8
  },
  headerText: {
    fontSize: 22,
    marginLeft: 16,
    fontWeight: '700'
  },
  totalContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 8
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  headerLabel: {
    fontSize: 22,
    fontWeight: '600',
  },
  label: {
    fontSize: 17,
    fontWeight: '500'
  },
  separater: {
    height: 2,
    width: '100%',
    backgroundColor: 'lightgrey'
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 8
  },
  sectionLabel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  content: {
    marginTop: 8
  },
  optionContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 8,
    backgroundColor: 'lightgrey'
  },
  options: {
    width: '25%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8
  },
  blue: {
    backgroundColor: 'blue'
  },
  white: {
    color: 'white'
  }
})

export default PaymentCalculationScreen