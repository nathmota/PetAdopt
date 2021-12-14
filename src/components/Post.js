import React, { Component } from 'react';
import {
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Link } from 'react-router-dom';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { withOktaAuth } from '@okta/okta-react';

class Post extends Component {
  state = {
    authenticated: null,
  };

  componentDidUpdate() {
    this.checkAuthentication();
  }

  componentDidMount() {
    moment.locale('pt-br');
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = this.props.authState.isAuthenticated;
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  render() {
    const { authenticated } = this.state;
    let second_action = '';
    
    if (authenticated){
      second_action = 
      <ListItemSecondaryAction>
      <IconButton onClick={() => this.props.postsComponent.deletePost(this.props.post)} color="inherit">
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>;
    }

    return (
      <ListItem key={this.props.post.id} button component={Link} to={`/posts/${this.props.post.id}`}>
        <ListItemText
          primary={this.props.post.title}
          secondary={this.props.post.updatedAt && `Atualizado ${moment(this.props.post.updatedAt).fromNow()}`}
        />
        {second_action}
      </ListItem>
    );
  }
}

export default withOktaAuth(Post);