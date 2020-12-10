import { createSchema, Type, typedModel, ExtractDoc, ExtractProps } from 'ts-mongoose'
import { SJob } from './job'

const SEvent = createSchema({
    name: Type.string({ required: true }),
    start: Type.string({ required: true }),
    end: Type.string({ required: true }),
    weekday: Type.number({ required: true })
})

const ResumeTemplate = createSchema({
    name: Type.string({ required: true }),
    content: Type.string({ required: true })
})

const Notification = createSchema({
    name: Type.string({ required: true }),
    content: Type.string({ required: true }),
    isRead: Type.boolean({ default: false })
})

export const SAccount = createSchema({
    email: Type.string({ required: true, unique: true }),
    hash: Type.string({ required: true }),
    ntouStudentID: Type.string({ default: '' }),
    ntouPassword: Type.string({ default: '' }),
    events: Type.array().of(SEvent),
    blacklist: Type.array().of(Type.objectId()),
    resumeTemplates: Type.array().of(ResumeTemplate),
    notification: Type.array().of(Notification),
    favorite: Type.array().of(Type.ref(Type.objectId()).to('Job', SJob))
})

SAccount.add({
    blacklist: Type.array().of(Type.ref(Type.objectId()).to('Account', SAccount))
})

export type DAccount = ExtractDoc<typeof SAccount>
export type IAccount = ExtractProps<typeof SAccount>
export const Account = typedModel('Account', SAccount)

export type IEvent = ExtractDoc<typeof SEvent>