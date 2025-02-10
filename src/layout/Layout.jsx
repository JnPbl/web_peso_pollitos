
import Footer from "../componentes/Footer"

/* eslint-disable react/prop-types */

const Layout = (props)=>{
 return (
    <>
    <main>{ props.children }</main>
    <Footer/>
    </>

 )
}

export default Layout