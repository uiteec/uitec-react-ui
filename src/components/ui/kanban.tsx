"use client";

import type { Announcements, DndContextProps, DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import {
  pointerWithin,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createContext, type HTMLAttributes, type ReactNode, useContext, useState } from "react";
import { createPortal } from "react-dom";
import tunnel from "tunnel-rat";
import { cn } from "@/lib/utils";

const t = tunnel();

export type { DragEndEvent } from "@dnd-kit/core";

type KanbanItemProps = {
  id: string;
  name: string;
  column: string;
} & Record<string, unknown>;

type KanbanColumnProps = {
  id: string;
  name: string;
} & Record<string, unknown>;

type KanbanContextProps<T extends KanbanItemProps = KanbanItemProps, C extends KanbanColumnProps = KanbanColumnProps> = {
  columns: C[];
  data: T[];
  activeCardId: string | null;
  activeOverColumn: string | null;
  activeCardOriginalColumn: string | null;
};

const KanbanContext = createContext<KanbanContextProps>({
  columns: [],
  data: [],
  activeCardId: null,
  activeOverColumn: null,
  activeCardOriginalColumn: null,
});

export type KanbanBoardProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export const KanbanBoard = ({ id, children, className }: KanbanBoardProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  const { activeOverColumn, activeCardId, activeCardOriginalColumn } = useContext(KanbanContext);
  const isOver = activeOverColumn === id && activeCardId !== null && activeOverColumn !== activeCardOriginalColumn;

  return (
    <div
      className={cn(
        "relative flex size-full min-h-40 flex-col overflow-hidden rounded-lg bg-transparent transition-all duration-200",
        className
      )}
      ref={setNodeRef}
    >
      {isOver && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-lg">
          <div className="rounded-lg text-sm font-semibold text-(--primary-default)">Solte aqui</div>
        </div>
      )}
      {children}
    </div>
  );
};

export type KanbanCardProps<T extends KanbanItemProps = KanbanItemProps> = T & {
  children?: ReactNode;
  className?: string;
};

export const KanbanCard = <T extends KanbanItemProps = KanbanItemProps>({
  id,
  name,
  children,
  className,
}: KanbanCardProps<T>) => {
  const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({
    id,
  });
  const { activeCardId } = useContext(KanbanContext) as KanbanContextProps;

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <>
      <div ref={setNodeRef} style={style} className="mb-3 w-full min-w-0 outline-none">
        <div
          {...attributes}
          {...listeners}
          className={cn("w-full min-w-0 max-w-full cursor-grab", isDragging && "opacity-30", className)}
        >
          {children ?? <p className="m-0 rounded-md border bg-white p-3 text-sm font-medium shadow-sm">{name}</p>}
        </div>
      </div>
      {activeCardId === id &&
        typeof window !== "undefined" &&
        createPortal(
          <DragOverlay adjustScale={false} zIndex={50}>
            <div className={cn("w-full transform cursor-grabbing scale-105 transition-transform", className)}>
              {children ?? <p className="m-0 rounded-md border bg-white p-3 text-sm font-medium shadow-md">{name}</p>}
            </div>
          </DragOverlay>,
          document.body
        )}
    </>
  );
};

export type KanbanCardsProps<T extends KanbanItemProps = KanbanItemProps> = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "id"
> & {
  children: (item: T) => ReactNode;
  id: string;
};

