import { useSQLiteContext } from "expo-sqlite";

export type AlarmeDatabase = { 
  id: number;
  tempo: string;
  nome: string;
  ativo: boolean;
}

export function useAlarmeDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<AlarmeDatabase, "id">) {
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
}