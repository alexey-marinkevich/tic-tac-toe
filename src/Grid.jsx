const Grid = () => {
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
