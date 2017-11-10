import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ProgressBar } from 'react-materialize';
import Detail from '../components/detail';

let errorCode = null;

class SinglePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: null,
            date: "",
            from: "",
            to: "",
            raison: "",
            redirect: ""
        }
    }

    // refresh component after change id page
    componentWillReceiveProps(props){
        this.getIdDatas(props.match.params.id);
    }

    // load component from api
    componentDidMount(){
        this.getIdDatas(this.props.match.params.id);
    }

    // http request get
    getIdDatas = (idPage) => {
        fetch('http://localhost:1337/' + idPage)
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
            .then((json) => {
                console.log(json);
                this.setState({
                    data: json,
                    date: json.date,
                    from: json.start,
                    to: json.end,
                    raison: json.reason,
                    link: json.link,
                });
            })
            .catch((err) => {
                null;
            });
    };

    render() {
        console.log(this.state)
        const { data } = this.state;

        let idPage = this.props.match.params.id;
        let prevPage = parseInt(idPage, 10) - 1;
        let nextPage = parseInt(idPage, 10) + 1;
        return (
            <div className="container">
                {this.state.redirect}
                <header className="row">
                    <div className="btn"><Link to={`/`}>Retour</Link></div>
                    <div className="btn"><Link to={`/${prevPage}`}>Précédent</Link></div>
                    <div className="btn"><Link to={`/${nextPage}`}>Suivant</Link></div>
                </header>
                <h1>DETAILS</h1>
                {!data ? (
                    <ProgressBar />
                ) : (
                    <Detail date={this.state.date} from={this.state.from} to={this.state.to} raison={this.state.raison} link={this.state.link}/>
                )}


            </div>
        );
    }

}

export default SinglePage;
