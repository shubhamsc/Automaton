class NFA {
    constructor(tuple) {
        this.tuple = tuple;
    }

    doesAccept(strings) {
        let initialSate = this.tuple["start-state"];
        let acceptStates = Array.from(strings).reduce(this.updateState.bind(this), Array(initialSate));
        acceptStates = this.removeDeadMachine(acceptStates);
        acceptStates = this.getStatesByEpsilon(acceptStates);
        return acceptStates.some(acceptState => this.tuple["final-states"].includes(acceptState));
    }

    updateState(machineStates, string) {
        machineStates = this.removeDeadMachine(machineStates);
        machineStates = this.getStatesByEpsilon(machineStates);
        return machineStates.flatMap(machineState => {
            let state = this.tuple.delta[machineState]
            return state && state[string];
        });
    }

    getStatesByEpsilon(epsilonStates) {
        let machineStates = epsilonStates;
        return this.addEpsilonWithMachineState(epsilonStates, machineStates);

    }

    addEpsilonWithMachineState(epsilonStates, machineStates) {
        if (epsilonStates.length <= 0) {
            return machineStates;
        }
        let newStates = epsilonStates.flatMap(epsilon => {
            if (epsilon && this.isEpsilonState(epsilon)) {
                return this.getEpsilonStates(epsilon);
            }
        });
        newStates = this.removeDeadMachine(newStates);
        newStates = this.removeDuplicateMachine(newStates, machineStates);
        machineStates = machineStates.concat(newStates);
        return this.addEpsilonWithMachineState(newStates, machineStates);
    }

    removeDuplicateMachine(states, machineStates) {
        return states.filter(state => !machineStates.includes(state));
    }

    getEpsilonStates(machineState) {
        return this.tuple.delta[machineState].e;
    }

    isEpsilonState(machineState) {
        let epsilonState = this.tuple.delta[machineState];
        return epsilonState && Object.keys(epsilonState).includes("e");
    }

    removeDeadMachine(machineStates) {
        return machineStates.filter(machineState => machineState != undefined);
    }
}

module.exports = NFA;