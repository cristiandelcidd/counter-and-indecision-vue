<template>
  <img v-if="image" :src="image" alt="bg" />
  <div class="bg-dark"></div>

  <div class="indecision-container">
    <input type="text" placeholder="Hazme una pregunta" v-model="question" />
    <p>Recuerda terminar con una signo de interrogación (?)</p>

    <div v-if="isValidQuestion">
      <h2>{{ question }}</h2>
      <h1>{{ answer }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: null,
      answer: null,
      image: null,
      isValidQuestion: false,
    };
  },
  methods: {
    async getAnswer() {
      try {
        this.answer = "Pensando...";

        const response = await fetch("https://yesno.wtf/api");
        const { answer, image } = await response.json();

        this.answer = answer === "no" ? "No!" : "Sí!";
        this.image = image;
      } catch (error) {
        console.log("Indecision component: ", error);

        this.answer = "Ups, something went wrong!";
        this.image = null;
      }
    },
  },
  watch: {
    question(value /*, oldValue*/) {
      this.isValidQuestion = false;

      console.log({ value });

      if (!value.includes("?")) return;

      this.isValidQuestion = true;
      this.getAnswer();
    },
  },
};
</script>

<style>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  margin-top: 2rem;
  position: relative;
  z-index: 99;
}

input {
  border-radius: 5px;
  border: none;
  padding: 10px 15px;
  width: 250px;
}

input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin: 1rem 0 0;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>
