import React, { Component } from 'react';
import List from './../components/list';
import { ProgressBar } from 'react-materialize';
import { Link} from 'react-router-dom'
class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }
0
  componentDidMount() {

    // Get data from API
    fetch('http://localhost:1337')
      // parse response
    .then((res, next) => {
      console.log(res)
      if(res.ok){
        console.log("Connexion à l'API réussie")
        return res.json()
      }
      else{
        console.log('Connexion à l\'API impossible')
        next()
      }
    
    }).catch((err) => {
      if(err){
        alert("Erreur 500 : impossible de se connecter")
      }
    })
     
      // use parsed response
      .then((json) => {
        this.setState({
          data: json,
        });
      });
  }

  render() {

    const { data } = this.state;

    return (
      <div>

        <h2> HomePage </h2>



        {!data ? (
          <ProgressBar />
        ) : (
          <div>
            <List data={data} />
          </div>
        )}
      </div>
    );
  }

}

export default HomePage;
