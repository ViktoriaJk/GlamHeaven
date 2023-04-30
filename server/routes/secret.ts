import { Request, Response, Router } from 'express';
import { UserVType, verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.get('/', verifyToken, (req: Request, res: Response) => {
  const user = res.locals.user as UserVType;
  //console.log(user);
  res.json({ msg: 'Secret Message' });
});

export default router;
