<script>
  import TextBlock from "./TextBlock.svelte";

  function randomRem() {
    return Math.floor(Math.random() * 7);
  }
  const aboutMe = {
    "About Me": `
      I have always had a passion for making things. Growing up, I found an
      outlet for this in drawing and writing - stories, imaginary maps, board
      games. I found a passion for engineering at school, and experimented
      making robots, computer programs and building my own electric guitar. I
      studied painting at university, and spent many years painting and
      exhibiting. This was another tool I used as a creative outlet. Now I have
      come back to computers, and spend my time learning and building, driven by
      the same curiosity and motivation to create that first led me to pick up a
      pencil.
    `,
  };
  const beliefs = {
    "What I Believe": `
      Technology is at its best when it brings people together, enhances
      creativity, and makes knowledge more accessible. I believe in a future
      where software is built responsibly, AI serves as a tool for inclusion,
      and innovation is driven by curiosity and craft — not hype. As a
      developer, I want to contribute to this vision by crafting systems that
      are effective, ethical, and open to all.

    `,
  };
</script>

<h1>about</h1>
<div class="about-layout">
  <TextBlock textContent={aboutMe} />
  <TextBlock textContent={beliefs} />
</div>

<style>
  h1 {
    font-size: max(3rem, 6vw);
    margin: 2rem 4rem 0;
  }
  h1::before {
    content: "∎ ";
    color: var(--accent);
  }
  .about-layout {
    display: grid;
    grid-template-columns: 1fr;
    max-width: min(100%, 720px);
    align-self: center;
  }
</style>
