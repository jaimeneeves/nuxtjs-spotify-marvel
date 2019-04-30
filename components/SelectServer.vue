<template>
  <div>
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Spotify & Marvel</h1>
        <p class="lead text-muted">Aplicação desenvolvida em 
          <strong class="text-body">NUXT</strong><strong class="text-success">JS</strong> e alimentada pelas APIs do Spotify e Marvel.
        </p>
      </div>
    </section>
    <section class="container text-center mb-5">
      <h3 class="lead text-muted">Visite-a clicando em um dos botões abaixo.</h3>
    </section>
    <section class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card mb-4 shadow-lg">
            <img src="~/assets/spotify.svg" class="mt-3" alt="Login spotify" style="height:194px">
            <div class="card-body">
              <p class="card-text">O Spotify é um serviço de streaming digital que dá acesso instantâneo a milhões de músicas, podcasts, vídeos e outros conteúdos de artistas de todo o mundo.</p>
              <nuxt-link to="/spotify/auth"
                class="btn btn-lg btn-block btn-success"
                name="auth" aria-label="Login">
                Login Spotify
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="card mb-4 shadow-lg">
            <img src="~/assets/marvel.svg" class="mt-3" alt="Login marvel" style="height:170px">
            <div class="card-body">
              <p class="card-text">A Marvel é o universo compartilhado onde ocorrem as histórias na maioria dos títulos de quadrinhos americanos e outras mídias publicadas pela Marvel Entertainment.</p>
              <nuxt-link to="/marvel"
                class="btn btn-lg btn-block btn-danger"
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
