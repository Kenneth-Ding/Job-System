import { Router } from 'express'
import { bossAcceptApplyment } from '@/server/applyment'
import { bossRefuseApplyment } from '@/server/applyment'
import { applicantAcceptApplyment } from '@/server/applyment'
import { applicantGiveupApplyment } from '@/server/applyment'
import { applicantRefuseApplyment } from '@/server/applyment'
import { findDataApplyment } from '@/server/applyment'
import { findAllApplicant } from '@/server/applyment'

import { Types } from 'mongoose'

const router = Router()

async function testbossAcceptApplyment1() {
    return await bossAcceptApplyment(Types.ObjectId('5fde0206359f4c512ce389be')) == 200 
}
async function testbossAcceptApplyment2() {
    return await bossAcceptApplyment(Types.ObjectId('5fde0206359f4c512ce389ba')) == 404
}
async function testbossRefuseApplyment1() {
    return await bossRefuseApplyment(Types.ObjectId('5fde0206359f4c512ce389be')) == 200
}
async function testbossRefuseApplyment2() {
    return await bossRefuseApplyment(Types.ObjectId('5fde0206359f4c512ce389ba')) == 404
}
async function testapplicantAcceptApplyment1() {
    return await applicantAcceptApplyment(Types.ObjectId('5fde0206359f4c512ce389be')) == 200
}
async function testapplicantAcceptApplyment2() {
    return await applicantAcceptApplyment(Types.ObjectId('5fde0206359f4c512ce389ba')) == 404
}
async function testapplicantGiveupApplyment1() {
    return await applicantGiveupApplyment(Types.ObjectId('5fde0206359f4c512ce389be')) == 200
}
async function testapplicantGiveupApplyment2() {
    return await applicantGiveupApplyment(Types.ObjectId('5fde0206359f4c512ce389ba')) == 404
}
async function testapplicantRefuseApplyment1() {
    return await applicantRefuseApplyment(Types.ObjectId('5fde0206359f4c512ce389be')) == 200
}
async function testapplicantRefuseApplyment2() {
    return await applicantRefuseApplyment(Types.ObjectId('5fde0206359f4c512ce389ba')) == 404
}
async function testfindDataApplyment() {
    return await findDataApplyment(Types.ObjectId('5fda3086503d8f1f9c33f97a'))
}
async function testfindAllApplicant() {
    return await findAllApplicant(Types.ObjectId('5fda3086503d8f1f9c33f97a'))
}

router.get('/', async (req, res) => {
    res.json({
        testbossAcceptApplyment1 : await testbossAcceptApplyment1(),
        testbossAcceptApplyment2 : await testbossAcceptApplyment2(),
        testbossRefuseApplyment1 : await testbossRefuseApplyment1(),
        testbossRefuseApplyment2 : await testbossRefuseApplyment2(),
        testapplicantAcceptApplyment1 : await testapplicantAcceptApplyment1(),
        testapplicantAcceptApplyment2 : await testapplicantAcceptApplyment2(),
        testapplicantGiveupApplyment1 : await testapplicantGiveupApplyment1(),
        testapplicantGiveupApplyment2 : await testapplicantGiveupApplyment2(),
        testapplicantRefuseApplyment1 : await testapplicantRefuseApplyment1(),
        testapplicantRefuseApplyment2 : await testapplicantRefuseApplyment2(),
        testfindDataApplyment : await testfindDataApplyment(),
        testfindAllApplicant : await testfindAllApplicant()
        })
})
export default router