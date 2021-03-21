<template>
    <div class="navigationbar">
        <b-container>
            <b-navbar toggleable="lg" type="dark">
                <b-navbar-brand to="tula-cuecho">
                    <b-img src="./img/logo.png" fluid alt="Logo"></b-img>
                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <!-- Default navigation -->
                    <b-navbar-nav>
                        <b-link class="navbar-nav__item" to="tula-cuecho">TULA CUECHO</b-link>
                        <b-link class="navbar-nav__item" to="salimos-tuani">SALIMOS TUANI</b-link>
                    </b-navbar-nav>

                    <!-- Right navigation -->
                    <b-navbar-nav class="ml-auto">
                        <b-link class="navbar-nav__item" href="#">INICIA SESIÓN</b-link>
                        <b-button size="sm" class="navbar-nav__item my-2 my-sm-0">REGISTRÁTE</b-button>
                        <b-link class="navbar-nav__item" href="#">SUSCRIBÍTE</b-link>
                        <b-link class="navbar-nav__item" href="#">ANÚNCIATE</b-link>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </b-container>
    </div>
</template>

<script>
import '../Styles/navbar.scss'

export default {
    name: 'navbar'
}
</script>
