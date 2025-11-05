<script>
  import { projects, moreProjects } from "$lib/projectBlurbs";
  import Project from "$lib/Project.svelte";
  const all = projects.concat(moreProjects);
</script>

<h1>Portfolio</h1>

<section id="projects" class="container">
  {#each all as project}
    <Project
      title={project.en.title}
      description={project.en.description}
      image={project.image}
      stack={project.stack}
      link={project.live}
      repo={project.github}
    />
  {/each}
</section>

<style>
  h1 {
    font-size: max(3rem, 6vw);
    margin: 2rem 4rem 0;
    text-transform: lowercase;
  }
  h1::before {
    content: "∎ ";
    color: var(--accent);
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
</style>
