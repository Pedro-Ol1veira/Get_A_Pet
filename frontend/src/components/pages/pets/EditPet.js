import api from "../../../utils/api";
import { useState, useEffect } from "react";
import Styles from './AddPets.module.css';
import PetForm from '../../form/PetForm';
import useFlashMessage from "../../../hooks/useFlahsMessage";
import { useParams } from "react-router-dom";

function EditPet() {
    const [pet, setPet] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');
    const { id } = useParams();
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        api.get(`/pets/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        })
            .then((response) => {
                setPet(response.data.pet);
            });

    }, [token, id]);

    async function updatePet(pet) {
        let msgType = 'success';
        const formData = new FormData();
        await Object.keys(pet).forEach((key) => {
            if (key === 'image') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i]);
                }
            } else {
                formData.append(key, pet[key])
            };
        });

        const data = await api.patch(`pets/${pet._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                "Content-Type": 'multipart/form-data'
            }
        })
            .then((response) =>{
                return response.data;
            })
            .catch((err) => {
                msgType = 'error';
                return err.response.data;
            });

        setFlashMessage(data.message, msgType);
    }

    return (
        <section>
            <div className={Styles.addpet_header}>
                <h1>Editando o pet: {pet.name}</h1>
                <p>Depois da edição os dados serão atualizados no sistema</p>
            </div>
            {pet.name && (
                <PetForm
                    handleSubmit={updatePet}
                    btnText="Atualizar"
                    petData={pet}
                />
            )}
        </section>
    );
};

export default EditPet;