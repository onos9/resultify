
import React, { useState } from "react"
import SimpleBar from 'simplebar-react'
import { useLocation } from "react-router-dom"
import { CSSTransition } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faCog, faFileAlt, faSignOutAlt, faTable, faTimes, faRocket } from "@fortawesome/free-solid-svg-icons"
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap'
import { Link } from 'react-router-dom'

import { Router } from "../router"
import ReactHero from "../assets/img/resultify.svg"
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg"

export default (props = {}) => {
  const location = useLocation()
  const { pathname } = location
  const [show, setShow] = useState(false)
  const showClass = show ? "show" : ""

  const onCollapse = () => setShow(!show)

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : ""

    return (
      <Accordion as={ Nav.Item } defaultActiveKey={ defaultKey }>
        <Accordion.Item eventKey={ eventKey }>
          <Accordion.Button as={ Nav.Link } className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={ icon } /> </span>
              <span className="sidebar-text">{ title }</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              { children }
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    )
  }

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : ""
    const navItemClassName = link === pathname ? "active" : ""
    const linkProps = external ? { href: link } : { as: Link, to: link }

    return (
      <Nav.Item className={ navItemClassName } onClick={ () => setShow(false) }>
        <Nav.Link { ...linkProps } target={ target } className={ classNames }>
          <span>
            { icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={ icon } /> </span> : null }
            { image ? <Image src={ image } width={ "" } height={ 75 } className="sidebar-icon svg-icon" /> : null }

            <span className="sidebar-text">{ title }</span>
          </span>
          { badgeText ? (
            <Badge pill bg={ badgeBg } text={ badgeColor } className="badge-md notification-count ms-2">{ badgeText }</Badge>
          ) : null }
        </Nav.Link>
      </Nav.Item>
    )
  }

  return (
    <>
      <Navbar expand={ false } collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={ Link } to={ Router.Dashboard.path }>
          <Image src={ ReactHero } className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={ Button } aria-controls="main-navbar" onClick={ onCollapse }>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={ 300 } in={ show } classNames="sidebar-transition">
        <SimpleBar className={ `collapse ${showClass} sidebar d-md-block bg-primary text-white` }>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={ ProfilePicture } className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>Hi, Jane</h6>
                  <Button as={ Link } variant="secondary" size="xs" to={ Router.Signin.path } className="text-dark">
                    <FontAwesomeIcon icon={ faSignOutAlt } className="me-2" /> Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={ onCollapse }>
                <FontAwesomeIcon icon={ faTimes } />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="" link={ "" } image={ ReactHero } />
              <NavItem title="Dashboard" link={ Router.Dashboard.path } icon={ faChartPie } />
              <NavItem title="Generate Result" link={ Router.Generator.path} icon={ faChartPie } />
              <NavItem title="Result" link={ Router.Result.path } icon={ faChartPie } />
              <NavItem title="Result List" link={ Router.ResultList.path } icon={ faChartPie } badgeText="Pro" />

              <Dropdown.Divider className="my-3 border-indigo" />
              
              <CollapsableNavItem eventKey="examples/" title="Page Examples" icon={ faFileAlt }>
                <NavItem title="Sign In" link={ Router.Signin.path } />
                <NavItem title="Sign Up" link={ Router.Signup.path } />
                <NavItem title="Forgot password" link={ Router.ForgotPassword.path } />
                <NavItem title="Reset password" link={ Router.ResetPassword.path } />
                <NavItem title="Lock" link={ Router.Lock.path } />
                <NavItem title="404 Not Found" link={ Router.NotFound.path } />
                <NavItem title="500 Server Error" link={ Router.ServerError.path } />
              </CollapsableNavItem>
              
              <Button as={ Link } to={ "" } variant="secondary" className="upgrade-to-pro"><FontAwesomeIcon icon={ faSignOutAlt } className="me-1" /> Sign Out</Button>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  )
}
