const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function listar<T>(chave: string): Promise<T[]> {
  await delay(700);
  const texto = localStorage.getItem(chave);
  return texto ? JSON.parse(texto) : [];
}

export async function salvarLista<T>(chave: string, lista: T[]): Promise<void> {
  localStorage.setItem(chave, JSON.stringify(lista));
}

export async function criar<T extends { id?: number }>(
  chave: string,
  item: Omit<T, "id">
): Promise<T> {
  const lista = await listar<T>(chave);
  const novo = { ...item, id: Date.now() } as T;
  lista.push(novo);
  await salvarLista(chave, lista);
  return novo;
}