interface TypesResponse {
  types: string[];
}

export async function getAllTypes(): Promise<TypesResponse> {
  const res = await fetch('http://localhost:5000/api/todo-list/types', {
    cache: 'force-cache',
  });
  return await res.json();
}
