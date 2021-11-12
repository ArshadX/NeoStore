import React from 'react';

import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Avatar, Button, Card, Title} from 'react-native-paper';
import {styles} from '../../styles/styles';
import {instance} from '../../lib/Instances/Instance';
import {connect} from 'react-redux';

const Item = () => {
  return (
    <View style={itemstyles.flatList}>
      <Card>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};
const Home = ({navigation, userData}) => {
  const [request, setrequest] = React.useState(false);
  const [dashboard, setDashboard] = React.useState([]);
  React.useEffect(() => {
    setrequest(true);
    instance
      .get('/getDashboard', {
        headers: {Authorization: 'Bearer ' + userData.token},
      })
      .then(response => {
        const list = response.data;
        setDashboard(list);
        console.log(list);
      })
      .catch(error => {
        const errormsg = error?.message;
        console.log(errormsg);
      });
  }, []);
  const renderItem = ({item}) => {
    return <Item image={item.image} />;
  };
  return (
    <View style={styles.Container}>
      <Text style={styles.textStyle}>Spiderman Homecoming</Text>
      <FlatList
        data={dashboard}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const itemstyles = StyleSheet.create({
  flatList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingTop: 7,
    paddingBottom: 7,
  },
  cardDesign: {
    paddingTop: 7,
    borderRadius: 10,
    backgroundColor: '#b0e0e6',
    elevation: 5,
  },
  cardAction: {
    flexDirection: 'row-reverse',
    paddingBottom: 10,
    marginBottom: 5,
    marginLeft: 5,
    paddingRight: 3,
  },
  textSign: {
    fontSize: 18,
    fontWeight: '100',
    color: '#fff',
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  TextInputStyleClass: {
    textAlign: 'left',
    height: 150,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: '#9E9E9E',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    width: 350,
    color: '#000000',
  },
  userInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomColor: '#fdfff5',
    paddingBottom: 10,
  },
  button: {
    alignItems: 'stretch',
    marginTop: 20,
    backgroundColor: '#5b92e5',
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 7,
    paddingTop: 7,
    elevation: 5,
    borderRadius: 7,
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps, null)(Home);
