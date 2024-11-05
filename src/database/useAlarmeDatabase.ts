import { useSQLiteContext } from "expo-sqlite";

export type AlarmeDatabase = { 
  id: number;
  tempo: string;
  nome: string;
  ativo: boolean | number;
}

export function useAlarmeDatabase() {
  const database = useSQLiteContext();

  async function criar(data: Omit<AlarmeDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO alarmes (tempo, nome, ativo) VALUES ($tempo, $nome, $ativo)"
    );

    try {
      const resultado = await statement.executeAsync({
        $tempo: data.tempo,
        $nome: data.nome,
        $ativo: data.ativo
      });
      const insertedRowId = resultado.lastInsertRowId.toLocaleString();
      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function atualizar(data: AlarmeDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE alarmes SET tempo = $tempo, nome = $nome, ativo = $ativo WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: data.id,
        $tempo: data.tempo,
        $nome: data.nome,
        $ativo: data.ativo
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function atualizarAtivo(id: number, ativo: boolean) {
    const statement = await database.prepareAsync(
      "UPDATE alarmes SET ativo = $ativo WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: id,
        $ativo: ativo
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remover(id: number) {
    try {
      await database.execAsync("DELETE FROM alarmes WHERE id = " + id)
    } catch (error) {
      throw error;
    }
  }

  function converteAtivo(ativo: number | boolean) {
    return (ativo === 1) ? true : false
  }

  async function buscarUm(id: number) {
    try {
      const query = "SELECT * FROM alarmes WHERE id = ?"
      const response = await database.getFirstAsync<AlarmeDatabase>(query, [id]);
      return {
        id: (response?.id) ? response.id : 0,
        tempo: (response?.tempo) ? response?.tempo : "00:00",
        nome: (response?.nome) ? response.nome : "",
        ativo: converteAtivo((response?.ativo) ? response.ativo : 0),
      }
    } catch (error) {
      throw error;
    }
  }

  async function buscarTodos() {
    try {
      const query = "SELECT * FROM alarmes"
      const response = await database.getAllAsync<AlarmeDatabase>(query);
      return response.map((item) => {
        return {
          id: item.id,
          tempo: item.tempo,
          nome: item.nome,
          ativo: (item.ativo === 1) ? true : false,
        }
      });
    } catch (error) {
      throw error;
    }
  }

  return { criar, atualizar, atualizarAtivo, remover, buscarUm, buscarTodos }
}