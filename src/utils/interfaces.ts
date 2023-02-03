// This is a file of TS interfaces that get used in multiple places
// So they live here so you can import them!

interface CardObj {
  id: number;
  isVisibleToAll: boolean;
  wordString: string;
  wordId: number;
  word: WordObj;
  boardId: number;
  teamId: null | number;
}

interface ClueType {
  clueString: string;
  clueNumber: null | number;
  playerSubmitting: string; // this is the player's ID (which is a string)
}

interface SimpleHistoryObject {
  [index: string]: string | ClueType;
  // clueString: string;
  // clueNumber: number;
}
interface PlayerType {
  playerId: string;
  username: string;
  roomId: string;
  isHost: boolean;
}

interface Spy {
  playerId: string;
  username: string;
}
interface Operative {
  playerId: string;
  username: string;
}

  // this is from word assoc with id, etc.
  interface WordObj {
    id: number;
    word: string;
  }

  interface WordsWithTeamIdsObj {
    [index: number]: CardObj;
  }

  
export { PlayerType, ClueType, CardObj, SimpleHistoryObject, Operative, WordsWithTeamIdsObj, Spy };
