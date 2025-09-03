"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, type ChangeEvent, type JSX } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Pencil, Trash2, CheckCircle2, Clock, ListTodo, Calendar, ArrowUp, ArrowDown, ArrowRight, Loader2 } from "lucide-react"
import { type Task, Status } from "@/utils/types"
import { cn } from "@/lib/utils"
import Empty from "./Empty"
import { Input } from "./ui/input"
import { useAppSelector } from "@/hooks/redux"
import type { RootState } from "@/store"
import EditTaskForm from "./EditTaskForm"

export default function TaskGrid({
    tasks,
    status = Status.Todo,
    onSoftDelete
}: {
    tasks: Task[]
    status: Status
    onSoftDelete: (id: string[]) => void
}) {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const { loading } = useAppSelector((state: RootState) => state.tasks)
    const [filtered, setFilteredTask] = useState(tasks.filter((task) => task.status === status))
    const [searchTitle, setSearchTitle] = useState("")
    const [editOpen, setEditOpen] = useState(false)
    const [task, setTask] = useState<Task>()
    // Icon + color by status
    const statusMap: Record<Status, { icon: JSX.Element; color: string }> = {
        todo: {
            icon: <ListTodo className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
            color: "text-blue-700 dark:text-blue-400"
        },
        "in-progress": {
            icon: <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
            color: "text-yellow-700 dark:text-yellow-400"
        },
        completed: {
            icon: <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />,
            color: "text-green-700 dark:text-green-400"
        }
    }
    // Priority icon map
    const priorityMap: Record<"high" | "medium" | "low", { icon: JSX.Element; color: string }> = {
        high: { icon: <ArrowUp className="w-4 h-4 text-red-500" />, color: "text-red-500" },
        medium: { icon: <ArrowRight className="w-4 h-4 text-yellow-500" />, color: "text-yellow-500" },
        low: { icon: <ArrowDown className="w-4 h-4 text-green-500" />, color: "text-green-500" },
    }



    useEffect(() => {
        setFilteredTask(tasks.filter(item => item.status == status))
    }, [status, tasks])

    const handelSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTitle(value)

        if (value.trim()) {
            const filter = tasks.filter(item =>
                (item.title.toLowerCase().includes(value.toLowerCase().trim()) && item.status == status)
            )
            setFilteredTask(filter)
        } else {
            setFilteredTask(tasks.filter(item => item.status == status)) // reset to all tasks
        }
    }

    const ShowEditForm = (item: Task) => {
        setTask(item)
        setEditOpen(true)
    }
    return (
        <>
            <section
                className="grid gap-5 my-5" >
                <AnimatePresence>

                    {(editOpen && task) && (
                        <EditTaskForm close={() => setEditOpen(false)} task={task} />
                    )}
                </AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0, transition: { delay: .1 } }}
                    className="flex flex-wrap gap-3 items-center justify-between">
                    <Input value={searchTitle} onChange={handelSearchTitle} className="md:w-150 w-full border-sky-600 focus:!ring-sky-500/40" placeholder="Search by title" />
                </motion.div>
                {
                    filtered.length > 0 ?
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filtered.map((task, i) => (
                                <Popover
                                    key={task._id}
                                    open={selectedTask?._id === task._id && editOpen == false}
                                    onOpenChange={(open) => {
                                        if (!editOpen) {
                                            setSelectedTask(open ? task : null);
                                        }
                                    }}                                >
                                    <PopoverTrigger asChild>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileHover={{ scale: 1.02, transition: { duration: .3 } }} whileTap={{ scale: 0.99, transition: { duration: .3 } }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{once:true}}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <Card className="cursor-pointer shadow-md hover:shadow-lg transition">
                                                <CardHeader>
                                                    <CardTitle
                                                        className={cn("flex items-center gap-2", statusMap[status].color)}
                                                    >
                                                        {statusMap[status].icon}
                                                        {task.title}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                                        {task.description || "No description"}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </PopoverTrigger>

                                    {/* Popup details */}
                                    <PopoverContent
                                        className="w-96 p-5 space-y-4 rounded-xl shadow-xl border"
                                        align="end"
                                    >
                                        <h2 className={cn("text-lg font-semibold", statusMap[status].color)}>
                                            {task.title}
                                        </h2>

                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {task.description || "No description available"}
                                        </p>

                                        <div className="space-y-2 text-sm">
                                            {/* Status */}
                                            <div className="flex items-center gap-2">
                                                {statusMap[status].icon}
                                                <span className="capitalize font-medium">{task.status}</span>
                                            </div>

                                            {/* Priority */}
                                            <div className="flex items-center gap-2">
                                                {priorityMap[task.priority as "high" | "medium" | "low"].icon}
                                                <span className={cn("capitalize font-medium", priorityMap[task.priority as "high" | "medium" | "low"].color)}>
                                                    {task.priority}
                                                </span>
                                            </div>


                                            {/* Due Date */}
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-blue-500" />
                                                <span>
                                                    {task.dueDate
                                                        ? new Date(task.dueDate).toLocaleDateString()
                                                        : "No due date"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 justify-end pt-3">
                                            <Button
                                                size="sm"
                                                className="flex items-center gap-2 bg-yellow-600 text-white hover:bg-yellow-700 "
                                                onClick={() => ShowEditForm(task)}
                                            >
                                                <Pencil className="w-4 h-4" /> Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                className="flex items-center gap-2"
                                                onClick={() => onSoftDelete([task._id!])}
                                            >
                                                {
                                                    loading ? <Loader2 className="animate-spin" /> :
                                                        <>
                                                            <Trash2 className="size-4" /> Delete
                                                        </>
                                                }
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            ))}
                        </div>
                        : <Empty status={Status.Completed} />
                }
            </section>
        </>
    )
}
