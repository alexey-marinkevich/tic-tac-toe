const Grid = () => {
  const winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 3, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  let occupiedSlots = [];

  class Player {
    constructor(symbol) {
      this.symbol = symbol;
      this.score = 0;
      this.currentCombination = [];
    }

    select(id) {
      if (!occupiedSlots.includes(id)) {
        this.currentCombination.push(id);
        this.currentCombination.sort((a, b) => a - b);
        console.log(this.currentCombination);
        occupiedSlots.push(id);

        const element = document.getElementById(id);
        element.innerHTML = this.symbol;
      }
    }

    addScore() {
      this.score += 1;
    }

    checkWinCombination() {
      const winCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 3, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
      ];

      for (const winCombination of winCombinations) {
        return winCombination.every((element) =>
          this.currentCombination.includes(element)
        );
      }
      return false;
    }
  }

  const cleanCells = (ids) => {
    ids.forEach((id) => {
      const cell = document.getElementById(id);
      if (cell) {
        cell.textContent = '';
      }
    });
  };

  const resetLevel = () => {
    cross.currentCombination = [];
    circle.currentCombination = [];

    cleanCells(occupiedSlots);

    occupiedSlots = [];
    activePlayer = 'cross';
  };

  const cross = new Player('x');
  const circle = new Player('o');
  let activePlayer = 'cross';

  const changeActivePlayer = () =>
    activePlayer === 'cross'
      ? (activePlayer = 'circle')
      : (activePlayer = 'cross');

  const onClickAction = (id) => {
    if (activePlayer === 'cross') {
      cross.select(id);
      changeActivePlayer();
      const crossWon = winCombinations.some(
        (arr) => arr.toString() === cross.currentCombination.toString()
      );

      if (crossWon) {
        cross.addScore();
        alert(
          `Player 1 Won! Total Score cross: ${cross.score} -  circle: ${circle.score}`
        );
        return resetLevel();
      }

      return;
    }

    circle.select(id);
    const circleWon = winCombinations.some(
      (arr) => arr.toString() === circle.currentCombination.toString()
    );
    if (circleWon) {
      circle.addScore();
      alert(
        `Player 2 Won! Total Score cross: ${cross.score} -  circle: ${circle.score}`
      );
      return resetLevel();
    }
    changeActivePlayer();
    return;
  };

  return (
    <div
      className="grid grid-cols-3 text-center
    [&>*:nth-child(-n+6)]:border-b-2 [&>*]:font-bold 
    [&>*]:border-r-2 [&>*:nth-child(3n)]:border-r-0
    [&>*]:p-6
    "
      onClick={({ target }) => onClickAction(target.id)}
    >
      <div id="1"></div>
      <div id="2"></div>
      <div id="3"></div>
      <div id="4"></div>
      <div id="5"></div>
      <div id="6"></div>
      <div id="7"></div>
      <div id="8"></div>
      <div id="9"></div>
    </div>
  );
};

export default Grid;
