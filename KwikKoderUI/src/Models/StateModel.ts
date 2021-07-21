export interface State {
    words: string;
    wordarray: string[];
    typedarray: Array<string[]>;
    enteredText: string;
    errors: number;
    started: boolean;
    finished: boolean;
    startTime: Date;
    timeTaken: number;
    letterPosition: number;
    //wordPosition: number;
    correctchars: number;
  }