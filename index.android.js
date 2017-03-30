
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView
} from 'react-native';
import firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';

export default class rctNtvAppHelloFirebase extends Component {

  constructor(props) {
    super(props);
    this.state = {pontuacao : 0, userEmailLogado: '',visible: false, clientes: []};
    this.logarUsuario = this.logarUsuario.bind(this);
    this.deslogarUsuario = this.deslogarUsuario.bind(this);
    this.cadastrarUsuario = this.cadastrarUsuario.bind(this);
    this.listarClientes = this.listarClientes.bind(this);
  }

  componentWillMount() {

      this.loading();

      var config = {
                    apiKey: "AIzaSyBhFjicq2j9vORzy9gpcQ3C-4Rna-dDY04",
                    authDomain: "hellofirebase-b0add.firebaseapp.com",
                    databaseURL: "https://hellofirebase-b0add.firebaseio.com",
                    storageBucket: "hellofirebase-b0add.appspot.com",
                    messagingSenderId: "638606751688"
                  };
      firebase.initializeApp(config);

      //cria lister para ouvir se usuario esta logado
      this.vefiricarUsuarioLogadoListener();

  } 

  loading(){
    this.setState({ visible: !this.state.visible});
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

  listarClientes(){

    console.log('listar clientes....');

    let clientes = firebase.database().ref("clientes");
    clientes.orderByChild("email").once('value', (snapshot) => {
      let cl = snapshot.val();
      console.log(cl);

      this.setState( { clientes:  [] } );
    });    
  }


  cadastrarUsuario(){

    this.loading();

    let email = "alanstos@gmail.com";
    let senha = "123456";

    const auth = firebase.auth();

    auth
      .createUserWithEmailAndPassword(email, senha)
      .catch(function(error) {

        let message = error.message;

        if ('auth/email-already-in-use' == message){
          alert('email ja utilizado');
        } else if ('auth/operation-not-allowed' == message){
          alert('operacao nao permitida');
        } else if ('auth/timeout' == message){
          alert('Timeout tempo esgotado');
        }else{
          alert(error.code +' // '+error.message)  
        }
        
        
      });

  }

  vefiricarUsuarioLogadoListener(){
      const auth = firebase.auth();    

      auth.onAuthStateChanged(
        (usuarioLogado) => {
          if (usuarioLogado){
            this.loading();
            this.setState({userEmailLogado: usuarioLogado.email});
            alert('Listener: existe usuario logado');

          }else{
            this.loading();
            this.setState({userEmailLogado: ''});
            alert('Listener: nao existe usuario logado no momento');
          }
        }
      );
      
      /*
      const usuarioLogado = auth.currentUser;

      if (usuarioLogado){
        alert('existe usuario logado');
      }else{
        alert('nao existe usuario logado no momento');
      }
      */
  }  

  vefiricarUsuarioLogado(){
      const auth = firebase.auth();    

      const usuarioLogado = auth.currentUser;

      if (usuarioLogado){
        alert('existe usuario logado');
      }else{
        alert('nao existe usuario logado no momento');
      }
      
  }

  logarUsuario(){

    this.loading();

    let email = "alanstos@gmail.com";
    let senha = "123456";    

    firebase.auth()
      .signInWithEmailAndPassword(email, senha)
      .catch(function(error) {
        let message = error.message;

        if ('auth/email-already-in-use' == message){
          alert('email ja utilizado');
        } else if ('auth/operation-not-allowed' == message){
          alert('operacao nao permitida');
        } else if ('auth/timeout' == message){
          alert('Timeout tempo esgotado');
        }else{
          alert(error.code +' // '+error.message)  
        }

      });
  }

  deslogarUsuario(){

    if (this.state.userEmailLogado){
      this.loading();

      firebase.auth().signOut().then(function() {
        //alert('Até breve');
      }, function(error) {
        alert('ocorreu um erro ao sair: ' + error.message);
      });
    }

  }

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#000'}} />
        </View>

        <Button title="cadastrar usuario" onPress={ this.cadastrarUsuario } />

        <Button title="verificar usuario logado" onPress={ this.vefiricarUsuarioLogado } />

        <Button title="Logout" onPress={ this.deslogarUsuario } />

        <Button title="Login" onPress={ this.logarUsuario } />

        <Button title="Listar" onPress={ this.listarClientes } />

        <Text >
          Pontuação:
        </Text>        

        <Text >
          {this.state.pontuacao}
        </Text>        
        <Text >
          {this.state.userEmailLogado}
        </Text>   

          { 
            this.state.clientes.map( (cliente) => 
              (<Text key={cliente.email}>{cliente.nome}</Text>) 
            ) 
          }        

      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('rctNtvAppHelloFirebase', () => rctNtvAppHelloFirebase);
