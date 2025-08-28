import PageTitle from "@/components/PageTitle"
import TaskTable from "@/components/TaskTable"
import { motion } from "framer-motion"
const Tasks = () => {


    return (
        <main

            className="grid gap-6 md:p-6">
            {/* Title */}
            <PageTitle title="Tasks" />
            <motion.section
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0,transition:{delay:.3} }} className="border rounded-xl overflow-auto max-h-screen scrollbar scrollbar-track-slate-50 scrollbar-thumb-sky-900 h-fit">

                <TaskTable />
            </motion.section>

        </main>
    )
}

export default Tasks