import validator from '../utils/validator';

const withValidator = (next, apiId) => async (req, res) => {
  const isInputValid = validator(req.body, apiId);

  if (!isInputValid) {
    return res.status(400).end();
  }

  return next(req, res);
};

export default withValidator;
