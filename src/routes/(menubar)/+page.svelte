<script>
  import { fade } from "svelte/transition";
  let display = $state("");
  const finalTitle = "niall craven";

  async function searchAnimation(string) {
    const COUNT = 10;

    for (let c = 0; c < string.length; c++) {
      const finalChar = string[c];
      for (let i = 0; i < COUNT; i++) {
        const character = String.fromCharCode(
          Math.floor(Math.random() * 96) + 32,
        );
        const letter = await delayLetter(character);
        display = display.slice(0, -1);
        display += letter;
      }
      display = display.slice(0, -1);
      display += finalChar + " ";
    }
  }
  function delayLetter(c) {
    return new Promise((resolve) => setTimeout(() => resolve(c), 20));
  }
  searchAnimation(finalTitle);
</script>

<div class="home-back">
  <h1>{display}</h1>
  <p in:fade={{ delay: 3000 }}>Software Developer</p>
</div>

<style>
  .home-back {
    height: 100%;
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: start;
    flex-wrap: wrap;
    width: 100%;
  }
  h1::before {
    content: "∎ ";
    color: var(--accent);
  }

  h1 {
    text-transform: lowercase;
    display: inline-block;
    color: var(--light);
    margin: 0;
    text-align: left;
    font-size: 15vw;
    line-height: 12rem;
    width: 100%;
  }

  p {
    margin-top: 2rem;
    margin-left: 3rem;
    padding-left: 1rem;
    border-left: solid 1px var(--accent);
    text-transform: lowercase;
    text-align: left;
    color: var(--light);
  }
</style>
