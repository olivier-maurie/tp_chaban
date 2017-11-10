import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'react-materialize';

import { Link } from 'react-router-dom';

class ListItem extends Component {

    static propTypes = {
        item: PropTypes.shape({
            date: PropTypes.string.isRequired,
        }).isRequired,
    };

    render() {
        const { item } = this.props;

        return (
            <Card title={item.date}>
                <Link to={`/${item.id}`} >
                    Voir plus de détails
                    <Icon right>chevron_right</Icon>
                </Link>
            </Card>
        );
    }

}

export default ListItem;
