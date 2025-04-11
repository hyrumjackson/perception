export interface Player {
    id: string;
    gameId: string;
    isHost: boolean;
    name: string;
    avatarId: string;
    score: number;
    vote: number;
    hasVoted: boolean;
  }
  
  export interface Prompt {
    id: string;
    text: string;
    minText: string;
    maxText: string;
  }
  
  export interface Game {
    id: string;
    hostId: string;
    playerCount: number;
    promptGen: boolean;
    roundCount: number;
    currentRound: number;
    status: string;
  }
  
  export interface Avatar {
    id: number;
    avatarImage: string;
  }
  
  export interface Round {
    roundNum: number;
    promptId: string;
  }  