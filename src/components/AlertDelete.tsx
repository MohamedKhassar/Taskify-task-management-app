import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAppDispatch } from "@/hooks/redux";
import { fetchTasks, SoftDeleteTaskByIds } from "@/slice/taskSlice";
import { Bounce, toast } from "react-toastify";

const AlertDelete = ({ buttonName, description, question, taskId }: { buttonName: string, description?: string, question: string, taskId: string }) => {
    const dispatch = useAppDispatch()
    const deleteTasks = async () => {
        try {
            const res = await dispatch(SoftDeleteTaskByIds([taskId])).unwrap()
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
            await dispatch(fetchTasks())
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="capitalize cursor-pointer bg-red-700 hover:bg-red-800 p-2 rounded-lg text-red-50 w-full lg:w-fit">
                {buttonName}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle
                        className="!text-red-900 capitalize"
                    >{question}</AlertDialogTitle>
                    <AlertDialogDescription
                        className="!text-red-700 capitalize"

                    >
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="!text-red-50 hover:bg-red-800 bg-red-700 cursor-pointer capitalize"
                        onClick={deleteTasks}
                    >{buttonName}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>)
}

export default AlertDelete