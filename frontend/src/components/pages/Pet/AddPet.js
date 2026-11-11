import api from '../../../utils/api'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import formStyles from '../../form/Form.module.css'

import Input from '../../form/Input'

import useFlashMessage from '../../../hooks/useFashMessage'

function AddPet() {
    const [pet, setPet] = useState({})
    const [images, setImages] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    function handleChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }

    function onFileChange(e) {
        setImages([...e.target.files])
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let msgType = 'sucess'

        const formData = new FormData()
        Object.keys(pet).forEach((key) => formData.append(key, pet[key]))
        images.forEach((image) => formData.append('images', image))

        const data = await api.post('/pets/create', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            // fallback for network errors, which have no response body
            return err.response?.data?.message ? err.response.data : { message: 'Não foi possível cadastrar o pet. Tente novamente.' }
        })

        setFlashMessage(data.message, msgType)

        if (msgType !== 'error') {
            navigate('/')
        }
    }

    return (
        <section>
            <h1>Cadastre um Pet</h1>
            <p>Depois ele ficará disponível para adoção</p>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                <Input
                    text='Imagens do Pet'
                    type='file'
                    name='images'
                    handleOnChange={onFileChange}
                    multiple={true}
                />
                <Input
                    text='Nome do Pet'
                    type='text'
                    name='name'
                    placeholder='Digite o nome'
                    handleOnChange={handleChange}
                    value={pet.name || ''}
                />
                <Input
                    text='Idade do Pet'
                    type='number'
                    name='age'
                    placeholder='Digite a idade'
                    handleOnChange={handleChange}
                    value={pet.age || ''}
                />
                <Input
                    text='Peso do Pet'
                    type='number'
                    name='weight'
                    placeholder='Digite o peso'
                    handleOnChange={handleChange}
                    value={pet.weight || ''}
                />
                <Input
                    text='Cor do Pet'
                    type='text'
                    name='color'
                    placeholder='Digite a cor'
                    handleOnChange={handleChange}
                    value={pet.color || ''}
                />
                <input type='submit' value='Cadastrar Pet' />
            </form>
        </section>
    )
}

export default AddPet
