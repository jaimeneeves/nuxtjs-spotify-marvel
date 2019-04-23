<template>
  <div v-if="!isConnected">
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Spotify & Marvel</h1>
        <p class="lead text-muted">Aplicativo em <strong>Nuxt.js</strong> alimentado pelas APIs do Spotify e Marvel. Visite-o clicando em um dos botões abaixo.</p>
      </div>
    </section>

    <section class="container">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
            <!--<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail">
            <title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/>
            <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>-->
            <div class="card-body">
              <p class="card-text">O Spotify é um serviço de streaming digital que dá acesso instantâneo a milhões de músicas, podcasts, vídeos e outros conteúdos de artistas de todo o mundo.</p>
              <nuxt-link to="/spotify/auth"
                class="btn btn-lg btn-block btn-primary"
                name="auth" aria-label="Login">
                Login Spotify
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
            <!--<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail">
            <title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/>
            <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>-->
            <div class="card-body">
              <p class="card-text">A Marvel é o universo compartilhado onde ocorrem as histórias na maioria dos títulos de quadrinhos americanos e outras mídias publicadas pela Marvel Entertainment.</p>
              <nuxt-link to="/marvel/auth"
                class="btn btn-lg btn-block btn-primary"
                name="auth" aria-label="Login">
                Login Marvel
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    isConnected() {
      return this.$store.state.isConnected
    }
  }
}
</script>
