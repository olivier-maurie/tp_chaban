import React, { Component } from 'react';
import moment from 'moment';
import { Input } from 'react-materialize';

const today = new Date().toLocaleDateString('fr-FR', {year: "numeric", month: "long", day: "numeric"})

class Search extends Component{

    constructor(props){
        super(props);
        this.state = ({
            from: '',
            to: '',
        })
    }

    handleChange = (e) => {
        // console.log(this.state.from);
        // console.log(moment(this.state.from, "LL").format("DD-MM-YY"));
        // console.log(moment(this.state.to).format("DD-MM-YY"));

        if(e.target.name === "from"){
            this.setState({
                from: e.target.value,
            });
        }else{
            this.setState({
                to: e.target.value,
            });
        }
        return this.state;
    }

    componentDidMount() {
        fetch('http://localhost:1337')
            .then((res, next) => {
                if(res.ok){
                    console.log("Connexion à l'API réussie");
                    return res.json()
                }
                else{
                    console.log('Connexion à l\'API impossible');
                    next()
                }
            }).catch((err) => {
            if(err){
                alert("Erreur 500 : impossible de se connecter")
            }
        })
            .then((json) => {
                console.log(json)
                this.setState({
                    data: json,
                });
            });
    }

    render(){
        return(
            <div>
                <Input type="date" onChange={this.handleChange} value={this.props.from} name="from" placeholder={today}/>
                <Input type="date" onChange={this.handleChange} value={this.props.to} name="to" placeholder={today}/>
                <Input type="submit" onClick={this.props.handleSubmit}/>
            </div>
        )
    }
}

export default Search;