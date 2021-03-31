import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Routes } from '../../const';

import '../../styles/_access_form.scss';

const Login = () => {
  return (
    <div className="mx-auto access-form my-5">
      <h1 className="text-center access-form__title">INICIA SESIÓN</h1>
      <p className="text-center access-form__desc">Quiúbole, apúrate e iniciá sesión ya para que no te perdás de todas las cosas tuanis que tiene ¡Nos Juimos!</p>
      <Form className="access-form__form">
        <Form.Group controlId="email">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control type="email" placeholder="Correo Electrónico" required />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" required />
        </Form.Group>
        <Button block variant="dark" type="submit">Entrar</Button><br />
        <Link className="d-block text-right" to={Routes.forgetPassword()}>¿Olvidaste la contraseña?</Link>
      </Form>
    </div>
  );
};

export default Login;
