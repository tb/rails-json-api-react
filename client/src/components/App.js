import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Collapse, Container, Navbar, NavbarToggler, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { getUser, logout } from '../store/auth';

export class App extends Component {
  state = {
    isOpen: false,
    dropdownOpen: false,
  };

  logout = (e) => {
    e.preventDefault();
    this.props.logout(this.props.user);
  };

  toggle = () => this.setState({
    dropdownOpen: !this.state.dropdownOpen,
    isOpen: !this.state.isOpen
  });

  render() {
    const { user } = this.props;
    const userIsAdmin = user.role === "admin"

    return (
      <div>
        <Navbar color="faded" light toggleable>
          <Container>
            <NavbarToggler right onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
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
              </Nav>
              <Nav navbar className="ml-auto">
                <NavItem>
                  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                      {user.email}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <Link to="/profile">Profile</Link>
                      </DropdownItem>
                      <DropdownItem href onClick={this.logout}> Logout </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
              </Nav>
            </Collapse>
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
