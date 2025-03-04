<script>
  let { string } = $props();

  const toConvert = string
    .replaceAll(/[^A-Za-z0-9 _]/g, "")
    .split(" ")
    .join("_")
    .toUpperCase()
    .split("");

  console.log("Converted", toConvert);
  const ENCODING = {
    0: [1, 2, 3, 1, 2, 2],
    1: [1, 2, 3, 2, 2, 1],
    2: [2, 2, 3, 2, 1, 1],
    3: [2, 2, 1, 1, 3, 2],
    4: [2, 2, 1, 2, 3, 1],
    5: [2, 1, 3, 2, 1, 2],
    6: [2, 2, 3, 1, 1, 2],
    7: [3, 1, 2, 1, 3, 1],
    8: [3, 1, 1, 2, 2, 2],
    9: [3, 2, 1, 1, 2, 2],
    A: [1, 1, 1, 3, 2, 3],
    B: [1, 3, 1, 1, 2, 3],
    C: [1, 3, 1, 3, 2, 1],
    D: [1, 1, 2, 3, 1, 3],
    E: [1, 3, 2, 1, 1, 3],
    F: [1, 3, 2, 3, 1, 1],
    G: [2, 1, 1, 3, 1, 3],
    H: [2, 3, 1, 1, 1, 3],
    I: [2, 3, 1, 3, 1, 1],
    J: [1, 1, 2, 1, 3, 3],
    K: [1, 1, 2, 3, 3, 1],
    L: [1, 3, 2, 1, 3, 1],
    M: [1, 1, 3, 1, 2, 3],
    N: [1, 1, 3, 3, 2, 1],
    O: [1, 3, 3, 1, 2, 1],
    P: [3, 1, 3, 1, 2, 1],
    Q: [2, 1, 1, 3, 3, 1],
    R: [2, 3, 1, 1, 3, 1],
    S: [2, 1, 3, 1, 1, 3],
    T: [2, 1, 3, 3, 1, 1],
    U: [2, 1, 3, 1, 3, 1],
    V: [3, 1, 1, 1, 2, 3],
    W: [3, 1, 1, 3, 2, 1],
    X: [3, 3, 1, 1, 2, 1],
    Y: [3, 1, 2, 1, 1, 3],
    Z: [3, 1, 2, 3, 1, 1],
    _: [1, 1, 1, 2, 2, 4],
  };
  const body = document.querySelector("body");

  let styleString =
    "repeating-linear-gradient(90deg, var(--dark), var(--dark) 2px, ";
  let pixelCount = 2;
  for (let char in toConvert) {
    for (let i = 0; i < 6; i = i + 2) {
      const encoding = ENCODING[toConvert[char]];
      styleString += `var(--accent) ${pixelCount}px,`;
      pixelCount += encoding[i];
      styleString += `var(--accent) ${pixelCount}px,`;
      styleString += `var(--dark) ${pixelCount}px,`;
      pixelCount += encoding[i + 1];
      styleString += `var(--dark) ${pixelCount}px,`;
    }
  }
  styleString = styleString.slice(0, -1);
  styleString += ")";
  const background = $state(styleString);
</script>

<div style:background></div>

<style>
  div {
    height: 100%;
    width: 100%;
  }
</style>
