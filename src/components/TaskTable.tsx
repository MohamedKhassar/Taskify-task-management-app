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

export default function TaskTable() {
    const data = useAppSelector((state: RootState) => state.tasks)
    const taskColumns = [
        { key: "title", label: "Title" },
        { key: "status", label: "Status" },
        { key: "priority", label: "Priority" },
        { key: "assignedTo", label: "Assigned To" },
        { key: "dueDate", label: "Due Date" },
        { key: "createdAt", label: "Created At" },
        { key: "actions", label: "Actions" },
    ];

    return (
        <Table className="!max-h-56">
            <TableHeader>
                <TableRow>
                    {taskColumns.map((col) => (
                        <TableHead align="center" key={col.key}>
                            {col.label == "Title" && <Checkbox id={col.key} className="mx-3" />}
                            <Label htmlFor={col.key} className="inline">{col.label}</Label>
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody contentEditable="inherit" className="!max-h-60 !overflow-y-scroll">
                {data.tasks.length > 0 ? data.tasks.map((task) => (

                    <TableRow key={task._id} className="!py-20">
                        <TableCell>
                            <Checkbox id={task._id} className="mx-3" />
                            <Label htmlFor={task._id} className="inline">{task.title}</Label>
                        </TableCell>
                        <TableCell>
                            <span
                                className={cn("px-4 py-2 rounded-full text-xs font-medium capitalize",
                                    task.status == "todo" ? "bg-sky-100 text-sky-900" : task.status == "in-progress" ? "bg-yellow-100 text-yellow-900" : "bg-green-100 text-green-900"
                                )}
                            >
                                {task.status || "unknown"}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span
                                className={cn("px-4 py-2 rounded-full text-xs font-medium capitalize",
                                    task.priority == "high" ? "bg-red-800/90 text-red-100" : task.priority == "medium" ? "bg-yellow-100 text-yellow-900" : "bg-green-100 text-green-900"
                                )}
                            >
                                {task.priority}
                            </span>
                        </TableCell>
                        <TableCell>
                            {task.assignedTo || "-"}
                        </TableCell>
                        <TableCell>
                            {task.dueDate
                                ? new Date(task.dueDate).toLocaleDateString()
                                : "No due date"}                                </TableCell>
                        <TableCell>
                            {new Date(task.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="space-x-5">
                            <Button className="hover:!bg-yellow-600 !bg-yellow-500 cursor-pointer">
                                Edit
                            </Button>
                            <Button variant={"destructive"}>
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                )) :
                    <TableRow>
                        <TableCell className="dark:text-red-400" align="center" colSpan={7}>

                        </TableCell>
                    </TableRow>
                }
            </TableBody>
        </Table>
    )
}
