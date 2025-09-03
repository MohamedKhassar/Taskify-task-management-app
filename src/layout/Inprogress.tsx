import TaskGrid from '@/components/TaskGrid'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { SoftDeleteTaskByIds } from '@/slice/taskSlice'
import type { RootState } from '@/store'
import { Status } from '@/utils/types'
import { toast } from 'react-toastify'

const Inprogress = () => {
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
        <TaskGrid  status={Status.Inprogress} onSoftDelete={softDeleteTasks} tasks={tasks.filter(task => task.deletedAt == null)} />
    )
}

export default Inprogress