import { motion } from "framer-motion"
import { useState, useCallback } from "react"
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors, DragOverlay, type DragEndEvent } from "@dnd-kit/core"
import { useAppDispatch } from "@/hooks/redux"
import { EditTask } from "@/slice/taskSlice"
import DroppableColumn from "./DroppableColumn"
import TaskCard from "./TaskCard"
import { COLUMNS } from "@/utils/data"
import type { Task } from "@/utils/types"
import { cn } from "@/lib/utils"

const TaskBoard = ({ tasks }: { tasks: Task[] }) => {
    const [activeTask, setActiveTask] = useState<Task | null>(null)
    const dispatch = useAppDispatch()

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

    const handleDragEnd = useCallback(
        async (event: DragEndEvent) => {
            const { over } = event;
            if (!over || !activeTask) return;

            const newStatus = over.id as Task["status"];
            if (activeTask.status === newStatus) {
                setActiveTask(null);
                return;
            }

            // Optimistically update overlay
            setActiveTask({ ...activeTask, status: newStatus });

            try {
                await dispatch(EditTask({ ...activeTask, status: newStatus } as Task)).unwrap();
            } catch (err) {
                console.error(err);
                // Revert overlay if backend fails
                setActiveTask(activeTask);
            } finally {
                setActiveTask(null); // remove overlay after update
            }
        },
        [activeTask, dispatch]
    );



    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={(e) => setActiveTask(tasks.find((t) => t._id === e.active.id) || null)}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveTask(null)}
        >
            <main className="grid grid-cols-3 gap-5">
                {COLUMNS.map(({ Icon, ...col }, i) => {
                    const filteredTasks = tasks.filter((t) => t.status === col.id)

                    return (
                        <motion.section
                            key={col.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: i * 0.2 } }}
                            className={cn("p-4 rounded-lg shadow-xl", col.className)}
                        >
                            <div className="flex gap-3 items-center border-b border-slate-800 dark:border-slate-200 pb-3 mb-3">
                                <Icon className="size-4" />
                                <h1 className="text-lg">{col.title}</h1>
                            </div>

                            <DroppableColumn columnId={col.id}>
                                {filteredTasks.map((task) => (
                                    <TaskCard key={task._id} task={task} />
                                ))}
                            </DroppableColumn>
                        </motion.section>
                    )
                })}
            </main>

            <DragOverlay>
                {activeTask?._id && (
                    <TaskCard
                        task={tasks.find(t => t._id === activeTask._id)!}
                        isOverlay
                    />
                )}
            </DragOverlay>


        </DndContext>
    )
}

export default TaskBoard
