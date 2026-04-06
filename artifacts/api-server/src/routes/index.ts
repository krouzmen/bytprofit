import { Router, type IRouter } from "express";
import healthRouter from "./health";
import quotesRouter from "./quotes";
import servicesRouter from "./services";
import contentRouter from "./content";
import publishRouter from "./publish";
import galleryRouter from "./gallery";

const router: IRouter = Router();

router.use(healthRouter);
router.use(quotesRouter);
router.use(servicesRouter);
router.use(contentRouter);
router.use(publishRouter);
router.use(galleryRouter);

export default router;
