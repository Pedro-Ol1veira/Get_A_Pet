import api from "../../utils/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Styles from './Home.module.css';


function Home() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        api.get('/pets')
            .then((response) => {
                setPets(response.data.pets);

            });
    }, []);
    return (
        <section>
            <div className={Styles.pet_home_header}>
                <h1>Adote um Pet</h1>
                <p>Veja os detalhes de cada um e conheça o tutor deles</p>
            </div>
            <div className={Styles.pet_container}>
                {pets.length > 0 && (
                    pets.map((pet) => (
                        <div className={Styles.pet_card}>
                            <div style={{ backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})` }} className={Styles.pet_card_image}></div>
                            <h3>{pet.name}</h3>
                            <p>
                                <span className="bold">Peso:</span> {pet.weight}Kg
                            </p>
                            {pet.available ? (
                                <Link to={`/pets/${pet._id}`}>Mais detalhes</Link>
                            ) : (
                                <p className={Styles.adopted_text}>Adotado</p>
                            )}
                        </div>
                    ))
                )}
                {pets.length === 0 && (
                    <p>Não há pets disponiveis para adoção no momento</p>
                )}
            </div>
        </section>
    );
};

export default Home;