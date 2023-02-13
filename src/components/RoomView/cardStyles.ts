//************** Stylings for OPERATIVES****************//
const notYetRevealed = {
  width: '120pt',
  height: '96pt',
  backgroundColor: '#e2c78d',
  alignContent: 'center',
  margin: '0',
  color: 'black',
  textAlign: 'center',
  fontSize: '15px',
  fontFamily: 'Montserrat',
  textDecoration: 'underline',
  border: 'solid 3px black',
};
const redRevealed = {
  width: '120pt',
  height: '96pt',
  backgroundImage: `url(/images/red.svg)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  textIndent: '-9999px',
  margin: '0',
  border: 'none',
};
const blueRevealed = {
  width: '120pt',
  height: '96pt',
  backgroundimage: `url(/images/blue.svg)`,
  backgroundrepeat: 'no-repeat',
  backgroundsize: 'cover',
  margin: '0',
  textindent: '-9999px',
  border: 'none',
  backgroundColor: 'blue',
};
const beigeRevealed = {
  width: '120pt',
  height: '96pt',
  backgroundimage: `url(/images/beige.svg)`,
  backgroundrepeat: 'no-repeat',
  backgroundsize: 'cover',
  margin: '0',
  textindent: '-9999px',
  border: 'none',
  backgroundColor: 'brown',
};
const blackRevealed = {
  width: '120pt',
  height: '96pt',
  backgroundimage: `url(/images/black.svg)`,
  backgroundrepeat: 'no-repeat',
  backgroundsize: 'cover',
  margin: '0',
  textindent: '-9999px',
  border: 'none',
  backgroundColor: 'black',
};
// These are the 5 possible cards with fronts and backs once the teamId is known
const unknownCardStyles = {
  front: notYetRevealed,
  back: notYetRevealed,
};
const redCardStyles = {
  front: notYetRevealed,
  back: redRevealed,
};
const blueCardStyles = {
  front: notYetRevealed,
  back: blueRevealed,
};
const beigeCardStyles = {
  front: notYetRevealed,
  back: beigeRevealed,
};
const blackCardStyles = {
  front: notYetRevealed,
  back: blackRevealed,
};

const allCardStyles = { unknownCardStyles, redCardStyles, blueCardStyles, beigeCardStyles, blackCardStyles };
export default allCardStyles;
