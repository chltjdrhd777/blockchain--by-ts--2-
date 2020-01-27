import * as CryptoJS from "crypto-js"; // It is statement that I would use crypto files to use static inside class without the declaration of new Block.

class Block {
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString(); // This static allows me to get a set of strings comprising index,previousHash,timestamp,data like "a,b,c,d," that is used for determining particular arrangement of hash.

  static validateStructure = (
    aBlock: Block
  ): boolean => // static validateStructure = allows me to check out whether a "Block" object's constituents have specific type that I decide.
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
    // I can make default class values like this but, I wan to add more convenient things which allows me to use some methods contained in the class although I did not make block(actually, if I want to use method default by class, I have to write the method inside class. For example, "class Block{ sayHello();} then, then, "const blockChain:Block = new Block();" ")  by using "crypto". First of all, write "npm add crypto-js" in terminal. Then, in the top of codes, add "(import * as CryptoJS from "crypto-js)";
  }
}

const genesisBlock: Block = new Block(0, "2020202020202", "", "hello", 123456); // I would make Block object which contains 0,"20202002"......123456 which are correspond to each property of class Block

let blockchain: Block[] = [genesisBlock]; // makes the array which consists of block object.

const getBlockchain = (): Block[] => blockchain; // It means I would get the array of Block object
const getLatestBlock = (): Block => blockchain[blockchain.length - 1]; // It allows me to approach the latest Block object. For example, if there are three Block object inside the array, blockchain.length -1 = 2, and blockchain[2] = the third Block object.
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000); // it is just timestamp.

const createNewBlock = (data: string): Block => {
  // the result type would become string because I returns the newBlock which uses static calculateBlockHash inside class Block.
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock); //and I would send this result "newBlock" to addBlock() which acts as entrance that judges whether newBlock has exact properties in accordance with inside rules of isBlockvalid()
  return newBlock;
};

const getHashforBlock = (
  aBlock: Block
): string => // this function acts for randering each harsh arrangement of parameters.
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );

const isBlockvalid = (candidateBlock: Block, previousBlock: Block): boolean => {
  // Judge each Blocks have proper qualifications.
  if (!Block.validateStructure(candidateBlock)) {
    //if the properties of each Block doesn't match criteria of validateStructure(),
    return false; //get out
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    //if candidateBlock's index value is not previousBlock's index+1,
    return false; //get out
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    // if candidateBlock's previousHarsh value is not previousBlock's hash value,
    return false; // get out
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    //if current candidateBlock's hash is not the same as the result of getHashforBlock(candidateBlock),
    return false; // get out
  } else {
    //except for those above
    return true; // pass
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockvalid(candidateBlock, getLatestBlock())) {
    // if the candidateBlock pass the censorship of isBlockvalid(), and is turned to be "true"
    blockchain.push(candidateBlock); // add this Block to blockchain
  }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);
export {};
