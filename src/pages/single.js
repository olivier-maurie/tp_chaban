import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import HeaderSingle from '../components/header-single';
import Detail from '../components/detail';

const Test = () => (
  <div> RENDER PAGE 1</div>
)

let errorCode = null;

class SinglePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      date: new Date().toString(),
      from: new Date().getHours().toString(),
      to: new Date().getHours().toString(),
      raison: ""
    }
  }
  
  componentDidMount() {
    let idPage = this.props.location.pathname;
    fetch('http://localhost:1337' + idPage)
      .then((res, next) => {
          if(res.ok){
            console.log("Connexion à l'API réussie")
            return res.json()
          }else if(res.status === "404"){
            errorCode = 404;
            next()
          }else if(res.status === "500"){
            console.log('500');
          }
          else{
            console.log('Connexion à l\'API impossible');
            next();
          }
        
        }).catch((err) => {
          if(errorCode === 404){
            alert("Erreur 500 : impossible de se connecter")
          }
        })
          .then((json) => {
            this.setState({
              data: json,
              date: json.date,
              from: json.start,
              to: json.end,
              raison: json.reason
            });
          });
      }

  render() {

    const idPage = this.props.location.pathname;
    return (
      <div>
        PAGE SINGLE
        <HeaderSingle />
        DETAILS
        <Detail date={this.state.date} from={this.state.from} to={this.state.to} detail={this.state.raison} />

      </div>
    );
  }

}

export default SinglePage;
