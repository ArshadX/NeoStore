import React from 'react';

import {View, Text, StyleSheet, Modal, Image, Dimensions} from 'react-native';
import {Rating} from 'react-native-ratings';
import {imageUrl, instance} from '../lib/Instances/Instance';
import ButtonWithIcon from './ButtonWithIcon';
import {connect} from 'react-redux';
import CustomModal from './CustomModal';
import {AlertProfileUpdate} from './AlertBox';
import IconButton from './IconButton';
const AddRating = ({
  text,
  visible,
  onRequestClose,
  onShow,
  animatedType,
  rating,
  image,
  userData,
  setShowRatingContainer,
  id,
}) => {
  const [addRating, setRating] = React.useState(rating);
  const [isloading, setisloading] = React.useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    setisloading(true);
    instance
      .post(`/addRating/${id}&${addRating}`, id, {
        headers: {
          Authorization: 'Bearer ' + userData.token,
        },
      })
      .then(function (response) {
        console.log(response?.data);
        setisloading(false);
        AlertProfileUpdate('Successfull!');
        setShowRatingContainer(false);
      })
      .catch(function (error) {
        console.log(error);
        setisloading(false);
        AlertProfileUpdate('Request failed', 'try again');
        setShowRatingContainer(false);
      });
  };

  return (
    <Modal animationType={animatedType} visible={visible} transparent={true}>
      <View style={styles.modalView}>
        <CustomModal
          loadingIndicator={true}
          text="loading..."
          visible={isloading}
          animatedType="fade"
        />

        <View style={styles.modalContainer}>
          <View style={styles.cancel}>
            <IconButton
              name="close-thick"
              size={20}
              onPress={() => setShowRatingContainer(false)}
            />
          </View>
          <Text style={styles.textStyle}>{text}</Text>
          <Image source={{uri: imageUrl + image}} style={styles.imageStyle} />
          <Rating
            type="star"
            ratingColor="#3498db"
            ratingBackgroundColor="#c8c7c8"
            ratingCount={5}
            startingValue={rating}
            showRating={true}
            imageSize={30}
            onFinishRating={value => setRating(value)}
            style={{paddingVertical: 10}}
          />
          <ButtonWithIcon
            leftIcon={true}
            title="Rate"
            backgroundColor="#ff7f50"
            color="#000000"
            onPress={e => handleSubmit(e)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#000000',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(191, 191, 191, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: 250,
    height: 450,
    borderRadius: 30,
    elevation: 10,
  },
  imageStyle: {
    width: Dimensions.get('window').width - 294,
    height: 225,
    marginVertical: 10,
  },
  textStyle: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'serif',
    fontSize: 15,
  },
  cancel: {
    position: 'relative',
    right: 0,
    top: 0,
    left: 95,
  },
});

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(AddRating);
