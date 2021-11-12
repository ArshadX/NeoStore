import React from 'react';

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 2,
  },
  footer: {
    flex: 20,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  linearContainer: {
    flex: 2,
  },
  titleHeader: {
    fontSize: 50,
    fontWeight: '700',
    color: '#000000',
  },
  titleFooter: {
    fontSize: 15,
    fontWeight: '100',
    color: '#000000',
    fontWeight: '300',
  },
  section: {
    marginBottom: 30,
    marginTop: 15,
  },
  sectionSignIn: {
    marginBottom: 10,
    marginTop: 15,
  },

  textStyle: {
    color: '#000000',
  },
  linkText: {
    flexDirection: 'row',
    color: '#4169e1',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#4169e1',
  },
  textInputViewStyle: {
    marginBottom: 3,
  },
  textInputStyle: {
    backgroundColor: '#ffffff',
    textDecorationLine: 'none',
  },
  checkbox: {
    flexDirection: 'row',
  },
  checkboxText1: {
    color: '#000000',
    fontSize: 15,
    marginTop: 5,
    marginRight: 10,
  },
  checkboxText2: {
    color: '#000000',
    fontSize: 15,
    marginTop: 6,
    marginRight: 10,
    marginLeft: 20,
  },
  checkboxText3: {
    fontSize: 15,
    marginRight: 10,
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  helperText: {
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 12,
  },
  statusBar: {
    backgroundColor: '#ffffff',
  },
  resetView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button2: {
    marginTop: 20,
  },
  containerStyle: {
    backgroundColor: '#fff',
    padding: 20,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
