import React from 'react';
import { ActivityIndicator, Text, View,
  TouchableOpacity,Alert,StyleSheet,ScrollView,
  Image } from 'react-native';


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
            <Image
              source={partyImage[item.id]}
            />
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
          <TouchableOpacity
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

  sortTempArr(b,a) {
    if (a[1] > b[1]) {
      return 1;
    } else if (b[1] > a[1]) {
      return -1;
    } else {
      return 0;
    }
  }
  renderResults(){
    var resScreen = []
    var sum = 0
    var i = 0;
    tempArr =[]
    res=this.state.res
    for(party in res){
      sum += this.state.res[party].currentVotes
      tempArr.push([party,this.state.res[party].currentVotes])
    }
    tempArr.sort(this.sortTempArr)
    while(true){
      item = tempArr[i];
      votePer = item[1]*100/sum
      votePer = votePer.toFixed(2)
            resScreen.push(
                <View style={(i == 0)  ? styles.resultTopMargin : styles.resultNoTopMargin}>

                    <Image style={styles.resultImageStyle} source={partyImage[item[0]]}/>
                    <View style = {{position:'relative', left: 25}}>
                        <Text style={{fontSize: 20, color :'black'}}>{item[0]}</Text>
                        <Text style = {{color: 'gray'}}>Vote: {votePer}%</Text>
                    </View>
                </View>
            )

      i+=1
      if (i == 5){
        break;
      }
    }
    return resScreen
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

        <ScrollView
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
        >
          {this.Header()}
          {this.currScreen()}
        </ScrollView>
    );
  }
}


const partyImage = {
    likud: require('./images/likud.png'),
    avoda: require('./images/avoda.png'),
    'kahol-lavan': require('./images/kahol-lavan.png'),
    merez: require('./images/merez.png'),
    kulanu: require('./images/kulanu.png'),
    'yamin-hadash': require('./images/yamin-hadash.png'),
    'israel-beitenu': require('./images/israel-beitenu.png'),
    shas: require('./images/shas.png'),
    'yahadut-hatora': require('./images/yahadut-hatora.png'),
    'raam-taal': require('./images/raam-taal.jpeg'),
    balad: require('./images/balad.png'),
    zehut: require('./images/zehut.png'),
    gesher: require('./images/gesher.png'),
    'ihud-miflagot-hayamin': require('./images/ihud-miflagot-hayamin.png'),
    magen: require('./images/magen.png')
};
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
      right:15,
    textAlign: 'center',
    top:32
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
  },
    resultTopMargin:{
        marginTop:'7%',
        flex:1,
        flexDirection: 'row',
        marginBottom:'7%'
    },
    resultNoTopMargin:{
        flex:1,
        flexDirection: 'row',
        marginBottom:'7%'
    },
    resultImageStyle:{
        position: 'relative',
        //marginLeft:3,
        left:10,
        width: 50,
        height: 50,
        resizeMode: 'contain'
    }

})