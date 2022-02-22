import { Link } from "react-router-dom";

const Navbar=()=>{
    return(
        <>
        <nav className="navbar   navbar-dark bg-dark navbar-expand-sm">
            <div className="container d-flex justify-content-center">
                <Link to={'/'} className='navbar-brand mx-2'><i className=" text-success fa fa-phone mx-2 "></i>Contact Manager</Link>

            </div>
            
        </nav>
        </>
    )
}
export default Navbar;