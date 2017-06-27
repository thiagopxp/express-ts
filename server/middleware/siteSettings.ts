import { Request, Response, Router } from 'express';

const siteSettings = (req: Request, res: Response, next: Function) => {

  res.app.locals.site = {
    name: 'MaRS monitoring tool'
  };
  next();
}

export {
  siteSettings
}
