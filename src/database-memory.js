import { randomUUID } from 'node:crypto'

export class DataBaseMemory {
    #accounts = new Map()
    //Metodo set, map

    list(){
        /*Cria um array de todas as entradas de dados
        return Array.from(this.#accounts.values()) retornaria apenas os valores sem o id(key)
        utilizando entries a função cria um array dentro de outro array, onde a id está localizada no primeiro array,
        e as demais informações estão localizadas no segundo, utilizando a função map com os seguintes comandos os arrays são unidos para mostrar
        todas informações em um único array*/
        return Array.from(this.#accounts.entries()).map((accountArray)=>{
            const id = accountArray[0]
            const data = accountArray[1]

            return {
                id,
                ...data,
            }
        })        
    }

    create(account){
        const accountId = randomUUID()
        this.#accounts.set(accountId, account)
    }

    update(id, account){
        this.#accounts.set(id, account)
    }

    delete(id){
        this.#accounts.delete(id)
    }
}