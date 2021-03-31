import React from 'react';
import { Form, Button } from 'react-bootstrap';

import '../../styles/_access_form.scss';

const ContactUs = () => {
  return (
    <div className="mx-auto access-form my-5">
      <h1 className="text-center access-form__title">CONTACTO</h1>
      <p className="text-center access-form__desc">¿Tenés algo que compartir con nosotros?, Escribínos y con gusto te vamos a responder</p>
      <Form className="access-form__form">
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre" required />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control type="email" placeholder="Correo Electrónico" required />
        </Form.Group>
        <Form.Group controlId="message">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={4} required />
        </Form.Group>
        <Button block variant="dark" type="submit">Enviar</Button><br />
      </Form>
    </div>
  );
};

export default ContactUs;
