// TODO: in progress
/**
 * A game on an undirected graph is played by two players, Mouse and Cat, who alternate turns.

The graph is given as follows: graph[a] is a list of all nodes b such that ab is an edge of the graph.

The mouse starts at node 1 and goes first, the cat starts at node 2 and goes second, and there is a hole at node 0.

During each player's turn, they must travel along one edge of the graph that meets where they are.  For example, if the Mouse is at node 1, it must travel to any node in graph[1].

Additionally, it is not allowed for the Cat to travel to the Hole (node 0.)

Then, the game can end in three ways:

    If ever the Cat occupies the same node as the Mouse, the Cat wins.
    If ever the Mouse reaches the Hole, the Mouse wins.
    If ever a position is repeated (i.e., the players are in the same position as a previous turn, and it is the same player's turn to move), the game is a draw.

Given a graph, and assuming both players play optimally, return

    1 if the mouse wins the game,
    2 if the cat wins the game, or
    0 if the game is a draw.
 * @returns 
 */
export function catMouseGame(graph: number[][]): number {
    // initialize result
    let result: Outcome = 'next';

    // first player will be index 1
    const players = {
        cat: new CatPlayer(graph),
        mouse: new MousePlayer(graph)
    }
    // create a game, play a turn & check the outcome, continue until an end state is reached
    const game = new ChaseGame(players);
    do {
        game.changeTurn();
        game.playTurn();
        result = game.checkOutcome();
    } while(result === 'next')

    // convert result
    switch(result) {
        case 'cat':
            return 2;
        case 'mouse':
            return 1;
        case 'draw':
            return 0;
    }
}

/**
 * Abstract player interface for Game class
 */
export abstract class Player {
    public node: number;
    public goal: number;
    public graph: number[][];

    constructor(graph, startingNode, startingGoal) {
        this.graph = graph;
        this.node = startingNode;
        this.goal = startingGoal;
    }

    public abstract updateGoal(goalNode?: number): void;
    public abstract takeTurn(): void;
    public checkWinCondition(): boolean {
        return this.node === this.goal;
    }
}

export class CatPlayer extends Player {
    constructor(graph) {
        super(graph, 2, 1);
    }

    public takeTurn() {
        // TODO
        throw new Error("Method not implemented.");
    }

    public updateGoal(goalNode?: number): void {
        this.goal = goalNode;
    }
}

export class MousePlayer extends Player {
    constructor(graph) {
        super(graph, 1, 0);
    }

    public takeTurn() {
        // TODO
        throw new Error("Method not implemented.");
    }

    public updateGoal(goalNode?: number): void {
        // goal does not change
        return;
    }
}

export type PlayerRole = 'cat' | 'mouse';
export type Outcome = PlayerRole | 'draw' | 'next';

export class ChaseGame {
    // HACK: Assumes one player per role.
    private players: Record<PlayerRole, Player>;
    private currentTurn: PlayerRole;
    private stateLog: { playerRole: PlayerRole; mouseNode: number; catNode: number }[]

    constructor(players: Record<PlayerRole, Player>) {
        // HACK: start on the cat's turn such that the first turn change makes it the mouse's turn
        this.currentTurn = 'cat';
        this.players = players;
    }

    public playTurn(): void {
        this.players[this.currentTurn].takeTurn();
    }

    public checkOutcome(): Outcome {
        this.players[this.currentTurn].checkWinCondition();
        const stalemate = !this.addState();
        if (stalemate)
            return 'draw'
        else
            return 'next';
    }

    // HACK: Assumes only 2 players / 2 roles.
    public changeTurn(): void {
        this.currentTurn = this.currentTurn === 'cat' ? 'mouse' : 'cat';
    }

    private addState(): boolean {
        const matchingStates = this.stateLog.filter((x) => {
            x.playerRole === this.currentTurn &&
            x.mouseNode === this.players[0].node &&
            x.catNode === this.players[1].node
        });

        if (matchingStates.length === 0) {
            this.stateLog.push({
                playerRole: this.currentTurn,
                mouseNode: this.players[0].node,
                catNode: this.players[1].node,
            });
            return true;
        } else 
            return false;
    }
}

