import { Router, type IRouter } from "express";
import healthRouter from "./health";
import quotesRouter from "./quotes";
import servicesRouter from "./services";
import contentRouter from "./content";
import publishRouter from "./publish";

const router: IRouter = Router();

router.use(healthRouter);
router.use(quotesRouter);
router.use(servicesRouter);
router.use(contentRouter);
router.use(publishRouter);

export default router;
