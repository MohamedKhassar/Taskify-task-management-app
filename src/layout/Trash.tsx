import PageTitle from "@/components/PageTitle"
import TaskTable from "@/components/TaskTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatePresence, motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/store";
import { useEffect, useState, type ChangeEvent, } from "react"
import { type Task } from "@/utils/types"
import { List, Loader2, Table, Trash2Icon, UndoDot } from "lucide-react"
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { DeleteTaskByIds, undoDeleteTaskByIds } from "@/slice/taskSlice"
import { Bounce, toast, ToastContainer } from "react-toastify"


const Trash = () => {
    const data = useAppSelector((state: RootState) => state.tasks)
    const dispatch = useAppDispatch()
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

    const deleteTasks = async (ids?: string[] | undefined) => {
        try {
            const res = await dispatch(DeleteTaskByIds(ids ?? selectedItems)).unwrap()
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
            setSelectedItems([])
        } catch (error) {
            const err = error as string
            toast.error(err)
            console.log(error)
        }
    }

    const UndoDelete = async (ids: string[]) => {
        try {
            const res = await dispatch(undoDeleteTaskByIds(ids)).unwrap()
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
            setSelectedItems([])
        } catch (error) {
            const err = error as string
            toast.error(err)
            console.log(error)
        }
    }
    return (
        <main

            className="xl:p-6 p-3">
            {/* Title */}
            <PageTitle title="Trash" />
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
                                    className="w-full md:w-fit flex flex-wrap gap-3"
                                >
                                    <Button onClick={() => deleteTasks()} variant={"destructive"} className="w-full md:w-fit">
                                        {data.loading ? <Loader2 className="animate-spin" /> :
                                            <Trash2Icon />
                                        }
                                    </Button>
                                    <Button onClick={() => UndoDelete!(selectedItems)}
                                        className="hover:bg-yellow-600 dark:text-yellow-50 text-yellow-100 bg-yellow-500 cursor-pointer"
                                    >
                                        {data.loading ? <Loader2 className="animate-spin" /> :
                                            <UndoDot className="aspect-square" />
                                        }
                                    </Button>
                                </motion.span>
                            }
                        </AnimatePresence>
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
                            <TaskTable undoDelete={UndoDelete} mode="trash" onDelete={deleteTasks} selectedItems={selectedItems} setSelectedItems={setSelectedItems} tasks={filteredTask.slice(limit.from, limit.to).filter(item => item.deletedAt != null)} />
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: .4 } }} className="flex items-center md:justify-end justify-center space-x-2 py-4">
                                <div className="text-muted-foreground flex-1 text-sm">
                                    {selectedItems.length} of {filteredTask.length} row{filteredTask.length > 0 && "(s)"} selected.
                                </div>
                                <div className="space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setLimit({ from: limit.from -= 8, to: limit.to -= 8 })}
                                        disabled={limit.from == 0}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setLimit({ from: limit.from += 8, to: limit.to += 8 })}
                                        disabled={limit.to >= filteredTask.length}
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

export default Trash