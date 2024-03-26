let globalQuestionType: string;
let globalAgeRanges: string[];
let globalGenders: number[];
let globalLanguages: string[]; 
let globalMen: number[];
let globalWomen: number[];
let globalOther: number[];


export function setGlobalQuestionType(newValue: string) {
    globalQuestionType = newValue;
}

export function getGlobalQuestionType() {
    return globalQuestionType;
}

export function setGlobalAgeRanges(newValue: string[]){
    return globalAgeRanges = newValue; 
}

export function getGlobalAgeRanges() {
    return globalAgeRanges;
}

export function setGlobalGenders(newValue: number[]){
    return globalGenders = newValue; 
}

export function getGlobalGenders() {
    return globalGenders;
}

export function setGlobalLanguages(newValue: string[]){
    return globalLanguages = newValue; 
}

export function getGlobalLanguages() {
    return globalLanguages;
}

export function getGlobalMen() {
    return globalMen;
}

export function setGlobalMen(newValue: number[]){
    return globalMen = newValue; 
}

export function getGlobalWomen() {
    return globalWomen;
}

export function setGlobalWomen(newValue: number[]){
    return globalWomen = newValue; 
}

export function getGlobalOther() {
    return globalOther;
}

export function setGlobalOther(newValue: number[]){
    return globalOther = newValue; 
}

