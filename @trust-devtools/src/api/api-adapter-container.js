import { container } from '@trust/core'; // eslint-disable-line
import express from 'express';

const apiAdapterContainer = container.init({
  express
});

export { apiAdapterContainer as default, apiAdapterContainer };
