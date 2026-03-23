import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container-fluid">
                <Link className="navbar-brand text-primary fw-bold" to='/media'>IUD-MOVIES</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/media'>Media</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/generos'>Géneros</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/directores'>Directores</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/productoras'>Productoras</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to='/tipos'>Tipos</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}