import { Status } from "@/utils/types"
import { motion } from "framer-motion"
const Empty = ({status}:{status?:Status}) => {
    return (
        <motion.section
        initial={{opacity:0}}
        whileInView={{opacity:1,transition:{delay:.3,duration:.7}}}
        viewport={{once:true}}
        className="flex flex-col items-center justify-center py-10">
            <img
                src="/imgs/empty.png"  // replace with your png path
                alt="No tasks"
                className="size-80 object-contain mb-4"
            />
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                No {status} tasks found. Create your first one!
            </p>
        </motion.section>)
}

export default Empty