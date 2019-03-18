import React from 'react';
import { ActivityIndicator, Text, View, 
  TouchableOpacity,Alert,StyleSheet,ScrollView,
  FlatList, Image } from 'react-native';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true, ScreenSwitcher: "Results"}
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
        }).then((response) =>{ 
          if(response.status == 200){
          Alert.alert("You vote for: "+item.id)}
        })
         
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


  Header(){
    return(
        <View style={{height : 100,backgroundColor: '#ff746d', flex: 0.2}}>
          <Text style={[styles.textHeader]}>
            בחירות ישראל 2019
          </Text>
            <TouchableOpacity //hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
                style={styles.button}
                onPress={()=>{
                  if(this.state.ScreenSwitcher == "Results"){
                    this.setState({
                      ScreenSwitcher : "Vote",
                    })
                  }
                  else{
                    this.setState({
                      ScreenSwitcher : "Results",
                      })
                  }
                }}
            >
              <Text style ={{color: 'white',fontSize: 17}}>{this.state.ScreenSwitcher} </Text>
            </TouchableOpacity>

        </View>
    )
    }

  
  getResults(){
    return fetch('https://isr-elections.herokuapp.com/api/parties/poll-status')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          res: responseJson
        });
      })
      .catch((error) =>{
        console.error(error);
      })
  }


  renderResults(){
    console.log(this.state.res)
    return(
      <View>
        <FlatList
          data={this.state.res}
          renderItem={({item}) => <Text>{item.currentVotes}</Text>}
          keyExtractor={({id}) => id}
        />
      </View>
    )


  }


  currScreen(){
    if(this.state.ScreenSwitcher == "Results"){
      return (
      <View style={styles.mainview}>
      {this.renderItemList()}
      </View>
      )
    }
    else{

      return(
        <View>
          {this.renderResults()}
        </View>
      )
    }
  }

  componentDidMount(){
    return fetch('https://isr-elections.herokuapp.com/api/parties')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.parties
        });

      })
      .then(() => this.getResults())
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
        {this.Header()}
        {this.currScreen()}
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
  textHeader: {
    color: "black",
    fontSize: 25,
    textAlign: 'center',
    top:30
  },
  view: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  button: {
    top:"25%",
    right: 0,
    height:"50%",
    width: 75,
    justifyContent:"center",
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#4e82dd',
    paddingTop: '3%',
    paddingBottom: '3%',
    paddingLeft: '2%',
    paddingRight: '2%',
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 15
  },
  mainview:{
    flex: 1, 
    flexDirection: 'row', 
    flexWrap:'wrap',
    justifyContent:"space-evenly"
  }

})
