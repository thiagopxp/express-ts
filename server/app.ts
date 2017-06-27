import { json, urlencoded } from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as path from 'path';
import * as lessMiddleware from 'less-middleware';

// import { Config } from './config';
// import { SiteSettings } from './models';

import { localHelpers } from './middleware/localHelpers';
import { siteSettings } from './middleware/siteSettings';

import { homeRouter } from './routes/home';

const app: express.Application = express();

// view engine setup
app.set('views', path.join(__dirname, '../../server/views'));
app.set('view engine', 'pug');

app.disable('x-powered-by');

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));
app.use(lessMiddleware(path.join(__dirname, '../../public/less'), {
    dest: path.join(__dirname, '../../public'),
    // indentedSyntax: false, // true = .sass and false = .scss
    force: true,
    debug: true,
    // sourceMap: true,
    prefix: '/css',
    // outputStyle: 'compressed',
    // log: (s, k, v) => { console.error(`level:${s}, key:${k}, value:${v}`); }
}));
app.use(express.static(path.join(__dirname, '../../public')));

// =================
// EMPOWER TEMPLATES
// =================

app.use(siteSettings);
app.use(localHelpers);

// ==========
// API ROUTES
// ==========

// HOME
app.use('/', homeRouter);

app.use((req, res, next) => {
    const err: { status?: number } = new Error('Not found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : { status: err.status };

    console.log('ERROR STATUS:', res.locals.error);

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export { app };
