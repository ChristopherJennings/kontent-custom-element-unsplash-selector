<template>
  <div>
    <div class="notification is-danger">
      <p>Unsplash API keys not configured.</p>
      <p>Please make sure to configure the parameters JSON in custom element configuration.</p>
    </div>

    <div class="box">
      <p class="content">
        To get the Unsplash keys, you must:
        <ol>
          <li>Sign up for an Unsplash account</li>
          <li>Go to https://unsplash.com/oauth/applications</li>
          <li>Create a new application</li>
          <li>Open the application and scroll down to find the keys</li>
        </ol>
      </p>
      <div class="field">
        <label class="label">Unsplash Access Key</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Your Unsplash application's Access Key"
            v-model="UnsplashAccessKey"
            >
        </div>
      </div>
      <div class="field">
        <label class="label">Unsplash Secret Key</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Your Unsplash application's Secret Key"
            v-model="UnsplashSecretKey"
            >
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input
              type="checkbox"
              v-model="EnableDebug"
              >
            Enable debug
          </label>
        </div>
      </div>
    </div>
    Copy-Paste the below in the custom element's parameters field in the configuration options to use:
    <pre>
{
    "accessKey": "{{UnsplashAccessKey}}",
    "secretKey": "{{UnsplashSecretKey}}",
    "debug": {{EnableDebug}}
}
</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      UnsplashAccessKey: "",
      UnsplashSecretKey: "",
      EnableDebug: false,

    }
  }
}
</script>

