const players = ["Joe", "Caroline", "Sabrina"];

function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(`${player} lost the draw.`);
      }
    });
  });
}

players.map((player) => {
  luckyDraw(player)
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
});
