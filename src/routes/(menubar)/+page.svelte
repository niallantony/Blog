<script>
  import { fade } from "svelte/transition";
  import { base } from "$app/paths";
  import { translate } from "$lib/i18n";
  import { projects } from "$lib/projectBlurbs";
  import Icon from "@iconify/svelte";
  import Project from "$lib/Project.svelte";

  let display = $state("");
  let locale = $state("en");
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

  function toEn() {
    locale = "en";
  }
  function toKr() {
    locale = "kr";
  }

  let t = (key) => translate(locale, key);
</script>

<!-- Masthead -->

<div class="home-back">
  <h1>{display}</h1>
  <p class="subtitle" in:fade={{ delay: 3000 }}>Web Developer</p>
</div>

<!-- About Me -->

<article class="about-layout" id="about">
  <div class="lang">
    <button class={locale === "en" ? "active-lang" : null} onclick={toEn}
      >en</button
    >
    <button class={locale === "kr" ? "active-lang" : null} onclick={toKr}
      >kr</button
    >
  </div>
  <h2>{t("headers.about")}</h2>
  <p>
    {t("body.about.0")}
  </p>
  <p>
    {t("body.about.1")}
  </p>
  <h2>{t("headers.working")}</h2>
  <ul>
    <li>{t("body.working.0")}</li>
    <li>{t("body.working.1")}</li>
    <li>{t("body.working.2")}</li>
    <li>{t("body.working.3")}</li>
  </ul>

  <h2>{t("headers.contact")}</h2>
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
        ><Icon icon="icon-park:file-pdf" />{t("body.contact")}</a
      >
    </li>
  </ul>
  <div class="columns">
    <div>
      <h2>{t("headers.stack")}</h2>
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
      <h2>{t("headers.studying")}</h2>
      <ul class="icon-list">
        <li>
          <Icon icon="logos:google-cloud-functions" />{t("body.studying.0")}
        </li>
        <li>
          <Icon icon="carbon:container-software" />{t("body.studying.1")}
        </li>
        <li><Icon icon="icon-park:server" />{t("body.studying.2")}</li>
      </ul>
      <h2>{t("headers.interests")}</h2>
      <ul class="icon-list">
        <li><Icon icon="icon-park:robot-one" />{t("body.interests.0")}</li>
        <li><Icon icon="icon-park:database-point" />{t("body.interests.1")}</li>
        <li><Icon icon="icon-park:network-tree" />{t("body.interests.2")}</li>
        <li><Icon icon="icon-park:format-brush" />{t("body.interests.3")}</li>
        <li><Icon icon="icon-park:eyes" />{t("body.interests.4")}</li>
      </ul>
    </div>
  </div>
  <h2>{t("headers.projects")}</h2>
</article>
<section>
  <div class="projects-pane">
    {#each projects as project}
      <Project
        title={project[locale].title}
        description={project[locale].description}
        image={project.image}
        stack={project.stack}
        link={project.live}
        repo={project.github}
      />
    {/each}
  </div>
</section>
<section class="about-layout">
  <h2>{t("headers.belief")}</h2>
  <p>
    {t("body.belief")}
  </p>
  <h2>{t("headers.hobbies")}</h2>
  <p>
    {t("body.hobbies.text")}
  </p>
  <ul class="icon-list">
    <li>
      <a href="https://app.thestorygraph.com/profile/niallantony"
        ><Icon icon="icon-park:book-open" />{t("body.hobbies.list.0")}</a
      >
    </li>
    <li>
      <a href="https://www.behance.net/niallantony"
        ><Icon icon="icon-park:pencil" />{t("body.hobbies.list.1")}</a
      >
    </li>
    <li><Icon icon="icon-park:spanner" />{t("body.hobbies.list.2")}</li>
    <li>
      <a href="https://steamcommunity.com/profiles/76561197972290812/"
        ><Icon icon="icon-park:game" />{t("body.hobbies.list.3")}</a
      >
    </li>
    <li><Icon icon="icon-park:weightlifting" />{t("body.hobbies.list.4")}</li>
  </ul>
</section>

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
  .active-lang {
    color: var(--light);
  }

  .subtitle {
    font-size: 2em;
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
  .lang button {
    font-size: 2em;
  }

  .projects-pane {
    display: flex;
    justify-content: center;
  }

  @media only screen and (max-width: 1130px) {
    .projects-pane {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
