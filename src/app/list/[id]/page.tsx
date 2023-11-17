import React from 'react';

type Props = {
  params: {
    id: string;
  };
};
export default function TodoList({ params }: Props) {
  return <div>TodoList types: {params.id}</div>;
}

// export async function generateStaticParams() {
//   const data = await getAllTypes();

//   const params = data.types.map((type: string) => {
//     return { id: type };
//   });
//   return params;
// }
