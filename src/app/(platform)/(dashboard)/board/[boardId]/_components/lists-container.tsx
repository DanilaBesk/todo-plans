'use client';

import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';

import { updateCardsOrder } from '@/actions/update-cards-order';
import { updateListsOrder } from '@/actions/update-lists-order';
import { useAction } from '@/hooks/use-action';
import { ListWithCards } from '@/types';
import { toast } from 'sonner';
import { ListForm } from './list-form';
import { ListItem } from './list-item';

interface ListsContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(array: T[], startIndex: number, endIndex: number) {
  const result = Array.from(array);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}
export const ListsContainer = ({ data, boardId }: ListsContainerProps) => {
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);

  const { execute: executeUpdateListsOrder } = useAction(updateListsOrder, {
    onSuccess() {
      toast.success(`List reordered`);
    },
    onError(error) {
      toast.error(error);
    },
  });
  const { execute: executeUpdateCardsOrder } = useAction(updateCardsOrder, {
    onSuccess() {
      toast.success(`Card reordered`);
    },
    onError(error) {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, type } = result;
    console.log(result);
    if (
      !destination ||
      (destination.index === source.index &&
        destination?.droppableId === source?.droppableId)
    ) {
      return;
    }
    if (type === 'list') {
      const newOrderedLists = reorder(
        orderedData,
        source.index,
        destination.index
      );
      newOrderedLists.forEach((list, index) => (list.order = index));
      setOrderedData(newOrderedLists);
      executeUpdateListsOrder({ items: newOrderedLists, boardId });
    }
    if (type === 'card') {
      let newOrderedData = [...orderedData];
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!destinationList || !sourceList) return;
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, index) => (card.order = index));

        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);
        executeUpdateCardsOrder({ items: reorderedCards, boardId });
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        sourceList.cards.forEach((card, index) => (card.order = index));

        movedCard.listId = destination.droppableId;
        destinationList.cards.splice(destination.index, 0, movedCard);
        destinationList.cards.forEach((card, index) => (card.order = index));

        setOrderedData(newOrderedData);
        executeUpdateCardsOrder({ items: destinationList.cards, boardId });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
            {orderedData.map((listWithCards, index) => (
              <ListItem
                key={listWithCards.id}
                index={index}
                data={listWithCards}
              />
            ))}
            {provided.placeholder}
            <ListForm boardId={boardId} />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
