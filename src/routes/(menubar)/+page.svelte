<script>
  import { fade } from "svelte/transition";
  import { base } from "$app/paths";
  import Icon from "@iconify/svelte";
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

<!-- Masthead -->

<div class="home-back">
  <h1>{display}</h1>
  <p class="subtitle" in:fade={{ delay: 3000 }}>Web Developer</p>
</div>

<!-- About Me -->

<article class="about-layout" id="about">
  <h2>Who I Am</h2>
  <p>
    I am someone who grew up around computers and have always been interested in
    what can be achieved with them. My interest in programming started with
    designing and writing computer games as a kid, and progressed through my
    career as an artists and educator. Programming and making things is
    something I have a passion for, and I hope to be the kind of developer who
    can blend engineering with creativity.
  </p>
  <p>
    While I value new technologies and trends in development, I place importance
    on core skills that I believe will serve me well in any role: programming
    fundamentals, good system design and effective communication skills.
  </p>
  <h2>What I Am Working On Now</h2>
  <ul>
    <li>building up my personal site</li>
    <li>studying as part of a MSc in Computer Science</li>
    <li>teaching Data Skills to University Students</li>
    <li>
      developing applications in conjunction with accessibility researchers
    </li>
  </ul>

  <div class="columns">
    <div>
      <h2>What I Use:</h2>
      <ul class="icon-list">
        <li><Icon icon="material-icon-theme:nodejs" />Node.js</li>
        <li><Icon icon="devicon:spring" />Spring</li>
        <li><Icon icon="material-icon-theme:python" />Python</li>
        <li><Icon icon="material-icon-theme:javaclass" />Java</li>
        <li><Icon icon="skill-icons:expressjs-dark" />Express.js</li>
        <li><Icon icon="material-icon-theme:svelte" />Svelte/SvelteKit</li>
        <li><Icon icon="material-icon-theme:react" />React/React-Native</li>
        <li><Icon icon="material-icon-theme:typescript" />TypeScript</li>
        <li><Icon icon="material-icon-theme:css" />CSS</li>
        <li><Icon icon="material-icon-theme:html" />HTML</li>
        <li><Icon icon="tabler:api" />REST APIs</li>
        <li><Icon icon="logos:postgresql" />PostgreSQL</li>
        <li><Icon icon="material-icon-theme:jest" />Jest</li>
        <li><Icon icon="material-icon-theme:git" />Git</li>
      </ul>
    </div>
    <div>
      <h2>What I Study:</h2>
      <ul class="icon-list">
        <li><Icon icon="logos:google-cloud-functions" />Cloud Engineering</li>
        <li>
          <Icon icon="carbon:container-software" />Software Fundamentals
        </li>
        <li><Icon icon="icon-park:server" />Backend Development</li>
      </ul>
      <h2>What Interests me:</h2>
      <ul class="icon-list">
        <li><Icon icon="icon-park:robot-one" />Machine Learning & AI</li>
        <li><Icon icon="icon-park:database-point" />Databases</li>
        <li><Icon icon="icon-park:network-tree" />Computer Systems</li>
        <li><Icon icon="icon-park:format-brush" />Creative Coding</li>
        <li><Icon icon="icon-park:eyes" />Graphics and Visualisation</li>
      </ul>
    </div>
  </div>
  <h2>What I Believe</h2>
  <p>
    Technology should be something that serves people, no matter their
    background or capabilities. I would like to help create software which makes
    the world a more inclusive place. I believe that software developers have a
    duty to make reliable and ethical software.
  </p>
  <h2>What I Do Outside the Computer</h2>
  <p>
    When I am not relaxing with my beautiful wife and two oddball cats, I like
    to occupy my time with one of many hobbies.
  </p>
  <ul class="icon-list">
    <li>
      <a href="https://app.thestorygraph.com/profile/niallantony"
        ><Icon icon="icon-park:book-open" />Reading</a
      >
    </li>
    <li>
      <a href="https://www.behance.net/niallantony"
        ><Icon icon="icon-park:pencil" />Drawing & Painting</a
      >
    </li>
    <li><Icon icon="icon-park:spanner" />DIY</li>
    <li>
      <a href="https://steamcommunity.com/profiles/76561197972290812/"
        ><Icon icon="icon-park:game" />Games</a
      >
    </li>
    <li><Icon icon="icon-park:weightlifting" />Weightlifting</li>
  </ul>
  <h2>How to Contact Me:</h2>
  <ul class="icon-list">
    <li>
      <a href="https://github.com/niallantony"
        ><Icon icon="icon-park:github" />Github</a
      >
    </li>
    <li>
      <a href="https://www.linkedin.com/in/niall-craven-22557331/"
        ><Icon icon="skill-icons:linkedin" />LinkedIn</a
      >
    </li>
    <li>
      <a href="mailto:craven.niall@googlemail.com"
        ><Icon icon="material-icon-theme:email" />craven.niall@googlemail.com</a
      >
    </li>
    <li>
      <a href={`${base}/cv.pdf`}
        ><Icon icon="icon-park:file-pdf" />Download my CV (pdf)</a
      >
    </li>
  </ul>
</article>

<style>
  .home-back {
    height: 100dvh;
    align-self: center;
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
    justify-content: center;
    align-content: start;
    flex-wrap: wrap;
    width: 100%;
  }
  .home-back h1::before {
    content: "∎ ";
    color: var(--accent);
  }

  .subtitle {
    font-size: 24pt;
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
    text-align: left;
    color: var(--light);
  }

  .columns {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(326px, 1fr));
    border: dashed 1px var(--accent);
    margin-top: 2rem;
    padding: 1rem;
    padding-bottom: 3rem;
    position: relative;
  }
  .columns::before {
    content: "technology";
    position: absolute;
    top: -16px;
    left: 1rem;
    padding: 0.5rem;
    color: var(--accent);
    font-family: monospace;
    background-color: var(--dark);
  }
  .section-header {
    font-size: max(3rem, 6vw);
    margin-top: 2rem;
  }
  li,
  a {
    font-family: monospace;
    margin: 0.5rem 0;
    color: var(--accent);
  }
  .icon-list > li::before {
    content: "";
  }
  :global(li > svg),
  :global(li > a > svg) {
    margin-right: 1rem;
    transform: scale(120%) translateY(2px);
  }
  .about-layout {
    display: grid;
    grid-template-columns: 1fr;
    max-width: 720px;
    align-self: center;
    margin: 0 1rem;
  }
  p {
    font-family: monospace;
    line-height: 1.8;
  }
</style>
