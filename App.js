import React from 'react';
import { ActivityIndicator, Text, View, 
  TouchableOpacity,Alert,StyleSheet,ScrollView, Image } from 'react-native';


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
            {item.id ==='likud' && <Image
                source={require('./images/likud.png')}
            />}

            {item.id ==='avoda' && <Image
                source={require('./images/avoda.png')}
            />}

            {item.id ==='kahol-lavan' && <Image
                source={require('./images/kahol-lavan.png')}
            />}
            {item.id ==='merez' && <Image
                source={require('./images/merez.png')}
            />}
            {item.id ==='kulanu' && <Image
                source={require('./images/kulanu.png')}
            />}
            {item.id ==='yamin-hadash' && <Image
                source={require('./images/yamin-hadash.png')}
            />}
            {item.id ==='israel-beitenu' && <Image
                source={require('./images/israel-beitenu.png')}
            />}
            {item.id ==='shas' && <Image
                source={require('./images/shas.png')}
            />}
            {item.id ==='yahadut-hatora' && <Image
                source={require('../ex1/images/yahadut-hatora.png')}
            />}
            {item.id ==='raam-taal' && <Image
                source={require('../ex1/images/raam-taal.jpeg')}
            />}
            {item.id ==='balad' && <Image
                source={require('../ex1/images/balad.png')}
            />}
            {item.id ==='zehut' && <Image
                source={require('../ex1/images/zehut.png')}
            />}
            {item.id ==='gesher' && <Image
                source={require('./images/gesher.png')}
            />}
            {item.id ==='ihud-miflagot-hayamin' && <Image
                source={require('./images/ihud-miflagot-hayamin.png')}
            />}
            {item.id ==='magen' && <Image
                source={require('./images/magen.png')}
            />}
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
    width: "50%",
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
