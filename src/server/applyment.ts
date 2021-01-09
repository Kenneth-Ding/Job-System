import { DApplyment, Applyment, Job, Account } from './models'
import { sendNots } from '@/server/notification'

import { Types } from 'mongoose'
import 'ts-mongoose/plugin'

export enum State {
    Pending = 0, // 初始狀態，等待刊登者回應
    Accepted, // 刊登者接受
    Rejected, // 刊登者拒絕
    Abandoned, // 申請人放棄
    Confirmed, // 申請人確認,
    Finished // 完成
}

function notify(id: any, title: string, text: string) {
    sendNots([Types.ObjectId(id)], title, text)
}

export async function apply({ applicant, job, resume }: {
    applicant: string,
    job: string,
    resume: string
}) {
    let doc = await Job.findById(job)

    if (!doc)
        return 404



export const bossConfirm = async(applyment: Types.ObjectId, boss: Types.ObjectId) => {
    const targetApplyment = await Applyment.findById(applyment)
    const targetJob = await Job.findById(targetApplyment?.job)
    if (String(targetJob?.publisher) == String(boss)) {
        console.log('確認為同一人')
    }
    else {
        console.log('無權限')
    if (doc.publisher === Types.ObjectId(applicant))
        return 403

    let publisher = doc.publisher as Types.ObjectId


    // sendNots([publisher], `新的應徵者`, `${applyment.job.title}`)

    return
}

export async function find(job?: string, applicant?: string) {
    let query: any = {
        job,
        applicant
    }

    for (let [key, val] of Object.entries(query)) {
        if (val === undefined) {
            delete query[key]
        }
    }

    let docs = await Applyment.find(query)
    return docs
}

export const findAllApplicant = async(job: Types.ObjectId) => {
    const targetApplyment = await Applyment.find({job: job})
    var targetApplicant =new Array();
    var ApplicantName =new Array();
    for (let i = 0; i < targetApplyment.length; i++) {
        targetApplicant.push(await Account.find({_id: targetApplyment[i].applicant}))
    }
    for (let i = 0; i < targetApplicant.length; i++) {
        ApplicantName.push((targetApplicant[i][0].personal.nameZH))
    }
    if (targetApplyment) {
        console.log('查詢成功')
        return ApplicantName
    }
}

export const bossAcceptApplyment = async(applyment: Types.ObjectId) => {
    const targetApplyment = await Applyment.findById(applyment)
    const targetJob = await Job.findById(targetApplyment?.job)
    const targetApplicant = await Account.findById(targetApplyment?.applicant)
    const applicantarray: Types.ObjectId[] = [targetApplicant?._id]
    if (targetApplyment) {
            bossAccept(targetApplyment)
            sendNots(applicantarray, '工作申請', targetJob?.title + '的工作申請已被接受 :)')
            console.log('老闆成功接受')
            return 200
    }
    else {
        console.log('無此應徵')
        return 404
    }
}
export const bossRefuseApplyment = async(applyment: Types.ObjectId) => {
    const targetApplyment = await Applyment.findById(applyment)
    const targetJob = await Job.findById(targetApplyment?.job)
    const targetApplicant = await Account.findById(targetApplyment?.applicant)
    const applicantarray: Types.ObjectId[] = [targetApplicant?._id]
    if (targetApplyment) {
            bossRefuse(targetApplyment)
            sendNots(applicantarray, '工作申請', targetJob?.title + '的工作申請已被拒絕 :(')
            console.log('老闆成功拒絕')
            return 200
    }
    else {
        console.log('無此應徵')
export async function accept(id: string) {
    let applyment = await Applyment.findById(id).populateTs('job')

    if (!applyment) {
        return 404
    }

    notify(id, '工作申請', `${applyment.job.title}的工作申請已被接受 :)`)

    applyment.state = State.Accepted
    await applyment.save()
}

export async function reject(id: string) {
    let applyment = await Applyment.findById(id).populateTs('job')

    if (!applyment) {
        return 404
    }

    notify(id, '工作申請', `${applyment.job.title}的工作申請已被拒絕 :(`)

    applyment.state = State.Rejected
    await applyment.save()
}

export async function confirm(id: string) {
    let applyment = await Applyment.findById(id)
        .populateTs('job')
        .populateTs('applicant')

    if (!applyment) {
        return 404
    }


    // notify(id, '工作申請', `${applyment.job.title}的工作申請已被拒絕 :(`)

    applyment.state = State.Confirmed
    await applyment.save()
}

export async function abandon(id: string) {
    let applyment = await Applyment.findById(id)
        .populateTs('job')
        .populateTs('applicant')

    if (!applyment) {
        return 404
    }

// applicantRefuseApplyment(Types.ObjectId('5fde0206359f4c512ce389ba'))
// applicantConfirm(Types.ObjectId('5fde0206359f4c512ce389be'), Types.ObjectId('5fd258253ec604545ce35e46'))
findAllApplicant(Types.ObjectId('5fda3086503d8f1f9c33f97a'))
    applyment.state = State.Abandoned
    await applyment.save()
}
