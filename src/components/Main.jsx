import React from 'react'
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText, Row, Col } from 'reactstrap';
import { FaUser } from 'react-icons/fa';

const Main = ({ children }) => {
    return (
        <div>
            <Navbar color="light" light expand="md">
                <Container>
                    <NavbarBrand href="/">Link PTT</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#">
                                <FaUser /> Usuário
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>

            <Container fluid>
                <Row>
                    <Col md="2" className="sidebar">
                        <Nav vertical>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/propertys">Estações</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/treeview">Tree view</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/contact">Contato</NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col md="9" className="content">
                        {children}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Main