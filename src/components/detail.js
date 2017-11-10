import React, { Component } from 'react';
import { Card } from 'react-materialize';

class Detail extends Component{

    render(){
        return(
            <div>
                <Card>Date : {this.props.date}</Card>
                <Card>De {this.props.from} à {this.props.to}</Card>
                <Card>Raison : {this.props.raison}</Card>
                <Card className="green darken-1 info"><a href={this.props.link}>{this.props.link}</a></Card>
            </div>
        )
    }
}

export default Detail;