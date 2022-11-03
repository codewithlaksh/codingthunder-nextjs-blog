import React from "react";
import Link from "next/link"
import { MdAccountCircle } from 'react-icons/md'

const Header = function (props) {
    const { user, logout } = props;

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" href="/">CodingThunder</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" href="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/blog">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/contact">Contact</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0 mr-3" action="/search" method="get">
                        <input className="form-control mr-sm-2" type="search" name="query" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-danger my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    {user.token?<ul className="navbar-nav">
                        <li className="nav-item dropdown font-weight-bold align-items-center active">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                <MdAccountCircle style={{ fontSize: "32px" }} /> Welcome - {user.username}
                            </a>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" href="/accounts/myaccount">My Account</Link>
                                <a className="dropdown-item" style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                            </div>
                        </li>
                    </ul>:<div>
                        <Link className="btn btn-danger mr-2" href="/accounts/login">Login</Link>
                        <Link className="btn btn-danger" href="/accounts/signup">Register</Link>
                    </div>}
                </div>
            </nav>
        </>
    )
}

export default Header