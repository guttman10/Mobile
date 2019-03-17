import React from 'react';
import { ActivityIndicator, Text, View, 
  TouchableOpacity,Alert,StyleSheet,ScrollView } from 'react-native';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  renderItemList() {
    return this.state.dataSource.map( item =>
      <TouchableOpacity key={item.id} style={[styles.imgbtn]}
      onPress={() => {
        fetch(`https://isr-elections.herokuapp.com/api/parties/vote/${item.id}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        }).then((response) => Alert.alert("You vote for: "+item.id)) 
        .catch((err) => { console.log(err); });

      }}>
        <View style={styles.View}>
          <Text style={[styles.text]}>{String(item.id)}</Text>
        </View>
    </TouchableOpacity>
    )}

  componentDidMount(){
    return fetch('https://isr-elections.herokuapp.com/api/parties')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          dataSource: responseJson.parties
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <ScrollView>
        <View style={styles.mainview}>
          {this.renderItemList()}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  imgbtn: {
    width: "40%", 
    margin: 5,
    height: 150,
    justifyContent:"center",
  },
  text: {
    color: "black",
    fontSize: 18,
    textAlign: 'center'
  },
  view: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  mainview:{
    flex: 1, 
    flexDirection: 'row', 
    flexWrap:'wrap',
    justifyContent:"space-evenly"
  }

})
