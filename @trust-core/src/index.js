import Validations from './validations';
import { container } from './ioc/container';

const Core = {
  Validations,
  container
};

export { Core as default, Validations, container };
