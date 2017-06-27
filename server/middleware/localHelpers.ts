import { Request, Response, Router } from 'express';

const localHelpers = (req: Request, res: Response, next: Function) => {

    res.locals.siteUrl = req.protocol + '://' + req.get('host');
    res.locals.absoluteUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    next();

}

export {
    localHelpers
}
