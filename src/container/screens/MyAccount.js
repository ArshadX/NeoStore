import React from 'react';

import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import {styles} from '../../styles/styles';
import {useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';
import {instance, profile_image} from '../../lib/Instances/Instance';
import {Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Arrow from '../../components/Arrow';
import Appbar from '../../components/Appbar';
const MyAccount = ({userData, navigation}) => {
  const [responseData, setresponseData] = React.useState({
    email: '',
    firstName: '',
    gender: '',
    mobile: null,
    profileDestination: '',
    profilePic: null,
    secondName: '',
    userId: '',
  });
  const [isloading, setisloading] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setisloading(true);
      instance
        .get('/profile', {
          headers: {
            Authorization: 'Bearer ' + userData.token,
          },
        })
        .then(response => {
          const data = response?.data?.userData;
          setresponseData(data);
          console.log(data);
        })
        .catch(error => {
          console.log(error?.message);
        });
    }, []),
  );
  const imageupload = async () => {
    console.log('hello');
    var formData = new FormData();
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then(image => {
        console.log(image.filename);
        formData.append('profile-pic', {
          uri: image.path,
          type: image.mime,
          name: 'profileImage.jpeg',
        });
      })
      .catch(error => {
        console.log(error);
      });
    console.log(formData);
    instance
      .post('/updateProfilePic', formData, {
        headers: {
          Authorization: 'Bearer ' + userData.token,
        },
      })
      .then(response => {
        console.log(response?.data);
      })
      .catch(e => {
        console.log('image post');
      });
  };
  return (
    <View style={AccountStyle.Container}>
      <Appbar
        leftIcon="arrow-left"
        title="Account"
        onPressIcon={() => navigation.goBack()}
        backgroundColor="#214fc6"
        Contentcolor="#ffffff"
      />
      <View style={AccountStyle.header}>
        <View style={AccountStyle.userInfo}>
          {responseData.profilePic !== null ? (
            <Image
              defaultSource={require('../../assets/icon.png')}
              source={{uri: profile_image + responseData.profilePic}}
              style={AccountStyle.profilePhoto}
            />
          ) : (
            <Pressable onPress={() => imageupload()}>
              <Image
                source={require('../../assets/icon.png')}
                style={AccountStyle.image}
              />
              <Icon
                size={30}
                name="pencil-plus"
                color="#6495ed"
                style={AccountStyle.iconStyle}
              />
            </Pressable>
          )}
        </View>
        <View style={AccountStyle.userInfo}>
          <Title>
            {responseData.firstName} {responseData.secondName}
          </Title>
          <Text style={AccountStyle.userDetail}>{responseData.mobile}</Text>
          <Text style={AccountStyle.userDetail}>{responseData.email}</Text>
          <Pressable
            onPress={() => imageupload()}
            style={({pressed}) => [
              pressed ? AccountStyle.pressIn : AccountStyle.pressOut,
              AccountStyle.button,
            ]}>
            <Text style={styles.textStyle}>Change Profile Picture</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable
          style={({pressed}) => [
            pressed ? AccountStyle.pressIn : AccountStyle.pressOut,
            AccountStyle.listitem,
          ]}
          onPress={() => navigation.navigate('ordersfromAccount')}>
          <Icon name="receipt" size={30} color="#000000" />
          <Text style={AccountStyle.list}>Order History</Text>
          <Arrow distance={310} arrowType="chevron-right" />
        </Pressable>
        <Pressable
          style={({pressed}) => [
            pressed ? AccountStyle.pressIn : AccountStyle.pressOut,
            AccountStyle.listitem,
          ]}
          onPress={() => navigation.navigate('cartfromAccount')}>
          <Icon name="cart" size={30} color="#000000" />
          <Text style={AccountStyle.list}>Cart</Text>
          <Arrow distance={310} arrowType="chevron-right" />
        </Pressable>
        <Pressable
          style={({pressed}) => [
            pressed ? AccountStyle.pressIn : AccountStyle.pressOut,
            AccountStyle.listitem,
          ]}
          onPress={() => navigation.navigate('Address')}>
          <Icon name="map-marker" size={30} color="#000000" />
          <Text style={AccountStyle.list}>Shipping Address</Text>
          <Arrow distance={310} arrowType="chevron-right" />
        </Pressable>
        <Pressable
          style={({pressed}) => [
            pressed ? AccountStyle.pressIn : AccountStyle.pressOut,
            AccountStyle.listitem,
          ]}
          onPress={() =>
            navigation.navigate('updateProfile', {
              firstname: responseData.firstName,
              lastname: responseData.secondName,
              Phone: responseData.mobile,
              Gender: responseData.gender,
            })
          }>
          <Icon name="account-box" size={30} color="#000000" />
          <Text style={AccountStyle.list}>Edit Profile</Text>
          <Arrow distance={310} arrowType="chevron-right" />
        </Pressable>
        <Pressable
          style={({pressed}) => [
            pressed ? AccountStyle.pressIn : AccountStyle.pressOut,
            AccountStyle.listitem,
          ]}
          onPress={() => navigation.navigate('resetPasswordfromAccount')}>
          <Icon name="lock-reset" size={30} color="#000000" />
          <Text style={AccountStyle.list}>Reset Password</Text>
          <Arrow distance={310} arrowType="chevron-right" />
        </Pressable>
      </View>
    </View>
  );
};

const AccountStyle = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fefefa',
  },
  appbar: {
    backgroundColor: '#d3d3d3',
  },
  header: {
    flex: 8,
    flexDirection: 'row',
  },
  userInfo: {
    marginTop: 40,
    marginLeft: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 30,
    borderWidth: 2,
    borderColor: '#6495ed',
    borderRadius: 50,
    opacity: 0.6,
    backgroundColor: '#d3d3d3',
  },
  userDetail: {
    color: '#000000',
  },
  list: {
    color: '#000000',
    marginTop: 4,
    marginLeft: 10,
  },
  listitem: {
    flexDirection: 'row',
    //backgroundColor: '#d3d3d3',
    marginLeft: 5,
    marginBottom: 6,
    padding: 10,
    borderRadius: 10,
  },
  pressIn: {backgroundColor: '#6495ed'},
  pressOut: {backgroundColor: '#d3d3d3'},
  iconStyle: {
    position: 'absolute',
    left: 50,
    top: 80,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    marginRight: 30,
    borderWidth: 2,
    borderColor: '#6495ed',
    borderRadius: 50,
    backgroundColor: '#d3d3d3',
  },
  button: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps, null)(MyAccount);
