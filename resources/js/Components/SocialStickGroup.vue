<template>
    <ul class="social-stick-group">
        <b-link
            class="social-stick-group__item"
            href="https://www.facebook.com/nosjuimosnicaragua"
            target="_blank"
        >
            <b-icon-facebook></b-icon-facebook>
        </b-link>
        <b-dropdown-divider></b-dropdown-divider>
        <b-link
            class="social-stick-group__item"
            href="https://twitter.com/Nosjuimosni"
            target="_blank"
        >
            <b-icon-twitter></b-icon-twitter>
        </b-link>
    </ul>
</template>

<script>
import '../Styles/social_stick_group.scss';
import { BIconFacebook, BIconTwitter } from 'bootstrap-vue';

export default {
    name: 'social_stick_group',
    components: { BIconFacebook, BIconTwitter }
}
</script>
