import {Request, Response, NextFunction} from 'express';

const activityLogger = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}${req.query.category ? ' - category: ' +
        req.query.category : ''}${req.query.limit ? ' limit: ' + req.query.limit : ''}${req.query.start ?
        ' start: ' + req.query.start : ''}${req.query.filter ?
        ' filter: ' + req.query.filter : ''}`);
    next();
};

export default activityLogger;

