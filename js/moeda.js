class Moeda {
    nome;
    peso;
    constructor(_nome, _peso) {
        this.nome = _nome;
        this.peso = _peso;
    }
    get peso() {
        return this.peso;
    }
    get nome() {
        return this.nome;
    }
    set peso(_peso) {
        this.peso = _peso;
    }
}
