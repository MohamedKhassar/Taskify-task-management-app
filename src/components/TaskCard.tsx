import { cn } from '@/lib/utils'
import type { Task } from '@/utils/types'
import { useDraggable } from '@dnd-kit/core'
import { CalendarClock, PencilIcon } from 'lucide-react'

const TaskCard = ({ task, isOverlay = false }: { task: Task, isOverlay?: boolean }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task._id!,
        disabled: isOverlay, // disable drag for overlay
    })

    const style = !isOverlay && transform
        ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
        : undefined

    return (
        <div ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className={cn('dark:bg-body bg-white p-4 rounded-xl space-y-1 cursor-grab',
                isDragging ? "opacity-50" : "", isOverlay ? "ring-4 ring-sky-200/30 cursor-grabbing" : ""
            )}>
            <div className='flex items-center justify-between'>
                <h4>{task.title}</h4>
                <span className={cn(
                    "px-4 py-0.5 rounded-full text-xs capitalize",
                    task.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                )}>{task.priority}</span>
            </div>
            <div className='max-w-80'>
                <p className='text-neutral-500 dark:text-neutral-400 text-xs'>{task.description}</p>
            </div>
            <div className='flex items-center justify-end gap-2 text-gray-400'>
                <small className='!text-[11px]'>
                    {
                        (() => {
                            const created = new Date(task.createdAt!)
                            const today = new Date()
                            const yesterday = new Date()
                            yesterday.setDate(today.getDate() - 1)

                            // normalize times to only compare dates
                            const isSameDay = (d1: Date, d2: Date) =>
                                d1.getFullYear() === d2.getFullYear() &&
                                d1.getMonth() === d2.getMonth() &&
                                d1.getDate() === d2.getDate()

                            if (isSameDay(created, today)) {
                                return "Today"
                            } else if (isSameDay(created, yesterday)) {
                                return "Yesterday"
                            } else {
                                return created.toLocaleDateString()
                            }
                        })()
                    }
                </small>
                <PencilIcon className='size-3' />
            </div>
            <div className='flex items-center justify-end gap-2 text-gray-400'>
                <small className='!text-[11px] capitalize'>
                    {
                        (() => {
                            if (task.dueDate) {
                                const dueDate = new Date(task.dueDate!)
                                const today = new Date()
                                const yesterday = new Date()
                                yesterday.setDate(today.getDate() - 1)

                                // normalize times to only compare dates
                                const isSameDay = (d1: Date, d2: Date) =>
                                    d1.getFullYear() === d2.getFullYear() &&
                                    d1.getMonth() === d2.getMonth() &&
                                    d1.getDate() === d2.getDate()

                                if (isSameDay(dueDate, today)) {
                                    return "Today"
                                } else if (isSameDay(dueDate, yesterday)) {
                                    return "Yesterday"
                                } else {

                                    return dueDate.toLocaleDateString()
                                }
                            }
                            return "no due date"
                        })()
                    }
                </small>
                <CalendarClock className='size-4' />
            </div>
        </div>
    )
}

export default TaskCard