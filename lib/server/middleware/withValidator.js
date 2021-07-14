import validator from '../utils/validator';

const withValidator = (next, apiId) => async (req, res) => {
  try {
    await validator(req.body, apiId, req.method);
  } catch (err) {
    return res.status(400).json({ message: 'Data tidak valid' });
  }

  return next(req, res);
};

export default withValidator;
