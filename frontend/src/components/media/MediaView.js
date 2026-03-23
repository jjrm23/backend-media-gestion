import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../helpers/axios-config';
import Swal from 'sweetalert2';

export const MediaView = () => {
    const [media, setMedia] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);
    
    const [valoresForm, setValoresForm] = useState({
        serial: '', titulo: '', sinopsis: '', url: '', 
        foto: '', año: '', genero: '', director: '', 
        productora: '', tipo: ''
    });

    // Configuración de colores para el video de la IUD
    const styleInput = { backgroundColor: '#2d333b', color: 'white', border: 'none' };
    const styleLabel = { color: 'white', fontWeight: 'bold', fontSize: '0.85rem' };

    const cargarDatos = async () => {
        try {
            const [respG, respD, respP, respT, respM] = await Promise.all([
                axiosInstance.get('genero'),
                axiosInstance.get('director'),
                axiosInstance.get('productora'),
                axiosInstance.get('tipo'),
                axiosInstance.get('media')
            ]);

            setGeneros(respG.data);     
            setDirectores(respD.data);   
            setProductoras(respP.data);  
            setTipos(respT.data);
            setMedia(respM.data);
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Error al cargar catálogos', 'error');
        }
    };

    useEffect(() => { cargarDatos(); }, []);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({ allowOutsideClick: false, text: 'Guardando...' });
            Swal.showLoading();
            await axiosInstance.post('media', valoresForm);
            Swal.close();
            setValoresForm({ 
                serial: '', titulo: '', sinopsis: '', url: '', 
                foto: '', año: '', genero: '', director: '', 
                productora: '', tipo: '' 
            });
            cargarDatos();
            Swal.fire('Éxito', 'Película agregada correctamente', 'success');
        } catch (error) {
            Swal.close();
            const mensaje = error.response?.data || 'Error al crear';
            Swal.fire('Error', mensaje, 'error');
        }
    };

    return (
        // Fondo negro azulado para toda la página
        <div className="container-fluid p-4" style={{ backgroundColor: '#1a1d24', minHeight: '100vh' }}>
            
            <h2 className="mb-4 border-bottom pb-2" style={{ color: '#00d8ff', fontWeight: 'bold' }}>
                🎬 Gestión de Media (Películas y Series)
            </h2>
            
            {/* Formulario con contraste mejorado */}
            <form onSubmit={handleOnSubmit} className="row g-3 mb-5 p-4 rounded shadow-lg" style={{ backgroundColor: '#0d1117', border: '1px solid #30363d' }}>
                <div className="col-md-3">
                    <label className="form-label" style={styleLabel}>Serial (Único)</label>
                    <input type="text" name="serial" value={valoresForm.serial} onChange={handleOnChange} className="form-control shadow-none" style={styleInput} required />
                </div>
                <div className="col-md-6">
                    <label className="form-label" style={styleLabel}>Título</label>
                    <input type="text" name="titulo" value={valoresForm.titulo} onChange={handleOnChange} className="form-control shadow-none" style={styleInput} required />
                </div>
                <div className="col-md-3">
                    <label className="form-label" style={styleLabel}>Año Estreno</label>
                    <input type="number" name="año" value={valoresForm.año} onChange={handleOnChange} className="form-control shadow-none" style={styleInput} required />
                </div>
                <div className="col-md-12">
                    <label className="form-label" style={styleLabel}>Sinopsis</label>
                    <textarea name="sinopsis" value={valoresForm.sinopsis} onChange={handleOnChange} className="form-control shadow-none" style={styleInput} rows="2" required></textarea>
                </div>
                <div className="col-md-6">
                    <label className="form-label" style={styleLabel}>URL Película</label>
                    <input type="url" name="url" value={valoresForm.url} onChange={handleOnChange} className="form-control shadow-none" style={styleInput} required />
                </div>
                <div className="col-md-6">
                    <label className="form-label" style={styleLabel}>URL Imagen (Portada)</label>
                    <input type="url" name="foto" value={valoresForm.foto} onChange={handleOnChange} className="form-control shadow-none" style={styleInput} required placeholder="https://..." />
                </div>

                {/* Selectores con texto visible */}
                <div className="col-md-3">
                    <label className="form-label" style={styleLabel}>Género</label>
                    <select name="genero" value={valoresForm.genero} onChange={handleOnChange} className="form-select shadow-none" style={styleInput} required>
                        <option value="" style={{backgroundColor: '#0d1117'}}>Seleccione...</option>
                        {generos.map(g => <option key={g._id} value={g._id} style={{backgroundColor: '#0d1117'}}>{g.nombre}</option>)}
                    </select>
                </div>
                <div className="col-md-3">
                    <label className="form-label" style={styleLabel}>Director</label>
                    <select name="director" value={valoresForm.director} onChange={handleOnChange} className="form-select shadow-none" style={styleInput} required>
                        <option value="" style={{backgroundColor: '#0d1117'}}>Seleccione...</option>
                        {directores.map(d => <option key={d._id} value={d._id} style={{backgroundColor: '#0d1117'}}>{d.nombres}</option>)}
                    </select>
                </div>
                <div className="col-md-3">
                    <label className="form-label" style={styleLabel}>Productora</label>
                    <select name="productora" value={valoresForm.productora} onChange={handleOnChange} className="form-select shadow-none" style={styleInput} required>
                        <option value="" style={{backgroundColor: '#0d1117'}}>Seleccione...</option>
                        {productoras.map(p => <option key={p._id} value={p._id} style={{backgroundColor: '#0d1117'}}>{p.nombre}</option>)}
                    </select>
                </div>
                <div className="col-md-3">
                    <label className="form-label" style={styleLabel}>Tipo</label>
                    <select name="tipo" value={valoresForm.tipo} onChange={handleOnChange} className="form-select shadow-none" style={styleInput} required>
                        <option value="" style={{backgroundColor: '#0d1117'}}>Seleccione...</option>
                        {tipos.map(t => <option key={t._id} value={t._id} style={{backgroundColor: '#0d1117'}}>{t.nombre}</option>)}
                    </select>
                </div>

                <div className="col-12 text-center mt-4">
                    <button className="btn btn-info btn-lg px-5 fw-bold shadow-sm" style={{borderRadius: '10px'}}>
                        🚀 Publicar en Cartelera
                    </button>
                </div>
            </form>

            {/* Grid de Cartas Arreglado */}
            <div className="row g-4 mt-2">
                {media.map(m => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={m._id}>
                        <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden" 
                             style={{ backgroundColor: '#0d1117', transition: 'transform 0.3s' }}
                             onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                             onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                            
                            <div style={{ height: '350px', overflow: 'hidden' }}>
                                <img src={m.foto} className="card-img-top w-100 h-100" alt={m.titulo} style={{objectFit: 'cover'}} />
                            </div>

                            <div className="card-body d-flex flex-column justify-content-between p-3">
                                <div>
                                    <h5 className="card-title fw-bold text-info text-truncate">{m.titulo}</h5>
                                    <p className="card-text small text-secondary" style={{
                                        display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                    }}>
                                        {m.sinopsis}
                                    </p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-3 border-top pt-2 border-secondary">
                                    <span className="badge bg-danger rounded-pill px-3">{m.año}</span>
                                    <small className="text-muted" style={{fontSize: '0.7rem'}}>{m.serial}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};