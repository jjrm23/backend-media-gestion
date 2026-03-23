import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../helpers/axios-config';
import Swal from 'sweetalert2';

export const ProductoraView = () => {
    const [productoras, setProductoras] = useState([]);
    const [valoresForm, setValoresForm] = useState({
        nombre: '',
        estado: 'Activo',
        slogan: '',
        descripcion: ''
    });

    const listarProductoras = async () => {
        try {
            Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
            Swal.showLoading();
            const { data } = await axiosInstance.get('productora');
            setProductoras(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    };

    useEffect(() => {
        listarProductoras();
    }, []);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
            Swal.showLoading();
            await axiosInstance.post('productora', valoresForm);
            Swal.close();
            setValoresForm({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
            listarProductoras();
        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire('Error', 'Ocurrió un error al crear la productora', 'error');
        }
    };

    return (
        <div className="container-fluid bg-dark text-white p-4">
            <h2 className="mb-4">Productoras</h2>
            
            <form onSubmit={handleOnSubmit} className="row g-3 mb-4 p-3 border border-secondary rounded">
                <div className="col-md-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="nombre" value={valoresForm.nombre} 
                        onChange={handleOnChange} className="form-control bg-secondary text-white" required />
                </div>
                <div className="col-md-2">
                    <label className="form-label">Estado</label>
                    <select name="estado" value={valoresForm.estado} 
                        onChange={handleOnChange} className="form-select bg-secondary text-white">
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Slogan</label>
                    <input type="text" name="slogan" value={valoresForm.slogan} 
                        onChange={handleOnChange} className="form-control bg-secondary text-white" required />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Descripción</label>
                    <input type="text" name="descripcion" value={valoresForm.descripcion} 
                        onChange={handleOnChange} className="form-control bg-secondary text-white" required />
                </div>
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary px-5">Guardar Productora</button>
                </div>
            </form>

            <div className="table-responsive">
                <table className="table table-dark table-hover border-secondary">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Slogan</th>
                            <th>Descripción</th>
                            <th>Creación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productoras.map(prod => (
                            <tr key={prod._id}>
                                <td>{prod.nombre}</td>
                                <td>{prod.estado}</td>
                                <td>{prod.slogan}</td>
                                <td>{prod.descripcion}</td>
                                <td>{new Date(prod.fechaCreacion).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};