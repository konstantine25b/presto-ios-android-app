import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import COLORS from '../../Styles/colors';

const UpperSide = () => {
  return (
    <>
      <View style={styles.topLine}>
        <View style={styles.createAccount}>
          <Text style={styles.title}>Log in to Your</Text>
          <Text style={styles.account}>Presto account</Text>
        </View>
      </View>
      <Text style={styles.otherOptions}> Log in with</Text>
      <View style={styles.logos}>
        <Pressable style={styles.logoButton}>
          <Image
            style={styles.logo}
            source={require('../../../assets/Google__G__Logo.png')}
          />
        </Pressable>
        <Pressable style={styles.logoButton}>
          <Image
            style={styles.logo}
            source={require('../../../assets/faceBook.png')}
          />
        </Pressable>
      </View>
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.line} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topLine: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 60,
  },
  title: { fontSize: 40 },
  otherOptions: { fontSize: 18, color: COLORS.mainColor },
  logos: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 40,
  },
  logoButton: {
    margin: 3,
    borderRadius: 35,
    overflow: 'hidden',
  },
  logo: {
    height: 36,
    width: 36,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  createAccount: {
    marginBottom: '13%',
    marginTop: '0%',
    alignItems: 'center',
  },
});

export default UpperSide;
