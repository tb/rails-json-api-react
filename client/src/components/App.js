import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Collapse, Container, Navbar, NavbarToggler, Nav, NavItem, NavLink, NavDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { getUser, logout } from '../store/auth';

export class App extends Component {
  state = {
    isOpen: false,
  };

  logout = (e) => {
    e.preventDefault();
    this.props.logout(this.props.user);
  };

  toggle = () => this.setState({
    isOpen: !this.state.isOpen
  });

  render() {
    const { user } = this.props;
    const userIsAdmin = user.roles.includes('admin')

    return (
      <div>
        <Navbar color="faded" light toggleable>
          <Container>
            <Nav navbar>
              <NavItem>
                <NavLink href="/#/">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/#/posts">Posts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/#/categories">Categories</NavLink>
              </NavItem>
              <NavItem>
                {
                  userIsAdmin && <NavLink href="/#/users">Users</NavLink>
                }
              </NavItem>
              <NavItem>
                <NavLink href="/#/products">Products</NavLink>
              </NavItem>
            </Nav>
            <Nav navbar className="ml-auto">
              <NavDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  {user.email}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <DropdownItem>Profile</DropdownItem>
                  </DropdownItem>
                  <DropdownItem href onClick={this.logout}> Logout </DropdownItem>
                </DropdownMenu>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
        <Container className="container-main">
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
