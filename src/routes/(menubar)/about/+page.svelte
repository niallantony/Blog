<script>
  import Icon from "@iconify/svelte";
</script>

<h1>about</h1>
<article class="about-layout">
  <a href="cv.pdf">Download my CV (pdf)</a>
  <h2>Who I Am</h2>
  <p>
    I’m a software enthusiast with a background in engineering, art, and
    problem-solving. My journey has taken me from designing board games as a kid
    to working as an artist and teacher, but I’ve always been drawn to
    technology’s creative potential. Now, I focus on building software systems,
    exploring AI, and developing projects that blend engineering with artistry.
  </p>
  <h2>What I Am Working On Now</h2>
  <ul>
    <li>working on my personal site</li>
    <li>studying as part of a MSc in Computer Science</li>
    <li>teaching Data Skills to University Students</li>
    <li>earning my Google Cloud Engineer certificate</li>
  </ul>

  <div class="columns">
    <div>
      <h2>What I Use:</h2>
      <ul class="icon-list">
        <li><Icon icon="material-icon-theme:nodejs" />Node.js</li>
        <li><Icon icon="material-icon-theme:python" />Python</li>
        <li><Icon icon="skill-icons:expressjs-dark" />Express.js</li>
        <li><Icon icon="material-icon-theme:svelte" />Svelte</li>
        <li><Icon icon="material-icon-theme:react" />React</li>
        <li><Icon icon="material-icon-theme:javascript" />JavaScript</li>
        <li><Icon icon="material-icon-theme:css" />CSS</li>
        <li><Icon icon="material-icon-theme:html" />HTML</li>
        <li><Icon icon="tabler:api" />REST APIs</li>
        <li><Icon icon="logos:postgresql" />PostgreSQL</li>
        <li><Icon icon="material-icon-theme:prisma" />Prisma</li>
        <li><Icon icon="logos:webpack" />Webpack</li>
        <li><Icon icon="material-icon-theme:jest" />Jest</li>
        <li><Icon icon="material-icon-theme:git" />Git</li>
      </ul>
    </div>
    <div>
      <h2>What I Study:</h2>
      <ul class="icon-list">
        <li><Icon icon="material-icon-theme:typescript" />TypeScript</li>
        <li><Icon icon="material-icon-theme:java" />Java</li>
        <li></li>
        <li><Icon icon="logos:google-cloud-functions" />Cloud Engineering</li>
        <li></li>
        <li>
          <Icon icon="carbon:container-software" />Software Fundamentals
        </li>
      </ul>
      <h2>What Interests me:</h2>
      <ul class="icon-list">
        <li><Icon icon="icon-park:server" />Backend Development</li>
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
    Technology is at its best when it brings people together, enhances
    creativity, and makes knowledge more accessible. I believe in a future where
    software is built responsibly, AI serves as a tool for inclusion, and
    innovation is driven by curiosity and craft — not hype. As a developer, I
    want to contribute to this vision by crafting systems that are effective,
    ethical, and open to all.
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
    <li><Icon icon="icon-park:tree-two" />Gardening</li>
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
  </ul>
</article>

<style>
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
  h1 {
    font-size: max(3rem, 6vw);
    margin: 2rem 4rem 0;
  }
  h1::before {
    content: "∎ ";
    color: var(--accent);
  }
  li,
  a {
    font-family: monospace;
    margin: 0.5rem 0;
  }
  .icon-list > li::before {
    content: "";
  }
  :global(li > svg) {
    margin-right: 1rem;
    transform: scale(120%) translateY(2px);
  }
  .about-layout {
    display: grid;
    grid-template-columns: 1fr;
    max-width: min(100%, 720px);
    align-self: center;
  }
  p {
    font-family: monospace;
    line-height: 1.8;
  }
</style>
