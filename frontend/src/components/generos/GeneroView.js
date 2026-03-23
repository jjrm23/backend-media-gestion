import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../helpers/axios-config';
import Swal from 'sweetalert2';

export const GeneroView = () => {
    const [generos, setGeneros] = useState([]);
    const [valoresForm, setValoresForm] = useState({
        nombre: '',
        estado: 'Activo',
        descripcion: ''
    });

    const listarGeneros = async () => {
        try {
            Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
            Swal.showLoading();
            const { data } = await axiosInstance.get('genero');
            setGeneros(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    };

    useEffect(() => {
        listarGeneros();
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
            await axiosInstance.post('genero', valoresForm);
            Swal.close();
            setValoresForm({ nombre: '', estado: 'Activo', descripcion: '' });
            listarGeneros();
        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire('Error', 'Ocurrió un error al crear el género', 'error');
        }
    };

    return (
        <div className="container-fluid bg-dark text-white p-4">
            <h2 className="mb-4">Géneros</h2>
            
            <form onSubmit={handleOnSubmit} className="row g-3 mb-4 p-3 border border-secondary rounded">
                <div className="col-md-4">
                    <label className="form-label">Nombre del Género</label>
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
                <div className="col-md-4">
                    <label className="form-label">Descripción</label>
                    <input type="text" name="descripcion" value={valoresForm.descripcion} 
                        onChange={handleOnChange} className="form-control bg-secondary text-white" required />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                    <button className="btn btn-primary w-100">Guardar</button>
                </div>
            </form>

            <table className="table table-dark table-hover border-secondary">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Descripción</th>
                        <th>Fecha Creación</th>
                    </tr>
                </thead>
                <tbody>
                    {generos.map(genero => (
                        <tr key={genero._id}>
                            <td>{genero.nombre}</td>
                            <td>{genero.estado}</td>
                            <td>{genero.descripcion}</td>
                            <td>{new Date(genero.fechaCreacion).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};