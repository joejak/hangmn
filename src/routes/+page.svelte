<script lang="ts">
  import { onMount } from "svelte";

  let loaded = $state(false);
  let primary = $state("rgb(0,0,0)");
  let secondary = $state("rgb(0,0,0)");
  let tertiary = $state("rgb(0,0,0)");
  let textcolor = $state("rgb(1,1,1)");
  let textcolor2 = $state("rgb(1,1,1");
  let misses = $state(0);
  let word: { letter: string; clicked: boolean }[] = $state([]);
  let loadingColor = $state(false);

  let cw = $state(500);
  let ch = $state(500);

  let keyboardletters = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  let keyboard: { letter: string; clicked: boolean }[][] = $state(
    keyboardletters.map((r) => {
      return r.map((l) => {
        return { letter: l, clicked: false };
      });
    })
  );

  let loseDialog: HTMLDialogElement;
  let winDialog: HTMLDialogElement;

  async function getColorScheme() {
    loadingColor = true;
    const res = await fetch("/api/gencolors");

    const body = await res.json();
    const colors = body.result;
    primary = `rgb(${colors[0][0]},${colors[0][1]},${colors[0][2]})`;
    secondary = `rgb(${colors[1][0]},${colors[1][1]},${colors[1][2]})`;
    tertiary = `rgb(${colors[2][0]},${colors[2][1]},${colors[2][2]})`;
    textcolor = `rgb(${colors[3][0]},${colors[3][1]},${colors[3][2]})`;
    textcolor2 = `rgb(${colors[4][0]},${colors[4][1]},${colors[4][2]})`;

    loadingColor = false;
  }

  async function getRandomWord() {
    const res = await fetch("/api/genword");
    const body = await res.json();
    console.log(body);
    word = body.split("").map((l: string) => {
      return { letter: l, clicked: false };
    });
  }

  async function clicked(letter: string) {
    console.log(letter);
    let miss = true;
    let win = true;
    for (const l of word) {
      if (l.letter.toLowerCase() == letter) {
        l.clicked = true;
        miss = false;
      }
      if (!l.clicked) {
        win = false;
      }
    }
    if (miss) {
      misses++;
    }
    //lose condition
    if (misses > 5) {
      setTimeout(() => {
        loseDialog.showModal();
      }, 500);
    }
    //win condition
    if (win) {
      winDialog.showModal();
    }
  }

  onMount(() => {
    cw = window.visualViewport?.width ? window.visualViewport.width : 500;
    ch = window.visualViewport?.height ? window.visualViewport.height : 500;
    Promise.all([getRandomWord(), getColorScheme()])
      .then(() => {
        loaded = true;
      })
      .catch((e) => {
        console.error(e);
      });
  });
</script>

<div
  style="width: 100vw; height:103vh; margin: 0px; padding: 0px; background-color: {primary}; display:flex; flex-direction:column; gap: 10px; align-items:center; justify-content:center;"
