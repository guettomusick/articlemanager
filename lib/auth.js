const authKey = process.env.TOKEN || '5CD4ED173E1C95FE763B753A297D5';

const isAuthorized = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(!token) {
    return res.status(403).send({ success: false, message: 'No token provided.' });
  }
  if(token !== authKey) {
    return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });    
  }
  next();
};

module.exports = {
  isAuthorized
};
