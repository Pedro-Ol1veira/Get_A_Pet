import api from '../../../utils/api';
import Styles from './AddPets.module.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlahsMessage';



function AddPet() {
    return (
        <section className={Styles.addPet_header}>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponivel para adoção</p>
            </div>
            <p>Formulario</p>
        </section>
    );
};

export default AddPet;