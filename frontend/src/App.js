import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/ui/Header';
import { MediaView } from './components/media/MediaView';
import { GeneroView } from './components/generos/GeneroView';
import { DirectorView } from './components/directores/DirectorView';
import { ProductoraView } from './components/productoras/ProductoraView';
import { TipoView } from './components/tipos/TipoView';

export const App = () => {
    return (
        <Router>
            <Header />
            <div className="container-fluid mt-4">
                <Routes>
                    <Route path='/media' element={ <MediaView /> } />
                    <Route path='/generos' element={ <GeneroView /> } />
                    <Route path='/directores' element={ <DirectorView /> } />
                    <Route path='/productoras' element={ <ProductoraView /> } />
                    <Route path='/tipos' element={ <TipoView /> } />
                    {/* Redirección por defecto si la ruta no existe */}
                    <Route path='*' element={ <Navigate to='/media' replace /> } />
                </Routes>
            </div>
        </Router>
    );
}