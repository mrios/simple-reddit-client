import React from 'react';

class Post extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
      const post = this.props.post;
      return (
        <p>Post details...</p>
      )
  }
}

export default Post