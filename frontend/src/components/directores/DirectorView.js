import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../helpers/axios-config';
import Swal from 'sweetalert2';

export const DirectorView = () => {
    const [directores, setDirectores] = useState([]);
    const [valoresForm, setValoresForm] = useState({
        nombres: '',
        estado: 'Activo'
    });

    const listarDirectores = async () => {
        try {
            Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
            Swal.showLoading();
            const { data } = await axiosInstance.get('director');
            setDirectores(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    };

    useEffect(() => {
        listarDirectores();
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
            await axiosInstance.post('director', valoresForm);
            Swal.close();
            setValoresForm({ nombres: '', estado: 'Activo' });
            listarDirectores();
        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire('Error', 'Ocurrió un error al crear el director', 'error');
        }
    };

    return (
        <div className="container-fluid bg-dark text-white p-4">
            <h2 className="mb-4">Directores</h2>
            
            <form onSubmit={handleOnSubmit} className="row g-3 mb-4 p-3 border border-secondary rounded">
                <div className="col-md-6">
                    <label className="form-label">Nombres del Director</label>
                    <input type="text" name="nombres" value={valoresForm.nombres} 
                        onChange={handleOnChange} className="form-control bg-secondary text-white" required />
                </div>
                <div className="col-md-3">
                    <label className="form-label">Estado</label>
                    <select name="estado" value={valoresForm.estado} 
                        onChange={handleOnChange} className="form-select bg-secondary text-white">
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                <div className="col-md-3 d-flex align-items-end">
                    <button className="btn btn-primary w-100">Guardar Director</button>
                </div>
            </form>

            <table className="table table-dark table-hover border-secondary">
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Estado</th>
                        <th>Fecha Creación</th>
                        <th>Fecha Actualización</th>
                    </tr>
                </thead>
                <tbody>
                    {directores.map(director => (
                        <tr key={director._id}>
                            <td>{director.nombres}</td>
                            <td>{director.estado}</td>
                            <td>{new Date(director.fechaCreacion).toLocaleDateString()}</td>
                            <td>{new Date(director.fechaActualizacion).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};