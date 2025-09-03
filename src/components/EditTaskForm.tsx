"use client"

import { useRef, useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/DatePicker"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Priority, Status, type Task } from "@/utils/types"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import {  EditTask, fetchTasks } from "@/slice/taskSlice"
import { Bounce, toast, ToastContainer } from "react-toastify"
import type { RootState } from "@/store"
import { Loader2, Pencil } from "lucide-react"

const EditTaskForm = ({ close, task }: { close: () => void, task: Task }) => {
    const taskRef = useRef<HTMLFormElement>(null)
    const { loading } = useAppSelector((state: RootState) => state.tasks)
    const dispatch = useAppDispatch()
    const [taskData, setTaskData] = useState<Task>(task)

    const SaveTask = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await dispatch(EditTask(taskData)).unwrap(); // wait for backend response

            toast.success(res.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });

            setTaskData({
                title: "",
                description: "",
                status: Status.Todo,
                priority: Priority.Low,
                dueDate: undefined
            })
            await dispatch(fetchTasks()).unwrap()
            close()
        } catch (err) {
            const error=err as string
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            console.log(err)
        }
    }

    return (
        <motion.section
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
            className="fixed inset-0 bg-black/40 flex justify-center items-center 
             h-screen z-50 backdrop-blur-md"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    close() // only close if clicking the backdrop itself
                }
            }}
        >
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            <motion.form
                ref={taskRef}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
                onSubmit={SaveTask}
                className="bg-white dark:bg-dark p-8 rounded-2xl w-[90%] max-w-md shadow-lg space-y-5"
            >
                <h1 className="capitalize font-bold text-2xl text-sky-800 dark:text-sky-500">
                    Edit your task
                </h1>

                {/* Title */}
                <div className="grid gap-2">
                    <Label htmlFor="title">
                        Title <span className="text-red-500">*</span>
                    </Label>
                    <Input onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} value={taskData.title} id="title" name="title" placeholder="Enter task title" required />
                </div>

                {/* Description */}
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} value={taskData.description} id="description" name="description" placeholder="Write details..." />
                </div>

                {/* Status */}
                <div className="grid gap-2">
                    <Label>Status</Label>
                    <Select onValueChange={(value: Status) => setTaskData({ ...taskData, status: value })} value={taskData.status} defaultValue="todo" name="status">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={Status.Todo}>Todo</SelectItem>
                            <SelectItem value={Status.Inprogress}>In Progress</SelectItem>
                            <SelectItem value={Status.Completed}>Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Due Date */}
                <div className="grid gap-2">
                    <DatePicker setTaskData={setTaskData} dueDate={taskData.dueDate} /> {/* add name for form */}
                </div>

                {/* Priority */}
                <div className="grid gap-2">
                    <Label>Priority</Label>
                    <Select onValueChange={(value: Priority) => setTaskData({ ...taskData, priority: value })} value={taskData.priority} defaultValue="medium" name="priority">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    <Button size={"lg"} type="button" variant="outline" onClick={close}>
                        Cancel
                    </Button>
                    <Button size={"lg"} disabled={loading} type="submit" className="bg-yellow-600 text-white hover:bg-yellow-700 disabled:cursor-not-allowed">
                        {loading ? <Loader2 className="animate-spin" /> : <>
                                                            <Pencil className="size-4 fill-amber-50" /> Edit Task
                                                        </>}
                    </Button>
                </div>
            </motion.form>
        </motion.section>
    )
}

export default EditTaskForm
