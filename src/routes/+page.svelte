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
    const res = await fetch("/api/gencolors");

    const body = await res.json();
    const colors = body.result;
    primary = `rgb(${colors[0][0]},${colors[0][1]},${colors[0][2]})`;
    secondary = `rgb(${colors[1][0]},${colors[1][1]},${colors[1][2]})`;
    tertiary = `rgb(${colors[2][0]},${colors[2][1]},${colors[2][2]})`;
    textcolor = `rgb(${colors[3][0]},${colors[3][1]},${colors[3][2]})`;
    textcolor2 = `rgb(${colors[4][0]},${colors[4][1]},${colors[4][2]})`;
    console.log(primary);
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
    if (misses > 6) {
      loseDialog.showModal();
    }
    //win condition
    if (win) {
      winDialog.showModal();
    }
  }

  onMount(() => {
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
  style="height: 100vh; width: 100vw; margin: 0px; padding: 0px; background-color: {primary}; display:flex; flex-direction:column; gap: 4rem; align-items:center; justify-content:center;"
>
  {#if loaded}
    <div
      style="display: flex; flex-direction: column; gap: 2rem; color: {textcolor2};"
    >
      <h1 style="margin: 0px; padding: 0px; ">Misses</h1>
      <p style="font-size:72pt; margin: 0px; padding: 0px; text-align:center;">
        {misses}
      </p>
    </div>

    <div style="display:flex; align-items:center; gap: .5rem; height: 4rem;">
      {#if word}
        {#each word as letter}
          <div
            style="width: 4rem; margin:0px; padding:0px; display:flex; justify-content:center; align-items:center; border: solid thin {secondary}; border-radius: .5rem;"
          >
            {#if letter.clicked}
              <p style="color: {textcolor}">
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
        <div style="display:flex; gap: .25rem; height:2rem;">
          {#each row as cell}
            <button
              style="display:flex; justify-content:center; align-items:center; width: 2rem; border:solid thin {tertiary}; border-radius: .25rem; background-color:color( from white srgb r g b / .25 ); opacity: {cell.clicked
                ? '.2'
                : '1'}"
              onclick={() => {
                if (!cell.clicked) {
                  clicked(cell.letter);
                  cell.clicked = true;
                }
              }}
            >
              <p style="color: {textcolor}">
                {cell.letter}
              </p>
            </button>
          {/each}
        </div>
      {/each}
    </div>
  {:else}
    <span style="color: white; font-size:100pt;">Loading...</span>
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
</style>
