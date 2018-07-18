import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Container, Dropdown, Image } from 'semantic-ui-react';
import bigLogo from '../images/big-logo.jpg';

const Navbar = ({ username, onLogout }) => (
  <div>
    <Image src={bigLogo} />
    <Menu stackable attached borderless inverted size="huge">
      <Container>
        <Menu.Item as={NavLink} to="/timesheet" name="timesheet">
          Timesheet
        </Menu.Item>
        <Menu.Item as={NavLink} to="/leave" name="leave">
          Leave
        </Menu.Item>
        <Menu.Item as={NavLink} to="/project" name="project">
          Project
        </Menu.Item>
        <Menu.Item as={NavLink} to="/report" name="report">
          Report
        </Menu.Item>
        <Menu.Item as={NavLink} to="/employee" name="employee">
          Employee
        </Menu.Item>
        <Menu.Item as={NavLink} to="/exam/" name="exam">
          Exam
        </Menu.Item>
        <Menu.Item as={NavLink} to="/recruitment" name="recruitment">
          Recruitment
        </Menu.Item>
        <Menu.Menu position="right">
          <Dropdown item pointing text={username}>
            <Dropdown.Menu>
              <Dropdown.Item text="Profile" as={Link} to="/profile" />
              <Dropdown.Item text="Log out" onClick={onLogout} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Container>
    </Menu>
  </div>
);

Navbar.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default Navbar;
