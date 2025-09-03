import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils";
import { taskColumns } from "@/utils/data";
import { Status, type Task } from "@/utils/types";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/store";
import { Loader2, UndoDot } from "lucide-react";
import EditTaskForm from "./EditTaskForm";
export default function TaskTable({
    tasks,
    selectedItems,
    setSelectedItems,
    onDelete,
    mode = "task"
}: {
    tasks: Task[],
    selectedItems: string[],
    setSelectedItems: Dispatch<SetStateAction<string[]>>,
    onDelete: (ids: string[]) => void,
    mode?: "task" | "trash"
}) {
    const [editOpen, setEditOpen] = useState(true)
    const [task, setTask] = useState<Task>()
    const { loading } = useAppSelector((state: RootState) => state.tasks)


    const selectAll = (checked: CheckedState) => {
        if (checked) {
            setSelectedItems(tasks.map(item => item._id!))
        } else {
            setSelectedItems([])
        }
    }


    const ShowEditForm = (item: Task) => {
        setTask(item)
        setEditOpen(true)
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: .5 } }} className="border rounded-xl overflow-x-scroll">
            {/* create task popup */}
            <AnimatePresence>

                {(editOpen && task) && (
                    <EditTaskForm close={() => setEditOpen(false)} task={task} />
                )}
            </AnimatePresence>
            <Table>
                <TableHeader className="bg-accent">
                    <TableRow>
                        {tasks.length > 0 && <TableHead align="center">
                            <Checkbox id="all" disabled={loading} checked={tasks.length > 0 && tasks.every(item => selectedItems.includes(item._id!))}
                                onCheckedChange={(checked) => selectAll(checked)} />
                        </TableHead>}
                        {taskColumns.map((col) => (
                            <TableHead key={col.key} className="!py-5 text-center text-sm sm:text-base">
                                {col.key === "title" ? <Label htmlFor={"all"}>
                                    {col.label}
                                </Label> :
                                    col.label

                                }
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TableRow
                                key={task._id}
                                data-state={selectedItems.includes(task._id!) && "selected"}
                            >
                                {/* checkbox */}
                                <TableCell>
                                    <Checkbox
                                        checked={selectedItems.includes(task._id!)}
                                        onCheckedChange={(checked) => {
                                            setSelectedItems(prev =>
                                                checked
                                                    ? [...prev, task._id!]
                                                    : prev.filter(id => id !== task._id)
                                            );
                                        }}
                                        id={task._id} />

                                </TableCell>
                                {/* Title */}
                                <TableCell className="!text-center" align="center">
                                    <Label htmlFor={task._id} className="!text-center">
                                        {task.title}
                                    </Label>
                                </TableCell>

                                {/* Status */}
                                <TableCell className="text-center">
                                    <span
                                        className={cn(
                                            "px-3 py-1 rounded-full text-xs font-medium capitalize",
                                            task.status === Status.Todo
                                                ? "bg-sky-100 text-sky-900"
                                                : task.status === Status.Inprogress
                                                    ? "bg-yellow-100 text-yellow-900"
                                                    : "bg-green-100 text-green-900"
                                        )}
                                    >
                                        {task.status || "unknown"}
                                    </span>
                                </TableCell>

                                {/* Priority */}
                                <TableCell className="text-center">
                                    <span
                                        className={cn(
                                            "px-3 py-1 rounded-full text-xs font-medium capitalize",
                                            task.priority === "high"
                                                ? "bg-red-800/90 text-red-100"
                                                : task.priority === "medium"
                                                    ? "bg-yellow-100 text-yellow-900"
                                                    : "bg-green-100 text-green-900"
                                        )}
                                    >
                                        {task.priority}
                                    </span>
                                </TableCell>

                                {/* Assigned To */}
                                <TableCell className="text-center">
                                    {task.assignedTo || "-"}
                                </TableCell>

                                {/* Due Date */}
                                <TableCell className="text-center">
                                    {task.dueDate
                                        ? new Date(task.dueDate).toLocaleDateString()
                                        : "No due date"}
                                </TableCell>

                                {/* Created At */}
                                <TableCell className="text-center">
                                    {new Date(task.createdAt).toLocaleDateString()}
                                </TableCell>

                                {/* Actions */}
                                <TableCell className="flex flex-wrap gap-2 justify-center">
                                    {mode == "task" ?
                                        <Button
                                            className="hover:bg-yellow-600 dark:text-yellow-50 text-yellow-100 bg-yellow-500 cursor-pointer lg:w-fit w-full"

                                            onClick={() => ShowEditForm(task)}
                                        >
                                            Edit
                                        </Button>
                                        :
                                        <Button
                                            className="hover:bg-yellow-600 dark:text-yellow-50 text-yellow-100 bg-yellow-500 cursor-pointer lg:!w-fit !w-full"
                                        >
                                            <UndoDot className="size-fit" />
                                        </Button>
                                    }
                                    <Button
                                        onClick={() => onDelete([task._id!])}
                                        variant={"destructive"}
                                        className="lg:w-fit w-full"
                                    >
                                        {!loading ? "Delete" : <Loader2 className="animate-spin" />}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                className="dark:text-red-400 py-5 text-lg text-center"
                                align="center"
                                colSpan={7}
                            >
                                No tasks found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </motion.div>

    )
}
