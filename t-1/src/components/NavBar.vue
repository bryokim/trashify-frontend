<script></script>

<template>
  <nav class="navbar sticky-top border-bottom border-light-subtle mb-3">
    <div class="container-fluid d-flex justify-content-between">
      <div class="col-3 col-md-2 ms-md-3">
        <a class="navbar-brand" href="#"
          ><img
            class="img-fluid"
            src="../assets/images/trashify-high-resolution-logo-white-transparent.svg"
        /></a>
      </div>

      <ul
        class="navbar-nav pe-3 pe-md-0 flex-row justify-content-end align-items-end col-7 col-lg-8"
      >
        <li class="nav-item me-3 me-md-5">
          <router-link class="" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="" to="/about">About</router-link>
        </li>
      </ul>

      <ul
        class="navbar-nav me-md-3 flex-row justify-content-center align-items-end col-2 col-lg-1"
      >
        <li class="nav-item">
          <router-link class="btn btn-success fw-bold" to="/login"
            >Sign in</router-link
          >
        </li>
        <!-- <li class="nav-item">
          <button class="btn btn-sm btn-danger fw-bold">Logout</button>
        </li> -->
      </ul>
    </div>
  </nav>
</template>
