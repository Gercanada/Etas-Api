
class Usuarios {
    private personas: any[] = [];
    constructor() {
        this.personas = [];
    }

    agregarPersona(id: number | string, nombre: string, sala: string) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas;

    }

    getPersona(id: number | string) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala: string) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id: number | string) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        return personaBorrada;
    }


}

export default Usuarios;
