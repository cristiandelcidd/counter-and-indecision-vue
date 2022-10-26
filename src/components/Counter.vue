<template>
  <h2>{{ customTitle }}</h2>
  <p>{{ counter }}<sup>2</sup> = {{ squareCounter }}</p>
  <p data-testid="counter">
    {{ counter }}
  </p>

  <div class="buttons">
    <button data-testid="decrease" @click="decrease">-1</button>
    <button data-testid="increase" @click="increase">+1</button>
  </div>
</template>

<script>
export default {
  // name:"CounterComponent",
  props: {
    title: String,
    start: {
      type: Number,
      default: 1,
      validator(value) {
        return value > -1;
      },
    },
  },
  data() {
    return {
      counter: this.start,
    };
  },

  methods: {
    increase() {
      this.counter >= 0 && this.counter++;
    },
    decrease() {
      this.counter > 0 && this.counter--;
    },
    getSquare() {
      return this.counter * this.counter;
    },
  },

  computed: {
    squareCounter() {
      return this.counter * this.counter;
    },
    customTitle() {
      return this.title ?? "Counter";
    },
  },
};
</script>

<style>
.buttons {
  align-content: center;
  display: flex;
  gap: 0.5rem;
  grid-template-columns: repeat(2, 50%);
  justify-content: center;
  margin: auto;
}

button {
  background: #41b883;
  border-radius: 0.5rem;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  transition: background 0.3s ease;
}

button:hover {
  background: #35495e;
}
</style>
