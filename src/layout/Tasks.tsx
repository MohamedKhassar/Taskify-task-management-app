import PageTitle from "@/components/PageTitle"
import TaskTable from "@/components/TaskTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatePresence, motion } from "framer-motion"
import { useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/store";
import { useEffect, useState, type ChangeEvent, } from "react"
import { type Task } from "@/utils/types"
import { List, Table, Trash2Icon } from "lucide-react"
import type { CheckedState } from "@radix-ui/react-checkbox"
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const Tasks = () => {
    const data = useAppSelector((state: RootState) => state.tasks)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [searchTitle, setSearchTitle] = useState("")
    const [filteredTask, setFilteredTask] = useState<Task[]>([])
    const [viewType, setViewType] = useState<"table" | "list">("table")

    const selectAll = (checked: CheckedState) => {
        if (checked) {
            setSelectedItems(data.tasks.map(item => item._id!))
        } else {
            setSelectedItems([])
        }
    }

    useEffect(() => {
        setFilteredTask(data.tasks)
    }, [data.tasks])

    const handelSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
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



    return (
        <main

            className="xl:p-6 p-3">
            {/* Title */}
            <PageTitle title="Tasks" />
            <section
                className="grid gap-6" >
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: .3 } }}
                    className="flex flex-wrap gap-3 items-center justify-between">
                    <Input value={searchTitle} onChange={handelSearchTitle} className="md:w-150 w-full border-sky-600 focus:!ring-sky-500/40" placeholder="Search by title" />
                    <div className="flex items-center gap-2">
                        <AnimatePresence>
                            {selectedItems.length > 0 &&
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: .5 } }}
                                    exit={{ opacity: 0, transition: { duration: .5 } }}
                                >
                                    <Button variant={"destructive"} >
                                        <Trash2Icon />
                                    </Button>
                                </motion.span>
                            }
                        </AnimatePresence>
                        <Button className="capitalize dark:text-sky-900 dark:!bg-sky-200 !bg-sky-900 text-sky-200 duration-300 transition-colors cursor-pointer w-full md:w-fit">
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
                        <TaskTable selectAll={(checked) => selectAll(checked)} selectedItems={selectedItems} setSelectedItems={setSelectedItems} tasks={filteredTask || data.tasks} />
                        :
                        "list"
                }
            </section>

        </main>
    )
}

export default Tasks