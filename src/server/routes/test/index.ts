import { Router } from 'express'
import testapplyment from './testapplyment'
const router = Router()
router.use('/testapplyment', testapplyment)
export default router
