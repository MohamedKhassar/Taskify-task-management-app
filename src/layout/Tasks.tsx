import PageTitle from "@/components/PageTitle"
import TaskTable from "@/components/TaskTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatePresence, motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/store";
import { useEffect, useState, type ChangeEvent, } from "react"
import { type Task } from "@/utils/types"
import { List, Loader2, Table, Trash2Icon } from "lucide-react"
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import CreateTaskForm from "@/components/CreateTaskForm"
import { SoftDeleteTaskByIds } from "@/slice/taskSlice"
import { Bounce, toast, ToastContainer } from "react-toastify"


const Tasks = () => {
    const data = useAppSelector((state: RootState) => state.tasks)
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [searchTitle, setSearchTitle] = useState("")
    const [filteredTask, setFilteredTask] = useState<Task[]>([])
    const [viewType, setViewType] = useState<"table" | "list">("table")
    const [limit, setLimit] = useState({
        from: 0,
        to: 8
    })

    useEffect(() => {
        setFilteredTask(data.tasks)
    }, [data.tasks])

    const handelSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setLimit({
            from: 0,
            to: 8
        })
        const value = e.target.value
        setSearchTitle(value)

        if (value.trim()) {
            const filter = data.tasks.filter(item =>
                item.title.toLowerCase().includes(value.toLowerCase().trim())
            )
            setFilteredTask(filter)
        } else {
            setFilteredTask(data.tasks) // reset to all tasks
        }
    }


    const softDeleteTasks = async (ids?: string[] | undefined) => {
        try {
            const res = await dispatch(
                SoftDeleteTaskByIds(ids ?? selectedItems) // ✅ if no ids passed, use selectedItems
            ).unwrap();
            toast.success(res.message);
            setSelectedItems([])
        } catch (error) {
            console.log(error)
        }
    }

    console.log(filteredTask.filter(item => item.deletedAt == null))
    return (
        <main

            className="xl:p-6 p-3">
            {/* Title */}
            <PageTitle title="Tasks" />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                className={"!text-sm"}
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            {/* create task popup */}
            <AnimatePresence>

                {open && (
                    <CreateTaskForm close={() => setOpen(false)} />
                )}
            </AnimatePresence>
            <section
                className="grid gap-5" >
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: .3 } }}
                    className="flex flex-wrap gap-3 items-center justify-between">
                    <Input value={searchTitle} onChange={handelSearchTitle} className="md:w-150 w-full border-sky-600 focus:!ring-sky-500/40" placeholder="Search by title" />
                    <div className="flex md:flex-row flex-col-reverse items-center gap-2 md:w-fit w-full">
                        <AnimatePresence>
                            {selectedItems.length > 0 &&
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: .5 } }}
                                    exit={{ opacity: 0, transition: { duration: .5 } }}
                                    className="w-full md:w-fit"
                                >
                                    <Button onClick={() => softDeleteTasks()} variant={"destructive"} className="w-full md:w-fit">
                                        {data.loading ? <Loader2 className="animate-spin" /> :
                                            <Trash2Icon />
                                        }
                                    </Button>
                                </motion.span>
                            }
                        </AnimatePresence>
                        <Button onClick={() => setOpen(true)} className="capitalize dark:text-sky-900 dark:!bg-sky-200 !bg-sky-900 text-sky-200 duration-300 transition-colors cursor-pointer w-full md:w-fit">
                            Create new task
                        </Button>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: .4 } }} className="flex capitalize items-center gap-3">
                    <span className="font-medium dark:text-sky-400 text-sky-800">view:</span>
                    <Button onClick={() => setViewType("table")} size={"icon"} className={cn(
                        viewType == "table" ?
                            "bg-sky-800 text-sky-100 hover:bg-sky-900" : "bg-sky-100 hover:bg-sky-200 text-sky-900")}><Table /></Button>
                    <Button onClick={() => setViewType("list")} size={"icon"} className={cn(
                        viewType == "list" ?
                            "bg-sky-800 text-sky-100 hover:bg-sky-900" : "bg-sky-100 hover:bg-sky-200 text-sky-900")}><List /></Button>
                </motion.div>
                <DropdownMenuSeparator className="bg-sky-700 dark:bg-sky-600" />
                {
                    viewType == "table" ?
                        <>
                            <TaskTable onDelete={softDeleteTasks} selectedItems={selectedItems} setSelectedItems={setSelectedItems} tasks={filteredTask
                                .filter(task => task.deletedAt == null)
                                .slice(limit.from, limit.to)} />
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: .4 } }} className="flex items-center md:justify-end justify-center space-x-2 py-4">
                                <div className="text-muted-foreground flex-1 text-sm">
                                    {selectedItems.length} of {filteredTask.filter(item => item.deletedAt == null).length} row{filteredTask.filter(item => item.deletedAt == null).length > 0 && "(s)"} selected.
                                </div>
                                <div className="space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setLimit(prev => ({
                                                from: Math.max(prev.from - 8, 0),
                                                to: Math.max(prev.to - 8, 8),
                                            }))
                                        } disabled={limit.from == 0}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setLimit(prev => ({
                                                from: prev.from + 8,
                                                to: Math.min(prev.to + 8, filteredTask.filter(item => item.deletedAt == null).length),
                                            }))
                                        } disabled={limit.to >= filteredTask.filter(item => item.deletedAt == null).length}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </motion.div>
                        </>
                        :
                        "list"
                }
            </section>

        </main>
    )
}

export default Tasks