>
  {#if loaded}
    <div style="width: 80%; max-width: 1000px; margin-top: 10px;">
      <div style="display: flex; gap: 10px; color: {textcolor2}; float: left;">
        <p
          style="font-size: {ch > cw
            ? ch * 0.05
            : cw * 0.05}pt; margin: 0px; padding: 0px; text-align:center;"
        >
          {misses}
        </p>
        <h1
          style="margin: 0px; padding: 0px; font-size: {ch > cw
            ? ch * 0.01
            : cw * 0.01}pt;"
        >
          misses
        </h1>
      </div>
      <button
        style="background-color: color(from white srgb r g b / .5 ); border: none; aspect-ratio: 1/1; float: right; border: solid thin black; border-radius: 4rem; display: flex; justify-content: center; align-items: center;"
        onclick={() => {
          getColorScheme();
        }}
      >
        {#if loadingColor}
          <img
            class="spinnin"
            width="38px"
            height="38px"
            src="/refresh.svg"
            alt=""
          />
        {:else}
          <img width="38px" height="38px" src="/palette.svg" alt="" srcset="" />
        {/if}
      </button>
    </div>
    <div style="display:flex;">
      <svg
        width={ch * 0.5}
        height={ch * 0.5}
        viewBox="0 0 211.66666 211.66666"
        version="1.1"
        id="svg5"
        xmlns="http://www.w3.org/2000/svg"
        style="margin: 0px; padding: 0px; margin-bottom: -{ch > cw
                  ? ch * 0.025
                  : cw * 0.025}px;"
      >
        <g id="layer1" transform="translate(-3.4026869,-28.162284)">
          <path
            class="draw"
            style="fill:#f4ecf6;fill-opacity:0.504249;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:0.988406; animation-duration:calc(var(--animation-time)*2)"
            d="M 162.48299,201.16659 162.89197,33.894177"
            id="post"
          />
          <path
            class="draw"
            style="fill:#f4ecf6;fill-opacity:0.504249;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1"
            d="M 6.0485218,205.05189 205.42578,205.25638"
            id="base"
          />
          <path
            class="draw"
            style="fill:#f4ecf6;fill-opacity:0.504249;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1; animation-duration:calc(var(--animation-time)*3)"
            d="M 162.68748,34.098668 71.894139,34.303157"
            id="topbar"
          />
          <path
            class="draw"
            style="fill:#f4ecf6;fill-opacity:0.504249;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1; animation-duration:calc(var(--animation-time)*4)"
            d="m 113.40551,34.916625 46.82809,45.60116"
            id="postsupport"
          />
          <path
            class="draw"
            style="fill:#000000;fill-opacity:0;stroke:{tertiary};stroke-width:4.48789;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1; animation-duration:calc(var(--animation-time)*5)"
            d="m 75.991789,33.475182 v 3.748321 c 0,0 1.29992,-7.218988 3.89977,-6.802507 2.59985,0.41648 0.64997,6.941333 2.38321,6.802507 1.73322,-0.138828 1.51657,-6.386027 3.46646,-6.386027 1.94988,0 5.41635,6.802506 4.33309,6.802506 -1.08328,0 -6.93294,-4.720107 -6.93294,-3.609493 0,1.110612 0.86661,22.351094 0.86661,22.351094"
            id="rope"
          />
          {#if misses > 0}
            <path
              class="draw"
              style="fill:#000000;fill-opacity:0;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1"
              d="m 85.261512,56.079571 c 0,0 18.690358,-0.357004 17.908198,17.737305 C 102.38754,91.911184 88.214824,92.406433 85.130646,92.407138 82.046468,92.407843 63.565967,90.747469 63.620713,75.559643 63.699863,53.601409 84.379407,56.079571 84.379407,56.079571"
              id="head"
            />
          {/if}
          {#if misses > 1}
            <path
              class="draw"
              style="fill:#000000;fill-opacity:0;stroke:{tertiary};stroke-width:5.17607;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1"
              d="m 83.696729,92.320375 1.13805,50.624505"
              id="body"
            />
          {/if}
          {#if misses > 2}
            <path
              class="draw"
              style="fill:#000000;fill-opacity:0;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1"
              d="m 87.026369,99.944285 c 0,0 16.563651,6.952645 16.972631,20.039975 0.40897,13.08732 -0.61347,12.47386 -0.61347,12.47386"
              id="leftarm"
            />
          {/if}
          {#if misses > 3}
            <path
              class="draw"
              style="fill:#000000;fill-opacity:0;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1"
              d="m 80.687179,100.14878 c 0,0 -20.68055,9.12525 -15.336701,21.47139 l 5.930191,13.7008"
              id="rightarm"
            />
          {/if}
          {#if misses > 4}
            <path
              class="draw"
              style="fill:#000000;fill-opacity:0;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1"
              d="m 85.185959,143.90953 c 0,0 12.67835,19.42651 11.45141,24.74323 -1.22694,5.31673 -1.22694,5.31673 -1.22694,5.31673"
              id="leftleg"
            />
          {/if}
          {#if misses > 5}
            <path
              class="draw"
              style="fill:#000000;fill-opacity:0;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1"
              d="m 83.550039,145.13646 c -12.26937,10.22448 -14.109773,30.67343 -14.109773,30.67343"
              id="rightarm"
            />
          {/if}
        </g>
      </svg>
    </div>

    <div
      style="display:flex; gap: 1rem; height: {ch *
        0.05}pt; margin-bottom: 4rem;"
    >
      {#if word}
        {#each word as letter}
          <div
            style="width: {ch > cw
              ? ch/word.length * .2
              : cw/word.length * .2}pt;  margin:0px; padding:0px; display:flex; justify-content:center; align-items:baseline; border: solid thin {secondary}; border-radius: .5rem;"
          >
            {#if letter.clicked}
              <p
                style="color: {textcolor}; font-size: {ch > cw
                  ? ch * 0.05
                  : cw * 0.05}pt; margin: 0px; "
              >
                {letter.letter}
              </p>
            {/if}
          </div>
        {/each}
      {/if}
    </div>

    <div
      style="display:flex; flex-direction:column; align-items:center; gap: .25rem;"
    >
      {#each keyboard as row}
        <div style="display:flex; gap: .25rem; height: 5vh">
          {#each row as cell}
            <button
              style="width: {(cw * 0.7) /
                9}px; display:flex; justify-content:center; align-items:center; border:solid thin {tertiary}; border-radius: .25rem; background-color:color( from white srgb r g b / .25 ); opacity: {cell.clicked
                ? '.2'
                : '1'}"
              onclick={() => {
                if (!cell.clicked) {
                  clicked(cell.letter);
                  cell.clicked = true;
                }
              }}
            >
              <p
                style="color: {textcolor}; font-size: {ch > cw
                  ? ch * 0.015
                  : cw * 0.015}pt; margin: 0px; ;"
              >
                {cell.letter}
              </p>
            </button>
          {/each}
        </div>
      {/each}
    </div>
  {:else}
    <span style="color: white; font-size:{cw / 10}pt;">Loading...</span>
  {/if}
</div>

<dialog bind:this={loseDialog}>
  <h1>You Lose!</h1>
  <button
    onclick={() => {
      location.reload();
    }}
  >
    Play Again?
  </button>
</dialog>

<dialog bind:this={winDialog}>
  <h1>You Win!!</h1>
  <button
    onclick={() => {
      location.reload();
    }}
  >
    Play Again?
  </button>
</dialog>

<style>
  :root {
    --animation-time: 1s;
  }

  button:hover {
    cursor: pointer;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .draw {
    stroke-dasharray: 1000 1000;
    animation: draw-in var(--animation-time) ease-in 0s;
  }
  @keyframes draw-in {
    0% {
      stroke-dashoffset: 1000;
    }
    50% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  .spinnin {
    animation: spin 100ms linear 0 infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
