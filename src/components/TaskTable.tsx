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
import type { Task } from "@/utils/types";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";

export default function TaskTable({ tasks }: { tasks: Task[] }) {
    const [selectedItems, setSelectedItems] = useState<string[]>([])


    const selectAll = (checked: CheckedState) => {
        if (checked) {
            setSelectedItems(tasks.map(item => item._id!))
        } else {
            setSelectedItems([])
        }
    }
    return (
        <div className="border rounded-xl overflow-auto xl:max-h-185 md:max-h-185 max-h-200  scrollbar scrollbar-track-slate-50 scrollbar-thumb-sky-900 h-fit">
            <Table>
                <TableHeader className="bg-accent">
                    <TableRow>
                        <TableHead align="center">
                            <Checkbox checked={tasks.length > 0 && selectedItems.length === tasks.length} onCheckedChange={(checked) => selectAll(checked)} />
                        </TableHead>
                        {taskColumns.map((col) => (
                            <TableHead key={col.key} className="!py-5 text-center">
                                <Label htmlFor={col.key} className="inline text-sm sm:text-base">
                                    {col.label}
                                </Label>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="max-h-60 overflow-y-auto">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TableRow
                                key={task._id}
                                className="hover:bg-accent"
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
                                <TableCell className="gap-2 flex justify-center items-center">
                                    <Label htmlFor={task._id} className=" font-medium">
                                        {task.title}
                                    </Label>
                                </TableCell>

                                {/* Status */}
                                <TableCell className="text-center">
                                    <span
                                        className={cn(
                                            "px-3 py-1 rounded-full text-xs font-medium capitalize",
                                            task.status === "todo"
                                                ? "bg-sky-100 text-sky-900"
                                                : task.status === "in-progress"
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
                                    <Button
                                        className="hover:bg-yellow-600 dark:text-yellow-50 text-yellow-100 bg-yellow-500 cursor-pointer lg:w-fit w-full"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="lg:w-fit w-full"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                className="dark:text-red-400 py-5"
                                colSpan={7}
                            >
                                No tasks found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>

    )
}
