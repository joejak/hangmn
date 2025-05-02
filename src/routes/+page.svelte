<script lang="ts">
  import { onMount } from "svelte";

  let loaded = $state(false);
  let primary = $state("rgb(0,0,0)");
  let secondary = $state("rgb(0,0,0)");
  let tertiary = $state("rgb(1,1,1)");
  let textcolor = $state("rgb(1,1,1)");
  let textcolor2 = $state("rgb(1,1,1");
  let misses = $state(0);
  let word: { letter: string; clicked: boolean }[] = $state([]);
  let loadingColor = $state(false);
  let loadingWord = $state(false);

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

  async function reset() {
    loadingWord = true;
    await getRandomWord();
    for (const k of keyboard) {
      for (const l of k) {
        l.clicked = false;
      }
    }
    misses = 0;
    loadingWord = false;
  }

  onMount(() => {

    cw = window.visualViewport?.width ? window.visualViewport.width : 500;
    ch = window.visualViewport?.height ? window.visualViewport.height : 500;
    Promise.all([getRandomWord(), getColorScheme()]);
    setTimeout(()=>{
        loaded = true;
    }, 4000)
  });
</script>

<div
  style="width: 100vw; height:100vh; margin: 0px; padding: 0px; background-color: {primary}; display:flex; flex-direction:column; gap: 10px; align-items:center; justify-content:center;
  "
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
        <button
          style="background-color: color(from white srgb r g b / .5 ); border: none; aspect-ratio: 1/1; float: right; border: solid thin black; border-radius: 4rem; border-color:{tertiary}; display: flex; justify-content: center; align-items: center; align-self: center; height: 62pt; width: 62pt"
          onclick={() => {
            reset();
          }}
        >
          {#if loadingWord}
            <img
              class="spinnin"
              width="62pt"
              height="62pt"
              src="/refresh.svg"
              alt=""
            />
          {:else}
            <svg
              height="62pt"
              width="62pt"
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xml:space="preserve"
            >
              <style type="text/css">
                .st0 {
                }
              </style>
              <g>
                <path
                  style="fill: {textcolor};"
                  d="M412.174,352.363c-12.536,3.75-24.842,10.263-37.224,22.584l-0.016,0.016
             c-16.117,16.239-22.454,32.372-25.254,49.025c-2.756,16.646-1.394,33.689-1.103,49.997c0.03,2.725,0.046,5.449-0.015,8.151
             l133.575-133.591c-4.24,0.1-8.51,0.038-12.826-0.069C450.531,347.916,430.924,346.768,412.174,352.363z"
                />
                <path
                  style="fill: {textcolor2};"
                  d="M256.007,0.004C114.611,0.004,0,114.607,0,255.988c0,141.397,114.611,256.008,256.007,256.008
             c21.168,0,41.663-2.74,61.347-7.592c2.525-2.793,4.132-6.244,5.173-11.816c1.056-5.839,1.148-13.622,0.888-22.606
             c-0.428-17.985-2.204-40.776,4.898-64.928c4.73-16.086,13.638-32.617,28.898-47.823c0,0,0-0.008,0.016-0.016
             c19.944-20.066,42.214-28.997,62.708-32.28c20.525-3.329,39.428-1.615,54.444-1.431c9.995,0.199,18.137-0.414,23.418-2.304
             c2.785-0.988,4.791-2.227,6.612-3.888c4.852-19.66,7.592-40.163,7.592-61.323C512,114.607,397.389,0.004,256.007,0.004z
              M202.069,322.439l-16.775,3.306c-1.132,0.214-1.913-0.069-2.679-0.941l-45.78-53.495l-0.704,0.138l11.831,60.168
             c0.168,0.85-0.291,1.524-1.132,1.691l-15.934,3.131c-0.842,0.168-1.515-0.292-1.684-1.141l-18.275-92.991
             c-0.183-0.857,0.276-1.523,1.118-1.691l16.913-3.329c0.995-0.199,1.913,0.069,2.663,0.949l45.688,53.655l0.704-0.138
             l-11.862-60.313c-0.169-0.85,0.29-1.515,1.148-1.691l15.918-3.13c0.842-0.168,1.516,0.275,1.684,1.132l18.291,92.999
             C203.37,321.606,202.911,322.278,202.069,322.439z M284.675,306.192l-61.438,12.091c-0.857,0.161-1.516-0.291-1.683-1.14
             l-18.306-92.991c-0.153-0.857,0.291-1.531,1.148-1.699l61.438-12.084c0.842-0.161,1.516,0.292,1.684,1.14l2.954,15.077
             c0.184,0.842-0.275,1.515-1.117,1.683l-41.296,8.12c-0.566,0.106-0.795,0.444-0.689,1.01l3.751,19.025
             c0.106,0.559,0.443,0.788,1.01,0.681l34.392-6.766c0.842-0.161,1.516,0.299,1.684,1.133l2.939,14.938
             c0.168,0.849-0.291,1.516-1.133,1.684l-34.392,6.764c-0.551,0.108-0.796,0.444-0.689,1.01l3.918,19.867
             c0.107,0.567,0.459,0.788,1.01,0.673l41.295-8.12c0.842-0.168,1.516,0.299,1.684,1.14l2.969,15.076
             C285.977,305.358,285.518,306.032,284.675,306.192z M387.578,284.488c0.016,0.888-0.566,1.592-1.561,1.776l-14.096,2.77
             c-0.98,0.199-1.668-0.26-2.113-1.049l-28.347-56.333l-0.275,0.061l-5.052,62.899c-0.106,0.896-0.566,1.577-1.545,1.768
             l-14.096,2.778c-0.843,0.161-1.516-0.298-1.975-1.087l-43.086-88.124c-0.306-0.819-0.138-1.439,0.856-1.63l18.168-3.574
             c0.994-0.191,1.668,0.252,1.959,1.079l25.652,57.45l0.291-0.061l4.515-63.374c0.107-0.911,0.566-1.577,1.546-1.776l12.26-2.41
             c0.842-0.161,1.516,0.283,1.975,1.087l28.729,56.831l0.291-0.053l1.408-62.762c-0.046-1.018,0.429-1.561,1.423-1.752l18.03-3.544
             c0.98-0.199,1.378,0.306,1.393,1.186L387.578,284.488z"
                />
              </g>
            </svg>
          {/if}
        </button>
        {#each word as letter}
          <div
            style="width: {ch > cw
              ? (ch / word.length) * 0.2
              : (cw / word.length) *
                0.2}pt;  margin:0px; padding:0px; display:flex; justify-content:center; align-items:center; border: solid  {secondary}; border-radius: .5rem;"
          >
            {#if letter.clicked}
              <p
                style="color: {textcolor}; font-size: {ch > cw
                  ? ch * 0.015
                  : cw * 0.015}pt; margin: 0px; "
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
    <div style="display:flex; flex-direction:column; justify-content:center;">
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
        <g id="layer1" transform="translate(-3.4026869,-28.162284)" style="--animation-time:500ms;">
          <path
            class="loaddraw"
            style="fill:#f4ecf6;fill-opacity:0.504249;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:0.988406;--animation-sequence:1"
            d="M 162.48299,201.16659 162.89197,33.894177"
            id="post"
          />
          <path
            class="loaddraw"
            style="fill:#f4ecf6;fill-opacity:0.504249;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1;--animation-sequence:0"
            d="M 6.0485218,205.05189 205.42578,205.25638"
            id="base"
          />
          <path
            class="loaddraw"
            style="fill:#f4ecf6;fill-opacity:0.504249;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1;--animation-sequence:2"
            d="M 162.68748,34.098668 71.894139,34.303157"
            id="topbar"
          />
          <path
            class="loaddraw"
            style="fill:#f4ecf6;fill-opacity:0.504249;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1; --animation-sequence:3"
            d="m 113.40551,34.916625 46.82809,45.60116"
            id="postsupport"
          />
          <path
            class="loaddraw"
            style="fill:#000000;fill-opacity:0;stroke:{tertiary};stroke-width:4.48789;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1; --animation-sequence:4"
            d="m 75.991789,33.475182 v 3.748321 c 0,0 1.29992,-7.218988 3.89977,-6.802507 2.59985,0.41648 0.64997,6.941333 2.38321,6.802507 1.73322,-0.138828 1.51657,-6.386027 3.46646,-6.386027 1.94988,0 5.41635,6.802506 4.33309,6.802506 -1.08328,0 -6.93294,-4.720107 -6.93294,-3.609493 0,1.110612 0.86661,22.351094 0.86661,22.351094"
            id="rope"
          />

          <path
            class="loaddraw"
            style="fill:#000000;fill-opacity:0;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1;--animation-sequence:5"
            d="m 85.261512,56.079571 c 0,0 18.690358,-0.357004 17.908198,17.737305 C 102.38754,91.911184 88.214824,92.406433 85.130646,92.407138 82.046468,92.407843 63.565967,90.747469 63.620713,75.559643 63.699863,53.601409 84.379407,56.079571 84.379407,56.079571"
            id="head"
          />

          <path
            class="loaddraw"
            style="fill:#000000;fill-opacity:0;stroke:{tertiary};stroke-width:5.17607;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1;--animation-sequence:6"
            d="m 83.696729,92.320375 1.13805,50.624505"
            id="body"
          />

          <path
            class="loaddraw"
            style="fill:#000000;fill-opacity:0;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1;--animation-sequence:6.25"
            d="m 87.026369,99.944285 c 0,0 16.563651,6.952645 16.972631,20.039975 0.40897,13.08732 -0.61347,12.47386 -0.61347,12.47386"
            id="leftarm"
          />

          <path
            class="loaddraw"
            style="fill:#000000;fill-opacity:0;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1;--animation-sequence:6.25"
            d="m 80.687179,100.14878 c 0,0 -20.68055,9.12525 -15.336701,21.47139 l 5.930191,13.7008"
            id="rightarm"
          />

          <path
            class="loaddraw"
            style="fill:#000000;fill-opacity:0;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1;--animation-sequence:7"
            d="m 85.185959,143.90953 c 0,0 12.67835,19.42651 11.45141,24.74323 -1.22694,5.31673 -1.22694,5.31673 -1.22694,5.31673"
            id="leftleg"
          />

          <path
            class="loaddraw"
            style="fill:#000000;fill-opacity:0;stroke:{tertiary};stroke-width:5.29167;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1;--animation-sequence:7"
            d="m 83.550039,145.13646 c -12.26937,10.22448 -14.109773,30.67343 -14.109773,30.67343"
            id="rightarm"
          />
        </g>
      </svg>
      <h1 style="text-align:center; color:{textcolor2}">
        Loading...
      </h1>
    </div>
  {/if}
</div>

<dialog
  bind:this={loseDialog}
  style="background-color: {textcolor2}; border-radius: 2rem; padding: 2rem;"
>
  <div style="display:flex; flex-direction: column; justify-content: center;">
    <h1 style="color: {primary}; font-size:xxx-large">Game Over!</h1>
    <button
      onclick={() => {
        location.reload();
      }}
      style="font-size: xx-large; color: {primary}; border-radius: 1rem; background-color:color(from white srgb r g b /.25"
    >
      Play Again
    </button>
  </div>
</dialog>

<dialog
  bind:this={winDialog}
  style="background-color: {textcolor2}; border-radius: 2rem; padding: 2rem;"
>
  <div style="display:flex; flex-direction: column; justify-content: center;">
    <h1 style="color: {primary}; font-size:xxx-large">You Win!</h1>
    <button
      onclick={() => {
        location.reload();
      }}
      style="font-size: xx-large; color: {primary}; border-radius: 1rem; background-color:color(from white srgb r g b /.25"
    >
      Play Again
    </button>
  </div>
</dialog>

<style>
  :root {
    --animation-time: 500ms;
  }

  * {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
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

  .loaddraw{
    stroke-dasharray: 1000 1000;
    stroke-dashoffset: 1000;
    animation: draw-in ease-in-out alternate;
    animation-duration:calc(var(--animation-time)*calc(8.5 - var(--animation-sequence))); 
    animation-delay:calc(var(--animation-time)*var(--animation-sequence));
  }
  @keyframes draw-in {
    0% {
      stroke-dashoffset: 1000;
    }
    1% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  .spinnin {
    animation: spin 750ms linear infinite;
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
