import { Request, Response, NextFunction } from 'express';

export default {
  index: (req: Request, res: Response, next: NextFunction) => {
    console.log('Hit home page !');
    res.render('index', { title: 'Express' });
  },
  demo: (req: Request, res: Response, next: NextFunction) => {
    console.log('Hit home page demo !');
    res.send(200).json({ results: 'OK' });
  },
};
