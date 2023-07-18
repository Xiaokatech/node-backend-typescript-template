import { Router } from 'express';
import indexCtrl from '../2_controllers/indexCtrl';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Index
 *   description: Index routes
 */
/**
 * @openapi
 * /:
 *  get:
 *      description: Route to check if the api is online
 *      tags:
 *          - Index
 *      security:
 *          - ApiKeyBasicAuth: []
 *      responses:
 *          '200':
 *              description: Success
 */
router.route('/').get(indexCtrl.index);
router.route('/demo').get(indexCtrl.demo);

export default router;
