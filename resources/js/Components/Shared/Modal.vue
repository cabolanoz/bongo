<template>
    <b-modal centered ref="nj-modal">
        <div class="text-center">
            <h1>Modal</h1>
        </div>
    </b-modal>
</template>

<script>
const MODAL_REF = 'nj-modal';

export default {
    name: 'modal',
    methods: {
        show () { this.$refs[MODAL_REF].show(); },
        hide () { this.$refs[MODAL_REF].hide(); }
    }
}
</script>