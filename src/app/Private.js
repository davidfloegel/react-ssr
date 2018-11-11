import React from 'react'
import { Helmet } from 'react-helmet'
import Nav from 'components/Nav'

const Private = () => (
  <div>
    <Helmet><title>Private</title></Helmet>
    <b>This is not so private</b>
    <br />
    <Nav />
  </div>
)

export default Private
