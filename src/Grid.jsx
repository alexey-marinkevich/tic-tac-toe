const Grid = () => {
  let occupiedSlots = [];
  let isCross = true;

  class Player {
    constructor(symbol) {
      this.symbol = symbol;
      this.score = 0;
      this.currentCombination = [];
    }

    select(id) {
      const idToNum = Number(id);
      if (!occupiedSlots.includes(idToNum)) {
        this.currentCombination.push(idToNum);
        this.currentCombination.sort((a, b) => a - b);
        occupiedSlots.push(idToNum);

        const element = document.getElementById(idToNum);
        element.innerHTML = this.symbol;
        changeActivePlayer();
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
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
      ];

      for (const winCombination of winCombinations) {
        const isWinCombinationIncluded = winCombination.every((element) =>
          this.currentCombination.includes(element)
        );
        if (isWinCombinationIncluded) {
          return true;
        }
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
    isCross = true;
  };

  const cross = new Player('x');
  const circle = new Player('o');

  const changeActivePlayer = () => (isCross = !isCross);

  const onClickAction = (id) => {
    if (isCross) {
      cross.select(id);
      const crossWon = cross.checkWinCombination();

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
    const circleWon = circle.checkWinCombination();
    if (circleWon) {
      circle.addScore();
      alert(
        `Player 2 Won! Total Score cross: ${cross.score} -  circle: ${circle.score}`
      );
      return resetLevel();
    }
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
