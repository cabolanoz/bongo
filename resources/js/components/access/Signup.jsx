import React from 'react';
import { Form, Button } from 'react-bootstrap';

import '../../styles/_access_form.scss';

const Signup = () => {
  return (
    <div className="mx-auto access-form my-5">
      <h1 className="text-center access-form__title">LLENA LOS DATOS PARA PODER REGISTRARTE</h1>
      <Form className="access-form__form">
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre" required />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control type="email" placeholder="Correo Electrónico" required />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" required />
        </Form.Group>
        <Button block variant="dark" type="submit">Registrarme</Button><br />
      </Form>
    </div>
  );
};

export default Signup;
