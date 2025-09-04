import { cn } from "@/lib/utils"
import { COLUMNS } from "@/utils/data"
import type { Task } from "@/utils/types"
import TaskCard from "./TaskCard"
import { motion } from "framer-motion"
const TaskBoard = ({ tasks }: { tasks: Task[] }) => {
    return (
        <main
        className="grid grid-cols-3 gap-4">
            {
                COLUMNS.map(({ Icon, ...col },i) => (
                    <motion.section
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: i*.2 } }}
                    key={col.id} className={cn("p-4 rounded-lg shadow-xl", col.className, col)}>
                        <div className="flex gap-3 items-center border-b border-slate-800 dark:border-slate-200 pb-3 mb-3">
                            <Icon className="size-4" />
                            <h1 className="text-lg">{col.title}</h1>
                        </div>
                        <div className="p-2 space-y-3  max-h-127 overflow-y-scroll">
                            {
                                tasks.filter(item=>item.status==col.id).map(task => (

                                    <TaskCard task={task} />
                                )
                                )
                            }
                        </div>
                    </motion.section>
                ))
            }
        </main>
    )
}

export default TaskBoard