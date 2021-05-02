import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';

import dictionary from "../database";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isSearchedPressed: false,
      word: '',
      lexicalCategory: '',
      examples: [],
      definition: '',
    };
  }
  getWord = (text) => {
    var text = text.toLowerCase();
    try {
      var word = dictionary[text]["word"];
      var lexicalCategory = dictionary[text]["lexicalCategory"];
      var definition = dictionary[text]["definition"];
      this.setState({
"word":word,
"lexicalCategory":lexicalCategory,
"definition":definition,
      });
    }
 catch(err){
alert("Sorry, this word does not seem to be in our system... please try again.");
this.setState({
  word:'',
 isSearchedPressed:false,
})
 }
  };

  render() {
    return (
      <View>
      <View>
          <Header
            backgroundColor="rgb(190,190,190)"
            centerComponent={{
              text: 'Quick Dictionary',
              style: { color: '#fff' },
            }}
          />
      </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder={'Enter Word'}
            onChangeText={(text) => {
              this.setState({
                text: text,
                isSearchedPressed: false,
                word: '',
              });
            }}
            value={this.state.holdInput}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({ isSearchedPressed: true });
              this.getWord(this.state.text);
            }}>
            <Text>Search Word</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.desCon}>
          <Text>Word:</Text>
          <Text style={{fontSize:16,fontWeight:'bold'}}>{this.state.word}</Text>

          <Text>Part of Speech: </Text>
          <Text style={{fontSize:16,fontWeight:'bold'}}>{this.state.lexicalCategory}</Text>

          <Text>Definition: </Text>
          <Text style={{fontSize:16,fontWeight:'bold'}}>{this.state.definition}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    alignSelf: 'center',
    height: 40,
    borderWidth: 3,
    textAlign: 'center',
  },
  searchButton: {
    borderWidth: 3,
    width: 100,
    height: 40,
    textAlign: 'center',
    position: 'absolute',
    top: 40,
    right: 120,
    backgroundColor: 'rgb(190,190,190)',
  },
  desCon: { 
    position: 'absolute',
     top: 200,
     },
});
