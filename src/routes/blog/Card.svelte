<script>
  import Barcode from "$lib/Barcode.svelte";
  let { title, date, url, image } = $props();

  const clickurl = $state(url);
</script>

<a href={clickurl} class="card">
  <Barcode string={title}>
    {#if image}
      <div class="imgframe">
        <img src={`/blog/thumbnail?path=${image}`} alt={`${title} thumbnail`} />
      </div>
    {:else}
      <div class="noimg"><p>no_img</p></div>
    {/if}
    <h1>{title}</h1>
    <p class="date">{date}</p>
  </Barcode>
  <div class="upper-cutaway"></div>
  <div class="lower-cutaway1"></div>
  <div class="lower-cutaway2"></div>
</a>

<style>
  .upper-cutaway {
    position: absolute;
    background-color: var(--dark);
    height: 100px;
    width: 5px;
    top: -1px;
    right: -1px;
    border-bottom: solid 1px var(--mid1);
    border-left: solid 1px var(--mid1);
  }
  .lower-cutaway1 {
    position: absolute;
    background-color: var(--dark);
    height: 10px;
    width: 100px;
    bottom: -1px;
    left: -1px;
    border-top: solid 1px var(--mid1);
    border-right: solid 1px var(--mid1);
    transform: skewX(45deg) translateX(5px);
  }
  .lower-cutaway2 {
    position: absolute;
    background-color: var(--dark);
    height: 10px;
    width: 20px;
    bottom: -1px;
    left: -1px;
  }
  .card {
    margin: 1rem;
    padding: 1rem;
    border: solid 1px var(--mid1);
    display: flex;
    flex-direction: column;
    height: 320px;
    position: relative;
  }
  .card:hover {
    transform: translate(3px, 2px);
    cursor: pointer;
  }
  h1 {
    text-transform: lowercase;
    margin: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: var(--dark);
    padding: 0 1rem;
  }
  h1::before {
    content: "∎ ";
    color: var(--accent);
  }
  .date {
    color: var(--accent);
    right: 0;
    top: 0;
    transform-origin: bottom right;
    font-size: small;
    transform: rotate(270deg) translateX(1rem);
    margin: 0;
    background-color: var(--dark);
    position: absolute;
  }
  .noimg p {
    background-color: var(--dark);
    height: fit-content;
    color: var(--accent);
    align-self: center;
  }
  .noimg,
  .imgframe {
    width: 100%;
    height: 70%;
    overflow: hidden;
  }
  img {
    width: 100%;
  }
  .noimg {
    display: flex;
    justify-content: center;
    align-content: center;
    background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 5px,
        var(--dark) 5px,
        var(--dark) 20px,
        transparent 20px
      ),
      repeating-linear-gradient(
        -45deg,
        var(--dark),
        var(--dark) 20px,
        var(--accent) 20px,
        var(--accent) 21px,
        var(--dark) 21px
      );
    background-color: var(--dark);
    border: solid 1px var(--accent);
    border-bottom: 0;
    box-sizing: border-box;
  }
</style>
