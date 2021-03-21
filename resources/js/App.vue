<template>
    <div>
        <Navbar></Navbar>
        <SocialStickGroup></SocialStickGroup>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from './Components/Shared/Navbar.vue';
import SocialStickGroup from './Components/Shared/SocialStickGroup.vue';

export default {
    name: 'app',
    components: { Navbar, SocialStickGroup }
}
</script>
