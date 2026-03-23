import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../helpers/axios-config';
import Swal from 'sweetalert2';

export const TipoView = () => {
    const [tipos, setTipos] = useState([]);
    const [valoresForm, setValoresForm] = useState({
        nombre: '',
        descripcion: ''
    });

    const listarTipos = async () => {
        try {
            Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
            Swal.showLoading();
            const { data } = await axiosInstance.get('tipo');
            setTipos(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    };

    useEffect(() => {
        listarTipos();
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
            await axiosInstance.post('tipo', valoresForm);
            Swal.close();
            setValoresForm({ nombre: '', descripcion: '' });
            listarTipos();
        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire('Error', 'Ocurrió un error al crear el tipo', 'error');
        }
    };

    return (
        <div className="container-fluid bg-dark text-white p-4">
            <h2 className="mb-4">Tipos o Categorias</h2>
            
            <form onSubmit={handleOnSubmit} className="row g-3 mb-4 p-3 border border-secondary rounded">
                <div className="col-md-5">
                    <label className="form-label">Nombre (Ej: Serie, Película)</label>
                    <input type="text" name="nombre" value={valoresForm.nombre} 
                        onChange={handleOnChange} className="form-control bg-secondary text-white" required />
                </div>
                <div className="col-md-5">
                    <label className="form-label">Descripción</label>
                    <input type="text" name="descripcion" value={valoresForm.descripcion} 
                        onChange={handleOnChange} className="form-control bg-secondary text-white" required />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                    <button className="btn btn-primary w-100">Guardar Tipo</button>
                </div>
            </form>

            <table className="table table-dark table-hover border-secondary">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Fecha Creación</th>
                    </tr>
                </thead>
                <tbody>
                    {tipos.map(tipo => (
                        <tr key={tipo._id}>
                            <td>{tipo.nombre}</td>
                            <td>{tipo.descripcion}</td>
                            <td>{new Date(tipo.fechaCreacion).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};