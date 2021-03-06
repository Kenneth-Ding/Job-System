<template lang="pug">
v-card(tile, height="calc(100vh - 56px)")
    v-toolbar(dark, color="primary")
        v-toolbar-title 刊登管理

    v-list(two-line, outlined)
        v-list-group(v-for="({ title, _id }, i) in jobs", :key="i")
            template(#activator)
                v-list-item-content.mx-5
                    v-list-item-title
                        h3 {{ title }}
                    v-list-item-subtitle
                        v-chip.mr-1(
                            x-small,
                            color="primary",
                            :key="i",
                            v-for="(tag, i) in jobs.tags"
                        ) {{ tag }}

            v-divider

            v-list-item
                v-list-item-content(align="right")
                    span
                        v-btn.mr-1(
                            outlined,
                            color="error",
                            @click="showDeleteDialog(_id)"
                        ) 刪除
                        v-btn.mr-1(
                            outlined,
                            color="success",
                            :to="`/job/${_id}/edit`"
                        ) 修改
                        v-btn.mr-1(
                            outlined,
                            color="warning",
                            @click="showCandidates = true"
                        ) 應徵者

                        v-dialog(v-model="deleteDialog.show")
                            v-card
                                v-card-title 確定要刪除此工作嗎?
                                v-card-actions
                                    v-spacer
                                    v-btn(
                                        outlined,
                                        color="error",
                                        :loading="deleteDialog.loading",
                                        @click="deleteJob"
                                    ) 刪除
                                    v-btn(
                                        outlined,
                                        @click="deleteDialog.show = false"
                                    ) 取消

            v-divider

    v-btn(fixed, bottom, right, fab, dark, color="primary", to="/job/new")
        v-icon mdi-plus

    CandidatesDialog(v-model="showCandidates")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { IAccount } from '@/server/models'

import CandidatesDialog from '@/client/components/CandidatesDialog.vue'
import { sendMessage } from '../sysmsg'

const Account = namespace('Account')

@Component({ components: { CandidatesDialog } })
export default class extends Vue {
    @Account.State account!: IAccount
    jobs: any[] = []

    deleteDialog = {
        show: false,
        id: '',
        loading: false
    }

    showCandidates = false

    showDeleteDialog(id: string) {
        this.deleteDialog.show = true
        this.deleteDialog.id = id
    }

    async loadJobs() {
        let { status, data } = await axios.get('api/job/published')
        if (status === 200) {
            this.jobs = data
        }
    }

    async deleteJob() {
        let id = this.deleteDialog.id

        this.deleteDialog.loading = true
        let { status } = await axios.delete(`api/job/${id}`)
        this.deleteDialog.loading = false

        if (status === 204) {
            this.jobs = this.jobs.filter(x => x._id != id)
            this.deleteDialog.show = false
            sendMessage('刪除成功')
        }
    }

    mounted() {
        this.loadJobs()
    }
}
</script>

<style lang="scss" scoped>
.v-btn--fixed.v-btn--bottom {
    bottom: 64px !important;
}
</style>
