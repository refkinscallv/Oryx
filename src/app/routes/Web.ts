import { Request, Response } from 'express';
import Routes from '@core/Routes';
import Common from '@core/Common';

Routes.get('/', (req: Request, res: Response) => {
    Common.resJson(res, true, 200, 'Welcome To Oryx', null);
});
