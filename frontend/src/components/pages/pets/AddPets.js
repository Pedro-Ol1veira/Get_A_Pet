import api from '../../../utils/api';
import Styles from './AddPets.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlahsMessage';
import PetForm from '../../form/PetForm';
// import { errorMonitor } from 'events';



function AddPet() {
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();
    async function registerPet(pet) {
        let msgType = 'success';

        const formData = new FormData();
        await Object.keys(pet).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i]);
                }
            } else {
                formData.append(key, pet[key]);
            };
        });

        const data = await api.post('pets/create', formData, {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Tyé': 'multipart/form-data'
        })
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                msgType = 'error'
                return err.response.data;
            });

        setFlashMessage(data.message, msgType);
        if (msgType !== 'error') {
            navigate('/pets/mypets');
        }
    };

    return (
        <section className={Styles.addPet_header}>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponivel para adoção</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
        </section>
    );
};

export default AddPet;