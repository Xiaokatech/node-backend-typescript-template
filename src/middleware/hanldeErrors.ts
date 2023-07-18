import { GeneralError } from '../tools/error';

interface IErrorLogger {
  kind: any;
  message: any;
  request: any;
  path: any;
  body: any;
  params: any;
  userID: any;
}
// eslint-disable-next-line camelcase
const IErrorLogger_default = {
  kind: null,
  message: null,
  request: null,
  path: null,
  body: null,
  params: null,
  userID: null,
};

const logger = (req, err, errorCode: number) => {
  if ('password' in req.body) {
    req.body.password = '***';
  }
  if ('new_password' in req.body) {
    req.body.new_password = '***';
  }
  if ('old_password' in req.body) {
    req.body.old_password = '***';
  }

  // eslint-disable-next-line camelcase
  const error: IErrorLogger = IErrorLogger_default;

  error.kind = errorCode;
  error.message = err.message;
  error.request = req.method;
  // error.path = req.route?.path;
  error.path = req.originalUrl;
  error.body = JSON.stringify(req.body);
  error.params = JSON.stringify(req.params);
  error.userID = req.userID;

  console.error(JSON.stringify(error));
};

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    logger(req, err, err.getCode());
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message,
    });
  }

  logger(req, err, 500);
  return res.status(500).json({
    status: 'error',
    message: err.message,
  });
};

export default handleErrors;
