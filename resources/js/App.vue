<template>
    <div>
        <Navbar></Navbar>
        <SocialStickGroup></SocialStickGroup>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from './Components/Navbar.vue';
import SocialStickGroup from './Components/SocialStickGroup.vue';

export default {
    name: 'app',
    components: { Navbar, SocialStickGroup }
}
</script>
