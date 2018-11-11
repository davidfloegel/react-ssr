import React from 'react'
import { Helmet } from 'react-helmet'
import Nav from 'components/Nav'

const Home = () => (
  <div>
    <Helmet><title>Home</title></Helmet>
    <b>This is Home</b>
    <br />
    <Nav />
  </div>
)

export default Home
