/* eslint-disable import/prefer-default-export */
import { container } from '@trust/core'; // eslint-disable-line
import express from 'express';

const apiAdapterContainer = container.init({
  express: express
});

export { apiAdapterContainer };
