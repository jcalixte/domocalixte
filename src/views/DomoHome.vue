<template>
  <div>
    <domo-terminal />
  </div>
</template>

<script>
import DomoTerminal from "@/components/DomoTerminal";

export default {
  name: "domo-home",
  components: {
    DomoTerminal
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495e;
}
</style>
