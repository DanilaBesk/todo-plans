import React from "react";

type Props = {
  params: {
    id: string;
  };
};
export default function TodoList({ params }: Props) {
  return <div>TodoList {JSON.stringify(params.id)}</div>;
}

type responseGetTypes = {
  types: string[];
};
export async function generateStaticParams() {
  const lists: responseGetTypes = await fetch(
    "http://localhost:5000/api/todo-list/types"
  ).then((data) => data.json());
  const params = lists.types.map((list: string) => {
    return { id: list };
  });
  return params;
}
