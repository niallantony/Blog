<script>
  let { string } = $props();
  import { ENCODINGS } from "./barcodeEncodings";

  const toConvert = string
    .replaceAll(/[^A-Za-z0-9 _]/g, "")
    .split(" ")
    .join("_")
    .split("");

  console.log("Converted", toConvert);
  let pixelCount = 2;

  function encodeDigits(array) {
    let string = "";
    for (let i = 0; i < array.length; i = i + 2) {
      string += `var(--accent) ${pixelCount}px,`;
      pixelCount += array[i];
      string += `var(--accent) ${pixelCount}px,`;
      string += `var(--dark) ${pixelCount}px,`;
      pixelCount += array[i + 1];
      string += `var(--dark) ${pixelCount}px,`;
    }
    return string;
  }

  function encodeStyle() {
    let weightedSum = 0;
    let styleString =
      "repeating-linear-gradient(90deg, var(--dark), var(--dark) 2px, ";
    styleString += encodeDigits(ENCODINGS[103]);
    for (let char in toConvert) {
      const charCode = toConvert[char].charCodeAt(0);
      console.log(charCode, String.fromCharCode(charCode));
      styleString += encodeDigits(ENCODINGS[charCode - 32]);
      weightedSum += (char + 1) * (toConvert[char].charCodeAt(0) - 32);
    }
    const checkSum = weightedSum % 108;
    styleString += encodeDigits(ENCODINGS[checkSum]);
    styleString += encodeDigits(ENCODINGS[106]);
    styleString = styleString.slice(0, -1);
    styleString += ")";
    return styleString;
  }

  const styleString = encodeStyle();
  const background = $state(styleString);
</script>

<div style:background></div>

<style>
  div {
    height: 100%;
    width: 100%;
  }
</style>
