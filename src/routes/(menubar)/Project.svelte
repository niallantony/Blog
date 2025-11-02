<script>
import Icon from "@iconify/svelte"
const { title, description, image, stack } = $props()
</script>

<div class="project-card">
  <div class="stack">
    {#each stack as skill} 
      <Icon
        icon={skill}
        width="3em"
        />
    {/each}
  </div>
  <h3>{title}</h3>
  <p>{description}</p>
      <div
        class="imgframe"
        style="background-image: url({image}); background-position: center; background-size: cover; background-repeat: no-repeat"
      ></div>
</div>

<style>
.project-card {
  display: grid;
  padding: 2rem;
  margin: 2rem 2rem;
  box-sizing: border-box;
  max-width: 450px;
  border: solid 1px var(--accent);
  box-shadow: 0 9px 0 0 var(--dark), 0 10px 0 0 var(--accent);
  position: relative;
  width: 30%;
}
.project-card:hover {
  transform: scale(110%);
  transition: transform .5s;
}
.project-card h3 {
  font-size: 2em;
  margin:1rem 0 0;
  padding: 0;
}
.project-card h3::before {
  content: "";
  margin:0;
}
.imgframe {
  width: 100%;
  height: 20em;
}
.project-card img {
  width: 100%;
}
.project-card::after {
  content:"";
  border-bottom: solid 1px var(--accent);
  background-color: var(--dark);
  transform: rotate(45deg);
  transform-origin: 0% 100%;
  right: -18px;
  top: -31px;
  width: 60px;
  height: 30px;
  position: absolute;
  z-index: 30;
}
.stack {
  display: flex;
  gap: 4px;
}
  @media only screen and (max-width: 1130px) {
    .project-card {
      width: 100%;
      margin: 2rem 1rem;
    }
  }
</style>
