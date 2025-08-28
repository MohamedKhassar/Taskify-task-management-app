import PageTitle from "@/components/PageTitle"
import TaskTable from "@/components/TaskTable"

const Tasks = () => {
    

    return (
        <main className="grid gap-6 p-6">
            {/* Title */}
            <PageTitle title="Tasks" />
            <section className="border rounded-xl">
                <TaskTable />
            </section>

        </main>
    )
}

export default Tasks