export const KanbanCards = <T extends KanbanItemProps = KanbanItemProps>({
  children,
  className,
  ...props
}: KanbanCardsProps<T>) => {
  const { data, activeCardId, activeOverColumn, activeCardOriginalColumn } = useContext(KanbanContext) as KanbanContextProps<T>;
  const filteredData = data.filter((item) => item.column === props.id);
  const items = filteredData.map((item) => item.id);

  return (
    <div
      className={cn(
        "h-full min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto pb-2",
        activeCardId && activeOverColumn === props.id && activeOverColumn !== activeCardOriginalColumn && "opacity-30"
      )}
    >
      <SortableContext items={items} disabled={activeCardId !== null && activeOverColumn !== props.id}>
        <div className={cn("flex min-h-full w-full min-w-0 max-w-full flex-col", className)} {...props}>
          {filteredData.map((item) => (
            <div key={item.id} className="w-full min-w-0 max-w-full">
              {children(item)}
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export type KanbanHeaderProps = HTMLAttributes<HTMLDivElement>;

export const KanbanHeader = ({ className, ...props }: KanbanHeaderProps) => (
  <div className={cn("m-0 p-3 text-sm font-semibold", className)} {...props} />
);

export type KanbanProviderProps<
  T extends KanbanItemProps = KanbanItemProps,
  C extends KanbanColumnProps = KanbanColumnProps,
> = Omit<DndContextProps, "children"> & {
  children: (column: C) => ReactNode;
  className?: string;
  columns: C[];
  data: T[];
  onDataChange?: (data: T[]) => void;
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
};

export const KanbanProvider = <
  T extends KanbanItemProps = KanbanItemProps,
  C extends KanbanColumnProps = KanbanColumnProps,
>({
  children,
  onDragStart,
  onDragEnd,
  onDragOver,
  className,
  columns,
  data,
  onDataChange,
  ...props
}: KanbanProviderProps<T, C>) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [activeOverColumn, setActiveOverColumn] = useState<string | null>(null);
  const [activeCardOriginalColumn, setActiveCardOriginalColumn] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const card = data.find((item) => item.id === event.active.id);
    if (card) {
      setActiveCardId(event.active.id as string);
      setActiveCardOriginalColumn(card.column);
    }
    onDragStart?.(event);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveOverColumn(null);
      return;
    }
    const activeItem = data.find((item) => item.id === active.id);
    const overItem = data.find((item) => item.id === over.id);
    if (!activeItem) return;

    const overColumn = overItem?.column || columns.find((col) => col.id === over.id)?.id || columns[0]?.id;

    setActiveOverColumn(overColumn);

    onDragOver?.(event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveCardId(null);
    setActiveOverColumn(null);
    setActiveCardOriginalColumn(null);

    if (!over || active.id === over.id) {
      onDragEnd?.(event);
      return;
    }

    const activeItem = data.find((item) => item.id === active.id);
    const overItem = data.find((item) => item.id === over.id);

    if (!activeItem) {
      onDragEnd?.(event);
      return;
    }

    const activeColumn = activeItem.column;
    const overColumn = overItem?.column || columns.find((col) => col.id === over.id)?.id;

    if (!overColumn) {
      onDragEnd?.(event);
      return;
    }

    if (activeColumn === overColumn) {
      const activeIndex = data.findIndex((item) => item.id === active.id);
      const rawOverIndex = data.findIndex((item) => item.id === over.id);

      if (activeIndex !== rawOverIndex) {
        const newData = [...data];
        const [movedItem] = newData.splice(activeIndex, 1);

        if (rawOverIndex === -1) {
          const itemsInColumn = newData.filter((item) => item.column === overColumn);
          const lastItemInColumn = itemsInColumn[itemsInColumn.length - 1];
          const insertAt = lastItemInColumn ? newData.findIndex((item) => item.id === lastItemInColumn.id) + 1 : newData.length;
          newData.splice(insertAt, 0, movedItem);
        } else {
          newData.splice(rawOverIndex, 0, movedItem);
        }

        onDataChange?.(newData);
      }

      onDragEnd?.(event);
      return;
    }

    const newData = [...data];
    const activeIndex = newData.findIndex((item) => item.id === active.id);
    const [movedItem] = newData.splice(activeIndex, 1);
    movedItem.column = overColumn;

    const itemsInTargetColumn = newData.filter((item) => item.column === overColumn);
    const lastItemInTargetColumn = itemsInTargetColumn[itemsInTargetColumn.length - 1];

    if (overItem) {
      newData.splice(newData.findIndex((item) => item.id === overItem.id), 0, movedItem);
    } else if (lastItemInTargetColumn) {
      const lastIndex = newData.findIndex((item) => item.id === lastItemInTargetColumn.id);
      newData.splice(lastIndex + 1, 0, movedItem);
    } else {
      newData.push(movedItem);
    }

    onDataChange?.(newData);
    onDragEnd?.(event);
  };

  const announcements: Announcements = {
    onDragStart({ active }) {
      const card = data.find((item) => item.id === active.id);
      return `Card "${card?.name}" pego na coluna "${card?.column}"`;
    },
    onDragOver({ active, over }) {
      const card = data.find((item) => item.id === active.id);
      const newColumn = columns.find((column) => column.id === over?.id)?.name;
      return `Card "${card?.name}" sobre a coluna "${newColumn}"`;
    },
    onDragEnd({ active, over }) {
      const card = data.find((item) => item.id === active.id);
      const newColumn = columns.find((column) => column.id === over?.id)?.name;
      return `Card "${card?.name}" solto na coluna "${newColumn}"`;
    },
    onDragCancel({ active }) {
      const card = data.find((item) => item.id === active.id);
      return `Arraste do card "${card?.name}" cancelado`;
    },
  };

  return (
    <KanbanContext.Provider value={{ columns, data, activeCardId, activeOverColumn, activeCardOriginalColumn }}>
      <DndContext
        accessibility={{ announcements }}
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        sensors={sensors}
        autoScroll={false}
        {...props}
      >
        <div className={cn("grid h-full min-h-0 w-max min-w-full auto-cols-fr grid-flow-col gap-4", className)}>
          {columns.map((column) => (
            <div key={column.id} className="h-full min-h-0 w-full min-w-0">
              {children(column)}
            </div>
          ))}
        </div>

        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay adjustScale={false} zIndex={50}>
              {activeCardId ? <t.Out /> : null}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </KanbanContext.Provider>
  );
};
