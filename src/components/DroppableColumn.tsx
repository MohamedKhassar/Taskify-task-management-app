import { useDroppable } from "@dnd-kit/core"
import { memo, type ReactNode } from "react"
import { cn } from "@/lib/utils"

const DroppableColumn = memo(function DroppableColumn({
  columnId,
  children,
}: {
  columnId: string
  children: ReactNode
}) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "p-2 gap-2 grid max-h-127 overflow-y-scroll scrollbar scrollbar-thumb-black-50 rounded-md transition-colors",
        isOver ? "bg-sky-50 dark:bg-sky-900/30" : ""
      )}
    >
      {children}
    </div>
  )
})

export default DroppableColumn
