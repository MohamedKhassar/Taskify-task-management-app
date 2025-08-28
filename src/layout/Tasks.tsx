import PageTitle from "@/components/PageTitle"
import TaskTable from "@/components/TaskTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/store";

const Tasks = () => {
    const data = useAppSelector((state: RootState) => state.tasks)


    return (
        <main

            className="md:p-6 p-3">
            {/* Title */}
            <PageTitle title="Tasks" />
            <motion.section
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: .3 } }} className="grid gap-6" >
                <div className="flex items-center justify-between">
                    <Input   className="w-100" placeholder="Search by title" />
                    <Button className="capitalize dark:text-sky-900 dark:bg-sky-200 bg-sky-900 text-sky-200 duration-300 transition-colors cursor-pointer" >
                        Create new task
                    </Button>
                </div>
                <TaskTable tasks={data.tasks} />
            </motion.section>

        </main>
    )
}

export default Tasks