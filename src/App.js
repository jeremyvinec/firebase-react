import React from 'react';
import firebase from 'firebase'
import config from './config'

export default class App extends React.Component {

  constructor(){
    super()
    firebase.initializeApp(config)
    this.state = {
      loading: true
    }
  }

  componentWillMount(){
    const ref = firebase.database().ref('personnage')
    ref.on('value', snapshot => {
      console.log('ok')
      this.setState({
        presonnage: snapshot.val(),
        loading: false
      })
    })
  }

  render(){
    if(this.state.loading){
      return <h1>Chargement</h1>
    }
    
    const persos = this.state.personnage.map((perso, i) => <h2 key={i}>{perso.nom}</h2>)
    return (
      <div>
        <h1>Persos</h1>
        {persos}
      </div>
    );
  }
}
