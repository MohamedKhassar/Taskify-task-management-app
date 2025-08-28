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
import { useAppSelector } from "@/hooks/redux";
import { cn } from "@/lib/utils";
import type { RootState } from "@/store";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";

export default function TaskTable() {
    const data = useAppSelector((state: RootState) => state.tasks)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const taskColumns = [
        { key: "title", label: "Title" },
        { key: "status", label: "Status" },
        { key: "priority", label: "Priority" },
        { key: "assignedTo", label: "Assigned To" },
        { key: "dueDate", label: "Due Date" },
        { key: "createdAt", label: "Created At" },
        { key: "actions", label: "Actions" },
    ];

    const selectAll = (checked: CheckedState) => {
        if (checked) {
            setSelectedItems(data.tasks.map(item => item._id!))
        } else {
            setSelectedItems([])
        }
    }
    console.log(selectedItems)
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {taskColumns.map((col) => (
                        <TableHead align="center" key={col.key} className="!p-2">
                            {col.label === "Title" && <Checkbox checked={data.tasks.length > 0 && selectedItems.length === data.tasks.length} onCheckedChange={(checked) => selectAll(checked)} id={col.key} className="mx-2" />}
                            <Label htmlFor={col.key} className="inline text-sm sm:text-base">
                                {col.label}
                            </Label>
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody className="max-h-60 overflow-y-auto">
                {data.tasks.length > 0 ? (
                    data.tasks.map((task) => (
                        <TableRow
                            key={task._id}
                        >
                            {/* Title */}
                            <TableCell className="py-6 px-10 gap-2 flex justify-start items-center">
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
                                <Label htmlFor={task._id} className=" font-medium">
                                    {task.title}
                                </Label>
                            </TableCell>

                            {/* Status */}
                            <TableCell className="py-6 px-10">
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
                            <TableCell className="py-6 px-10">
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
                            <TableCell className="whitespace-nowrap">
                                {task.assignedTo || "-"}
                            </TableCell>

                            {/* Due Date */}
                            <TableCell className="py-6 px-10">
                                {task.dueDate
                                    ? new Date(task.dueDate).toLocaleDateString()
                                    : "No due date"}
                            </TableCell>

                            {/* Created At */}
                            <TableCell className="py-6 px-10">
                                {new Date(task.createdAt).toLocaleDateString()}
                            </TableCell>

                            {/* Actions */}
                            <TableCell className="flex flex-wrap gap-2 justify-center">
                                <Button
                                    size="sm"
                                    className="hover:bg-yellow-600 bg-yellow-500 cursor-pointer w-full sm:w-auto"
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="w-full sm:w-auto"
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

    )
}
