import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import axios from 'axios'


const initialValues = {
    ad: "",
    soyad: "",
    email: "",
    password: "",
}
const initialErrors = {
    ad: false,
    soyad: false,
    email: false,
    password: false,
}

export const errorMessages = {
    ad: "Adınızı en az 3 karakter giriniz",
    soyad: "Soyadınızı en az 3 karakter giriniz",
    email: "Geçerli bir email adresi giriniz",
    password: "En az 8 karakter, en az 1 büyük harf, en az 1 küçük harf, en az 1 sembol, en az 1 rakam içermelidir",
}


function Register() {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);
    const [isValid, setIsValid] = useState(false);
    const [id, setId] = useState('');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    useEffect(() => {
        if (formData.ad.trim().length >= 3 &&
            formData.soyad.trim().length >= 3 &&
            validateEmail(formData.email) &&
            validatePassword(formData.password)) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [formData])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })

        if (name === 'ad' || name === 'soyad') {
            const hasError = value.trim().length < 3;
            setErrors((prevErrors) => ({ ...prevErrors, [name]: hasError }));
        }

        if (name === 'email') {
            const hasError = !validateEmail(value);
            setErrors((prevErrors) => ({ ...prevErrors, [name]: hasError }));
        }

        if (name === 'password') {
            const hasError = !validatePassword(value);
            setErrors((prevErrors) => ({ ...prevErrors, [name]: hasError }));
        }
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid) return;
        axios.post("https://reqres.in/api/users", formData).then((response) => {
            setId(response.data.id)
            setFormData(initialValues)
        }).catch((error) => { console.warn(error) })


    }


    return (
        <Card>
            <CardBody>
                <Form onSubmit={handleSubmit} >
                    <FormGroup >
                        <Label for="ad">
                            Ad
                        </Label>
                        <Input
                            id="ad"
                            name="ad"
                            placeholder="Adınızı giriniz"
                            type="text"
                            onChange={handleChange}
                            value={formData.ad}
                            invalid={errors.ad}
                            data-cy='ad-input'

                        />
                        {errors.ad && <FormFeedback data-cy='error-message'>
                            {errorMessages.ad}
                        </FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="soyad">
                            Soyad
                        </Label>
                        <Input
                            id="soyad"
                            name="soyad"
                            placeholder="Soyadınızı giriniz"
                            type="text"
                            onChange={handleChange}
                            value={formData.soyad}
                            invalid={errors.soyad}
                            data-cy='soyad-input'
                        />
                        {errors.soyad && <FormFeedback data-cy='error-message'>
                            {errorMessages.soyad}
                        </FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Email adresinizi giriniz"
                            type="email"
                            onChange={handleChange}
                            value={formData.email}
                            invalid={errors.email}
                            data-cy='email-input'
                        />
                        {errors.email && <FormFeedback data-cy='error-message'>
                            {errorMessages.email}
                        </FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder="Şifre giriniz"
                            type="password"
                            onChange={handleChange}
                            value={formData.password}
                            invalid={errors.password}
                            data-cy='password-input'
                        />
                        {errors.password && <FormFeedback data-cy='error-message'>
                            {errorMessages.password}
                        </FormFeedback>}
                    </FormGroup>


                    <Button disabled={!isValid} data-cy='submit-button'>
                        Kayıt ol
                    </Button>
                </Form>
            </CardBody>
            {id && <CardFooter data-cy='result-message'>
                ID: {id}
            </CardFooter>}
        </Card>


    )
}

export default Register

