
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
    this.state = {pontuacao : 0};
    this.listar = this.listar.bind(this);
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

  listar(){

    let pontuacao = firebase.database().ref("pontuacao");
    pontuacao.on('value', (snapshot) => {
      let pto = snapshot.val()
      this.setState( { pontuacao:  pto } ) 
    });

    alert('criado listener');
  }


  render() {
    return (
      <View>
        <Button title="salvar" onPress={ this.salvar } />

        <Button title="listar" onPress={ this.listar } />

        <Text >
          Pontuação:
        </Text>        

        <Text >
          {this.state.pontuacao}
        </Text>        
      </View>
    );
  }
}

AppRegistry.registerComponent('rctNtvAppHelloFirebase', () => rctNtvAppHelloFirebase);
