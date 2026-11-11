import api from '../../../utils/api'

import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'

import styles from './PetDetails.module.css'

import { Context } from '../../../context/UserContext'
import useFlashMessage from '../../../hooks/useFashMessage'

function PetDetails() {
    const [pet, setPet] = useState(null)
    const [notFound, setNotFound] = useState(false)
    const { id } = useParams()
    const { authenticated } = useContext(Context)
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get(`/pets/${id}`)
            .then((response) => setPet(response.data.pet))
            .catch(() => setNotFound(true))
    }, [id])

    async function schedule() {
        let msgType = 'sucess'
        const token = localStorage.getItem('token') || ''

        const data = await api.patch(`/pets/schedule/${pet._id}`, null, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response?.data?.message ? err.response.data : { message: 'Não foi possível agendar a visita. Tente novamente.' }
        })

        setFlashMessage(data.message, msgType)
    }

    if (notFound) {
        return <p>Pet não encontrado!</p>
    }

    if (!pet) {
        return <p>Carregando...</p>
    }

    return (
        <section className={styles.pet_details_container}>
            <div className={styles.pet_details_header}>
                <h1>Conhecendo o Pet: {pet.name}</h1>
                <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
            </div>
            <div className={styles.pet_images}>
                {pet.images.map((image) => (
                    <img
                        src={`${api.defaults.baseURL}/images/pets/${image}`}
                        alt={pet.name}
                        key={image}
                    />
                ))}
            </div>
            <p>
                <span className="bold">Peso:</span> {pet.weight}kg
            </p>
            <p>
                <span className="bold">Idade:</span> {pet.age} anos
            </p>
            <p>
                <span className="bold">Cor:</span> {pet.color}
            </p>
            <p>
                <span className="bold">Tutor:</span> {pet.user.name}
            </p>
            {!pet.available ? (
                <p className={styles.adopted}>Este pet já foi adotado!</p>
            ) : authenticated ? (
                <button onClick={schedule}>Solicitar uma visita</button>
            ) : (
                <p>
                    Você precisa <Link to="/register">criar uma conta</Link> ou <Link to="/login">entrar</Link> para
                    solicitar a visita.
                </p>
            )}
        </section>
    )
}

export default PetDetails
