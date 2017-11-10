import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import List from '../components/list';
import Search from '../components/search';
import { ProgressBar } from 'react-materialize';

let errorCode = null;

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state= ({
            getUrl: 'http://localhost:1337',
            from: "",
            to: ""
        })
    }

    handleSubmit = (e) => {
        let fromValue = moment(this.props.from).format("L");
        let toValue = moment(this.props.to).format("L");
        this.setState({
            from: fromValue,
            to: toValue,
        });
        console.log(this.state);
    }

    getSearchDatas = (url) => {
        // Get data from API
        fetch(url)
        // parse response
            .then((res, next) => {
                console.log(this.props.match);
                if (res.ok) {
                    console.log("Connexion à l'API réussie");
                    return res.json();
                } else {
                    errorCode = res.status;
                    next();
                }
            })
            .catch((err) => {
                console.log(err);
                if (errorCode === 400) {
                    alert("Erreur 400 : Un problème est survenu");
                } else if (errorCode === 404) {
                    alert("Erreur 404 : Page introuvable");
                    this.setState({ redirect: (<Redirect to="/page/not-found"/>) });
                } else if (errorCode === 500) {
                    alert("Erreur 500 : erreur serveur");
                }
            })

            // use parsed response
            .then((json) => {
                this.setState({
                    data: json,
                });
            });
    }

    componentDidMount() {
        this.getSearchDatas(this.state.getUrl);
    }

    render() {
        const { data } = this.state;

        return (
            <div className="container">
                <h1> HomePage </h1>
                <Search handleSubmit={this.handleSubmit} from={this.props.from} to={this.props.to}/>
                {!data ? (
                    <ProgressBar />
                ) : (
                    <div className="row">

                        <List data={data} />
                    </div>
                )}
            </div>
        );
    }

}

export default HomePage;
