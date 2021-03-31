import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

import '../../styles/_access_form.scss';

const Login = () => {
  return (
    <div className="mx-auto access-form my-5">
      <h1 className="text-center access-form__title">OLVIDASTE TU CONTRASEÑA</h1>
      <Form className="access-form__form">
        <InputGroup>
          <Form.Control type="email" placeholder="Correo Electrónico" required />
          <InputGroup.Append>
            <Button variant="dark" type="submit">Enviar</Button><br />
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </div>
  );
};

export default Login;
