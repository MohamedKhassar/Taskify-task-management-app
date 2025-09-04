import { cn } from '@/lib/utils'
import type { Task } from '@/utils/types'
import { CalendarClock, PencilIcon } from 'lucide-react'

const TaskCard = ({ task }: { task: Task }) => {
    return (
        <div className='dark:bg-body bg-white p-4 rounded-xl space-y-1'>
            <div className='flex items-center justify-between'>
                <h4>{task.title}</h4>
                <span className={cn(
                    "px-4 py-0.5 rounded-full text-xs capitalize",
                    task.priority === "high"
                        ? "bg-red-800/90 text-red-100"
                        : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-900"
                            : "bg-green-100 text-green-900"
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