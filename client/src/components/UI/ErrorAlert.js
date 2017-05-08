import React from 'react';
import { Alert } from 'reactstrap';

const ErrorAlert = ({ message }) => <Alert color="danger">{message}</Alert>;

export default ErrorAlert;
