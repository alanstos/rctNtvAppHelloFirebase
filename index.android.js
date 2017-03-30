
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import firebase from 'firebase';

export default class rctNtvAppHelloFirebase extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
      var config = {
                    apiKey: "AIzaSyBhFjicq2j9vORzy9gpcQ3C-4Rna-dDY04",
                    authDomain: "hellofirebase-b0add.firebaseapp.com",
                    databaseURL: "https://hellofirebase-b0add.firebaseio.com",
                    storageBucket: "hellofirebase-b0add.appspot.com",
                    messagingSenderId: "638606751688"
                  };
      firebase.initializeApp(config);

  } 

  salvar(){
    //let database = firebase.database();
    //database.ref("pto").set("100");
    //database.ref("pto").remove();

    let clientes = firebase.database().ref("clientes");
    //clientes.child("001").remove();
    //clientes.child("002").child("nome").set("maria");
    //clientes.push().child("alias").set("joana");

    clientes.push().set(
      [{ 
        nome:'boliveira', 
        email: 'ba@email.com',
        sexo:'F'
      },
      { 
        nome:'asantos', 
        email: 'al@email.com',
        sexo:'M'
      }]
    );

    alert('sucesso');
  }


  render() {
    return (
      <View>
        <Text >
          Welcome
        </Text>
        <Button title="salvar" onPress={ this.salvar } />
      </View>
    );
  }
}

AppRegistry.registerComponent('rctNtvAppHelloFirebase', () => rctNtvAppHelloFirebase);
