<template lang="pug">
v-dialog(fullscreen, :value="value")
    v-card.px-12(justify="space-around" )
        v-toolbar(dark, color="primary")
            v-btn(icon, @click="changeValue(false)")
                v-icon mdi-close
            v-toolbar-title 應徵者

        v-expansion-panels.mt-12(tile, popout, focusable)
            v-expansion-panel(v-for="({ name }, i) in candidates", :key="i")
                v-expansion-panel-header.pa-5
                    v-list-item
                        v-list-item-avatar
                            v-icon(large) mdi-account-outline
                        v-list-item-content
                            v-list-item-title.text-h6 {{ name }}

                v-expansion-panel-content

                    v-card-actions
                        v-spacer
                        v-btn(color="error") 拒絕
                        v-btn(color="success", ) 接受
                        v-btn(color="warning", @click="showResume") 詳細資料

        ResumeDialog(v-model="show")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ResumeDialog from '@/client/components/ResumeDialog.vue'

@Component({ components: { ResumeDialog } })
export default class extends Vue {
    @Prop()
    value!: boolean

    candidates: any[] = []
    show = false

    changeValue(v: boolean) {
        this.$emit('input', v)
    }

    showResume() {
        this.show = true
    }

    mounted() {
            for (let i = 0; i < 8; i++) {
                this.candidates.push({
                    name: '何文子'
                })

        }
    }
}
</script>

<style lang="scss" scoped>
</style>
