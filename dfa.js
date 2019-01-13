class DFA {
    constructor(tuple) {
        this.tuple = tuple;
    }
    doesAccept(strings) {
        let initialState = this.tuple["start-state"];
        let acceptState = Array.from(strings).reduce(this.updateState.bind(this), initialState);
        return this.tuple["final-states"].includes(acceptState);
    }

    updateState(machineState, string) {
        return this.tuple.delta[machineState][string];
    }
}

module.exports = DFA;