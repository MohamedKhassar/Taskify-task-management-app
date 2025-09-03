"use client"

import PageTitle from "../components/PageTitle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

// Chart.js imports
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
} from "chart.js"
import { Line, Doughnut } from "react-chartjs-2"
import { useAppSelector } from "@/hooks/redux"
import type { RootState } from "@/store"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { statusColors } from "@/utils/data"

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement
)


// const barData = {
//     labels: tasksPerUser.map((d) => d.name),
//     datasets: [
//         {
//             label: "Tasks",
//             data: tasksPerUser.map((d) => d),
//             backgroundColor: "#388e3c",
//             borderRadius: 8,
//             barThickness: 70,
//         },
//     ],
// }

export default function Dashboard() {
    const { tasks } = useAppSelector((state: RootState) => state.tasks)
    const data = tasks.filter(item => item.deletedAt == null)
    const taskCounts = data.reduce((acc, task) => {
        const status = task.status.toLowerCase();
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const pieData = {
        labels: Object.keys(taskCounts).map(status => status.charAt(0).toUpperCase() + status.slice(1)),
        datasets: [
            {
                data: Object.values(taskCounts),
                backgroundColor: Object.keys(taskCounts).map(status => statusColors[status]),
                borderWidth: 0,
                borderRadius: 6,
                spacing: 5,
            },
        ],
    };

    const tasksOverTime = data.reduce<Record<string, number>>((acc, task) => {
        const day = new Date(task.createdAt!).toLocaleDateString("en-US", { weekday: "short" });
        acc[day] = (acc[day] || 0) + (task.status === "completed" ? 1 : 0);
        return acc;
    }, {});

    const lineData = {
        labels: Object.keys(tasksOverTime),
        datasets: [
            {
                label: "Completed Tasks",
                data: Object.values(tasksOverTime),
                borderColor: "#0ea5e9",
                backgroundColor: "rgba(14, 165, 233, 0.3)",
                tension: 0.3,
            },
        ],
    };
    return (
        <main className="grid gap-6">
            {/* Title */}
            <PageTitle title="Dashboard" />
            {
                data.length > 0 ?
                    /* KPI Cards */
                    (<>
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <Link to={"tasks"}>
                                    <Card className="shadow-lg rounded-2xl">
                                        <CardHeader>
                                            <CardTitle className="text-base">Total</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-2xl font-bold">
                                                {data.length}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>

                            {[{ label: "todo", href: "tasks/todo" }, { label: "in progress", href: "tasks/in-progress" }, { label: "completed", href: "tasks/completed" }].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link to={item.href}>
                                        <Card
                                            className={cn("shadow-lg rounded-2xl")}
                                            style={{
                                                backgroundColor: statusColors[
                                                    Object.keys(statusColors).find(
                                                        (status) => status.replace("-", "") === item.label.toLowerCase().replace(" ", "")
                                                    ) as keyof typeof statusColors
                                                ],
                                            }}
                                        >

                                            <CardHeader>
                                                <CardTitle className="text-base capitalize">{item.label}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-2xl font-bold">
                                                    {data ? (
                                                        data.filter(task => task.status.toLowerCase().replace("-", "") === item.label.toLowerCase().replace(" ", "")).length
                                                    ) : (
                                                        <Loader2 className="animate-spin" />
                                                    )}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </section>

                        {/* Charts */}
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Pie Chart */}
                            <Card className="shadow-lg rounded-2xl">
                                <CardHeader>
                                    <CardTitle>Task Distribution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative h-[300px] sm:h-[350px]">
                                        <Doughnut
                                            data={pieData}
                                            options={{
                                                maintainAspectRatio: false,
                                                plugins: {
                                                    legend: {
                                                        align: "center",
                                                        position: "bottom",
                                                        labels: { usePointStyle: true, padding: 16 },
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Line Chart */}
                            <Card className="shadow-lg rounded-2xl">
                                <CardHeader>
                                    <CardTitle>Tasks Completed Over Time</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative h-[300px] sm:h-[350px]">
                                        <Line
                                            data={lineData}
                                            options={{
                                                maintainAspectRatio: false,
                                                responsive: true,
                                                plugins: { legend: { display: false } },
                                            }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Bar Chart */}
                            {/* <Card className="shadow-lg rounded-2xl lg:col-span-2">
                    <CardHeader>
                    <CardTitle>Tasks per Team Member</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="relative h-[350px] sm:h-[400px]">
                    <Bar
                    data={barData}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: { legend: { display: false } },
                        }}
                        />
                        </div>
                        </CardContent>
                        </Card> */}
                        </section>
                    </>)
                    :
                    (<section className="flex flex-col items-center justify-center py-10">
                        <img
                            src="/imgs/empty.png"  // replace with your png path
                            alt="No tasks"
                            className="size-80 object-contain mb-4"
                        />
                        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                            No tasks found. Create your first one!
                        </p>
                    </section>)
            }
        </main >
    )
}
