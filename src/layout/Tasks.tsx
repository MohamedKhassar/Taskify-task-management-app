import PageTitle from "@/components/PageTitle"
import TaskTable from "@/components/TaskTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/store";
import { useEffect, useState, type ChangeEvent, } from "react"
import { type Task } from "@/utils/types"

const Tasks = () => {
    const data = useAppSelector((state: RootState) => state.tasks)
    const [searchTitle, setSearchTitle] = useState("")
    const [filteredTask, setFilteredTask] = useState<Task[]>([])

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
            <motion.section
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: .3 } }} className="grid gap-6" >
                <div className="flex flex-wrap gap-3 items-center justify-between">
                    <Input value={searchTitle} onChange={handelSearchTitle} className="md:w-150 w-full border-sky-600 focus:!ring-sky-500/40" placeholder="Search by title" />
                    <Button className="capitalize dark:text-sky-900 dark:!bg-sky-200 !bg-sky-900 text-sky-200 duration-300 transition-colors cursor-pointer w-full md:w-fit" >
                        Create new task
                    </Button>
                </div>
                <TaskTable tasks={filteredTask || data.tasks} />
            </motion.section>

        </main>
    )
}

export default Tasks