import React from 'react'
import { Helmet } from 'react-helmet'
import Nav from 'components/uikit/Nav'

const About = () => (
  <div>
    <Helmet><title>About</title></Helmet>
    <b>This is about</b>
    <br />
    <Nav />
  </div>
)

export default About
