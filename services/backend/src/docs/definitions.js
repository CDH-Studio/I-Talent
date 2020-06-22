/**
 * @swagger
 * definitions:
 *   Language:
 *     name: language
 *     in: query
 *     description: The language which the data will be returned
 *     required: true
 *     type: string
 *     enum:
 *       - ENGLISH
 *       - FRENCH
 *   StringArray:
 *     schema:
 *       type: array
 *       items:
 *         type: string
 *   IdDescriptionArray:
 *     schema:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             format: uuid
 *           description:
 *             type: string
 *   IdNameArray:
 *     schema:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             format: uuid
 *           name:
 *             type: string
 *   DeleteManyIds:
 *     name: body
 *     in: body
 *     description: An array of UUID ids to be deleted
 *     required: true
 *     schema:
 *       type: object
 *       required: [ids]
 *       properties:
 *        ids:
 *          type: array
 *          items:
 *            type: string
 *            format: uuid
 *   200:
 *     description: Success
 *   422:
 *     description: The request does not satisfy the parameters validation
 *   500:
 *     description: Server error, either related to the database or server framework
 */
