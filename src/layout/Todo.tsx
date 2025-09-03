import TaskGrid from '@/components/TaskGrid'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { SoftDeleteTaskByIds } from '@/slice/taskSlice'
import type { RootState } from '@/store'
import { Status } from '@/utils/types'
import { toast } from 'react-toastify'

const Todo = () => {
    const { tasks } = useAppSelector((state: RootState) => state.tasks)
    const dispatch = useAppDispatch()
    const softDeleteTasks = async (ids: string[]) => {
        try {
            const res = await dispatch(
                SoftDeleteTaskByIds(ids)
            ).unwrap();
            toast.success(res.message);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <TaskGrid  status={Status.Todo} onSoftDelete={softDeleteTasks} tasks={tasks.filter(task => task.deletedAt == null)} />
    )
}

export default Todo