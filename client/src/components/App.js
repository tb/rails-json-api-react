import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Collapse, Container, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';

import { getUser, logout } from '../store/api';

export class App extends Component {
  state = {
    isOpen: false,
  };

  logout = (e) => {
    e.preventDefault();
    this.props.logout(this.props.user);
  };

  toggle = () => this.setState({isOpen: !this.state.isOpen});

  render() {
    const { user } = this.props;
    return (
      <div className="wrapper">
        <Navbar color="faded" light toggleable>
          <Container>
          <NavbarToggler right onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/#/posts">Posts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/#/categories">Categories</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/#/users">Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.logout}>Logout ({user.email})</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          </Container>
        </Navbar>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: getUser(state),
});

export const mapDispatchToProps = dispatch => ({
  logout: payload => dispatch(logout('auth', payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
