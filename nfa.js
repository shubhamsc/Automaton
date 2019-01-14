class NFA {
    constructor(tuple) {
        this.startState = tuple["start-state"];
        this.finalStates = tuple["final-states"];
        this.delta = tuple.delta;
    }

    doesAccept(strings) {
        let acceptStates = Array.from(strings).reduce(this.updateStates.bind(this), Array(this.startState));
        acceptStates = this.getStatesByEpsilon(acceptStates);
        return acceptStates.some(acceptState => this.finalStates.includes(acceptState));
    }

    updateStates(machineStates, string) {
        machineStates = this.getStatesByEpsilon(machineStates);
        return machineStates.flatMap(machineState => {
            let newState = this.delta[machineState];
            return newState && newState[string];
        });
    }

    getStatesByEpsilon(epsilonStates, machineStates = epsilonStates) {
        if (epsilonStates.length <= 0) {
            return machineStates;
        }
        let newStates = epsilonStates.flatMap(epsilon => {
            return epsilon && this.hasEpsilon(epsilon) && this.getEpsilonStates(epsilon);
        });
        newStates = this.removeDeadStates(newStates);
        newStates = this.removeResolvedStates(newStates, machineStates);
        machineStates.push(...newStates);
        return this.getStatesByEpsilon(newStates, machineStates);
    }

    removeResolvedStates(states, machineStates) {
        return states.filter(state => !machineStates.includes(state));
    }

    getEpsilonStates(machineState) {
        return this.delta[machineState].e;
    }

    hasEpsilon(machineState) {
        let epsilonState = this.delta[machineState];
        return epsilonState && Object.keys(epsilonState).includes("e");
    }

    removeDeadStates(machineStates) {
        return machineStates.filter(machineState => machineState);
    }
}

module.exports = NFA;