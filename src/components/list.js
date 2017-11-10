import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from './list-item';

class List extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div>
        {this.props.data.map((item) => {
          return <ListItem
            key={item.id}
            item={item}
          />
        })}
      </div>
    );
  }

}

export default List;
